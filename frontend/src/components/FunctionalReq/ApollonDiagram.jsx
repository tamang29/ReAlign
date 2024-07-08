import React, { useContext } from "react";
import { Container ,Button, Form, Row, Nav, Navbar, NavDropdown, Modal, ListGroup} from "react-bootstrap";
import { useEffect, useRef ,useState} from 'react';
import BreadCrumbRow from "../Dashboard/BreadCrumbRow";
import { downloadAsPDF, convertSvgToPDF, saveNewDiagram, getDiagramByProject, initializeDiagram,diagramTypes, openDiagramFromDB } from "../../services/diagramService";
import { useParams } from "react-router-dom";
import ToastMessage from "../Modal/ToastMessage";
import OpenDiagramModal from "../Modal/OpenDiagramModal";
import UserContext from "../../context/UserContext";


const ApollonDiagram = ({selectedModal, diagram}) => {
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

    const initializeApollon = async(UML) =>{
        try{
        const ApollonEditor = initializeDiagram(editorContainerRef, UML);
        setApollonEditor(ApollonEditor);
        setEditorActive(true)
        }catch(error){
            console.log(error);
        }
    }
    //initialize Apollon
    useEffect(() => {
        if(!diagram){
        initializeApollon(selectedModal);
        }else{
            openDiagram(diagram);
        }
    }, [selectedModal]);


    const handleCreateModel = (event) => {

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
        initializeApollon(modelType)
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

  const handleCloseToast = () =>{
    setShowToast(false);
  }

  //export model as pdf
  const handleExport = async() => {
    console.log("hanlde")
    if (apollonEditor) {
        const apollonSVG = await apollonEditor.exportAsSVG();
        const {width, height} = apollonSVG.clip;

        try {
            const pdfBlob = await convertSvgToPDF(apollonSVG.svg, width, height); //convert svg to pdf
            try{
            downloadAsPDF(pdfBlob, fileName); //Download as PDF
            }catch(error){
                console.error('Error downloading as PDF', error);
            }
          } catch (error) {
            console.error('Error exporting PDF:', error);
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
        createdBy: user[0]._id
   }
   try {
    // Send the JSON data to your backend to save it in MongoDB
    await saveNewDiagram(diagramData);
    setToastBody('Diagram saved successfully!');
    setToastHeader('Success');
    setShowToast(true);
  } catch (error) {
    console.error('Error saving diagram:', error);
    setToastHeader('Danger')
    setToastBody('Failed to save diagram. Please try again.');
    setShowToast(true);
  }

  }

  const fetchDiagrams = async() =>{
    try{
    const diagrams = await getDiagramByProject(param.projectId);
    setDiagrams(diagrams)
    setShowDiagramModal(true);
    }catch(error){
       console.log(error)
    }
  }

  const openDiagram = async(diagram) =>{
    if(apollonEditor){
        apollonEditor.destroy();
    }
    try{
    const ApollonEditor = await openDiagramFromDB(editorContainerRef,diagram);
    setApollonEditor(ApollonEditor)
    setFileName(diagram.fileName)
    closeOpenDiagramModal();
    }catch(error){
        console.error(error);
    }
  }
  const closeOpenDiagramModal = () => setShowDiagramModal(false);



    return (
        <Container fluid >
            <Navbar className="bg-body-tertiary">
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
                        </NavDropdown>

                        {fileName? (
                            <Nav.Link disabled className="text-dark fw-bold">
                                {fileName}
                            </Nav.Link>
                        ): (
                            <Nav.Link disabled className="text-dark fw-bold">new file</Nav.Link>
                        )}
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
            </Row>
        </Container>
    );
}

export default ApollonDiagram;
