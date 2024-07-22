import React, { useContext } from "react";
import { Container ,Button, Form, Row, Nav, Navbar, NavDropdown, Modal, ListGroup} from "react-bootstrap";
import { useEffect, useRef ,useState} from 'react';
import { downloadAsPDF, convertSvgToPDF, saveNewDiagram, getDiagramByProject, initializeDiagram,diagramTypes, openDiagramFromDB, updateDiagram, deleteDiagram } from "../../../services/diagramService";
import { useParams } from "react-router-dom";
import ToastMessage from "../../Modal/ToastMessage";
import OpenDiagramModal from "../../Modal/OpenDiagramModal";
import UserContext from "../../../context/UserContext";
import VersionModal from "../../Modal/VersionModal";




const ApollonDiagram = ({selectedModal, diagram, onClose}) => {
    const user = useContext(UserContext);
    //useParam to get projectId
    const param = useParams();
    const projectId = param.projectId;
    const editorContainerRef = useRef(null);
    const [isEditorActive, setEditorActive] = useState(false);

    //apollon editor
    const [apollonEditor, setApollonEditor] = useState(null);
    //selected UML type
    const [modelType, setModelType] = useState('ClassDiagram');

    //show create new modal form
    const [showCreateModal , setShowCreateModal] = useState(false);

    //new file name and diagram selected by user
    const [fileName, setFileName] = useState(selectedModal);
    //form validation
    const [validated, setValidated] = useState(false);

    //Toast state
    const [showToast, setShowToast] = useState(false);
    const [toastHeader, setToastHeader] = useState('');
    const [toastBody, setToastBody] = useState('');

    //open diagrams state
    const [diagrams, setDiagrams]= useState([]);
    const [showDiagramModal, setShowDiagramModal] = useState(false);
    const [openedDiagram,setOpenedDiagram] = useState(diagram);

    const [showVersionModal, setShowVersionModal] = useState(false);

    const initializeApollon = async(UML) =>{
        try{
        const ApollonEditor = initializeDiagram(editorContainerRef, UML);
        setFileName(fileName);
        setApollonEditor(ApollonEditor);
        setEditorActive(true)
        }catch(error){
            setToastHeader('Error')
            setToastBody('Failed to initialize diagram. Please try again.');
            setShowToast(true);
        }
    }
    //initialize Apollon
    useEffect(() => {
        if(!diagram){
        initializeApollon(selectedModal);
        }else{
            openDiagram(openedDiagram);
        }
    }, [selectedModal]);


    const handleCreateModel = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        }
        setValidated(true);

        if (form.checkValidity()) {

        if(apollonEditor){
            apollonEditor.destroy();
        }
        initializeApollon(modelType);
        setOpenedDiagram(null);
        setShowCreateModal(false);
    }
    };

    // show modal when new button is clicked
    const handleModalOpen = () => {
        setShowCreateModal(true);
        setValidated(false);
    }
   const handleModalClose = () =>{
        setShowCreateModal(false);
   }
   //set diagram type and set it to active
   const handleDiagramTypeSelect = (type) => {
    setModelType(type);
    setValidated(false);
  };

  //handle file name change
  const handleFileNameChange = (event) => {
    setFileName(event.target.value);
    setValidated(false);
  };

  //close the toast notification
  const handleCloseToast = () =>{
    setShowToast(false);
  }

  //export model as pdf
  const handleExport = async() => {
    if (apollonEditor) {
        const apollonSVG = await apollonEditor.exportAsSVG();
        const {width, height} = apollonSVG.clip;

        try {
            const pdfBlob = await convertSvgToPDF(apollonSVG.svg, width, height); //convert svg to pdf
            try{
            downloadAsPDF(pdfBlob, fileName); //Download as PDF
            }catch(error){
                setToastHeader('Error')
                setToastBody('Error downloading as PDF');
                setShowToast(true);
            }
          } catch (error) {
            setToastHeader('Error')
            setToastBody('Error exporting PDF!');
            setShowToast(true);
          }
    }

  };

  //save to mongodb
  const handleSaveModel = async() =>{
    const model = apollonEditor.model
    const diagramData = {
        projectId: projectId,
        fileName: fileName,
        type: model.type,
        model: model,
        createdBy: user[0]._id,
        updatedBy: user[0]._id
            }
    if(!fileName){
        setToastHeader('Error')
        setToastBody('Enter a file name');
        setShowToast(true);
        return
    }
    if(!openedDiagram){

    try {
        // Send the JSON data to your backend to save it in MongoDB
        const response = await saveNewDiagram(diagramData);
        setToastBody('Diagram saved successfully!');
        setToastHeader('Success');
        setShowToast(true);
       setOpenedDiagram(response)
    } catch (error) {
        setToastHeader('Error')
        setToastBody('Failed to save diagram. Please try again.');
        setShowToast(true);
    }
    }else{
        try{
        const response = await updateDiagram(openedDiagram._id ,diagramData);
        setToastBody('Diagram updated successfully!');
        setToastHeader('Success');
        setShowToast(true);
        setOpenedDiagram(response)
        }catch(error){
            setToastHeader('Error')
            setToastBody('Failed to update diagram. Please try again.');
            setShowToast(true);
        }
    }

  }

  //fetch diagrams from backend
  const fetchDiagrams = async() =>{
    try{
    const diagrams = await getDiagramByProject(param.projectId);
    setDiagrams(diagrams)
    setShowDiagramModal(true);
    }catch(error){
        setToastHeader('Error')
        setToastBody('Failed to fetch diagram. Please try again.');
        setShowToast(true);
    }
  }

  //when user click on open menu item
  const openDiagram = async(diagram) =>{
    if(apollonEditor){
        apollonEditor.destroy();
    }
    try {
        // Find the most recent version of the model
        const latestModelVersion = diagram.versions.reduce((latest, current) => {
            return new Date(current.updatedAt) > new Date(latest.updatedAt) ? current : latest;
        }, diagram.versions[0]);

        // Open the diagram with the latest version
        const ApollonEditor = await openDiagramFromDB(editorContainerRef, latestModelVersion);
        setApollonEditor(ApollonEditor);
        setFileName(diagram.fileName);
        setOpenedDiagram(diagram);
        closeOpenDiagramModal();
    } catch (error) {
        setToastHeader('Error')
        setToastBody('Failed to open diagram. Please try again.');
        setShowToast(true);
    }
  }

  //when user clicks model version
  const openVersion = async(diagram) =>{
    if(apollonEditor){
        apollonEditor.destroy();
    }
    try {
        const ApollonEditor = await openDiagramFromDB(editorContainerRef, diagram);
        setApollonEditor(ApollonEditor);
        setFileName(fileName);
        setOpenedDiagram(openedDiagram);
        closeOpenDiagramModal();
    } catch (error) {
        setToastHeader('Error')
        setToastBody('Failed to open versions. Please try again.');
        setShowToast(true);
    }
  }

  //Close the modal state=false
  const closeOpenDiagramModal = () => {
    setShowDiagramModal(false);
    setShowVersionModal(false);
  }

  //delete model from db
  const handleDelete = async() =>{
    try{
    const response = await deleteDiagram(openedDiagram._id);
    setToastBody('Diagram deleted successfully!');
    setToastHeader('Success');
    setShowToast(true);
    onClose();
    }catch(error){
        setToastHeader('Error')
        setToastBody('Failed to delete diagram. Please try again.');
        setShowToast(true);
    }
  }

  //show model version pop up (modal)
  const handleVersionModal = async () => {
    setShowVersionModal(true);
    };


    return (
        <Container fluid >
            <Navbar className="bg-body-tertiary" style={{height: "2rem"}}>
                <Container>
                    <Navbar.Brand href="#home">Re Modeling</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="File" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={handleModalOpen}>New</NavDropdown.Item>
                            <NavDropdown.Item onClick={fetchDiagrams}>
                                Open
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={handleSaveModel}>
                                Save
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={handleExport}>
                                Export as PDF
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={handleDelete}>
                                Delete
                            </NavDropdown.Item>
                        </NavDropdown>
                            <input
                                type="text"
                                className="form-control text-dark fw-bold"
                                onChange={handleFileNameChange}
                                value={fileName}
                            />
                    </Nav>
                    <Nav>
                        <Nav.Link onClick={handleVersionModal}>
                            <i className="bi bi-list"></i> Model Versions
                        </Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
            <Row>
            <Container ref={editorContainerRef} className={`mt-3 ${isEditorActive ? 'bg-white' : ''}`} style={{height:'80vh'}}>

            </Container>

            <Modal show={showCreateModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                <Modal.Title>Create a new diagram</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleCreateModel}>
                    <Form.Group className="mb-3" controlId="formFileName">
                        <Form.Label>File Name:</Form.Label>
                        <Form.Control type="text" placeholder="Enter file name" required onChange={handleFileNameChange}/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a file name.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDiagramType">
                        <Form.Label>Select Diagram Type:</Form.Label>
                        <ListGroup>
                        {diagramTypes.map((type) => (
                            <ListGroup.Item
                            key={type.id}
                            action
                            href={`#${type.id}`}
                            active={modelType === type.id}
                            onClick={() => handleDiagramTypeSelect(type.id)}

                            >
                            {type.label}
                            </ListGroup.Item>
                        ))}
                        </ListGroup>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                    Create
                    </Button>
                    </Form>

                </Modal.Body>
            </Modal>
            {showToast && <ToastMessage
                header={toastHeader}
                body={toastBody}
                handleCloseToast= {handleCloseToast}
            /> }

            {showDiagramModal && <OpenDiagramModal diagrams={diagrams} closeOpenDiagramModal={closeOpenDiagramModal} openDiagram={openDiagram}/>}
            {showVersionModal && <VersionModal diagrams={openedDiagram} closeOpenDiagramModal={closeOpenDiagramModal} openVersion={openVersion}/>}
            </Row>
            <div className="right-bottom-buttons">
            <Button onClick={handleExport} className="realign-button">export</Button>
            <Button onClick={handleSaveModel} className="realign-button">save</Button>
            </div>
        </Container>
    );
}

export default ApollonDiagram;
