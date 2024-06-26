import React from "react";
import { Container ,Button, Form, Row, Nav, Navbar, NavDropdown, Modal, ListGroup} from "react-bootstrap";
import { useEffect, useRef ,useState} from 'react';
import { ApollonEditor, UMLDiagramType, ApollonMode, Locale} from '@ls1intum/apollon';
import BreadCrumbRow from "../Dashboard/BreadCrumbRow";
import { downloadAsPDF, convertSvgToPDF, saveNewDiagram } from "../../services/diagramService";
import { useParams } from "react-router-dom";


const Modeling = () => {

    const param = useParams();
    const editorContainerRef = useRef(null);
    const [isEditorActive, setEditorActive] = useState(false);

    //apollon editor
    const [apollonEditor, setApollonEditor] = useState(null);
    //selected UML type
    const [selectedUML, setSelectedUML] = useState('ClassDiagram');

    //show create new modal form
    const [showCreateModal , setShowCreateModal] = useState(false);

    //new file name and diagram selected by user
    const [fileName, setFileName] = useState('ClassDiagram');
    //form validation
    const [validated, setValidated] = useState(false);

    const diagramTypes = [
        { id: 'ClassDiagram', label: 'Class Diagram' },
        { id: 'ObjectDiagram', label: 'Object Diagram' },
        { id: 'ActivityDiagram', label: 'Activity Diagram' },
        { id: 'UseCaseDiagram', label: 'Use Case Diagram' },
        { id: 'CommunicationDiagram', label: 'Communication Diagram' },
        { id: 'ComponentDiagram', label: 'Component Diagram' },
        { id: 'DeploymentDiagram', label: 'Deployment Diagram' },
        { id: 'PetriNet', label: 'PetriNet' },
        { id: 'ReachabilityGraph', label: 'Reachability Graph' },
        { id: 'SyntaxTree', label: 'Syntax Tree' },
        { id: 'Flowchart', label: 'Flowchart' },
        { id: 'BPMN', label: 'BPMN' }
      ];

    useEffect(() => {
        const options = {
            type: UMLDiagramType[selectedUML],
            mode: ApollonMode,
            readonly: false,
            enablePopups: true,
            model: null,
            theme: {},
            locale: Locale.English,
            copyPasteToClipboard: true,
            colorEnabled: true,
            scale: 1.0,
        };
        try{
        const ApolloEditor = new ApollonEditor(editorContainerRef.current, options);
        setApollonEditor(ApolloEditor)

        }catch(error){
            console.error(error);
        }
        setEditorActive(true)
    }, [selectedUML]);

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
        const options = {
            type: UMLDiagramType[selectedUML],
            mode: ApollonMode,
            readonly: false,
            enablePopups: true,
            model: null,
            theme: {},
            locale: Locale.English,
            copyPasteToClipboard: true,
            colorEnabled: true,
            scale: 1.0,
        };
        try{
        const ApolloEditor = new ApollonEditor(editorContainerRef.current, options);
        setApollonEditor(ApolloEditor)
        }catch(error){
            console.error(error);
        }
        setEditorActive(true);
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
   const handleDiagramTypeSelect = (eventKey) => {
    setSelectedUML(eventKey);
    setValidated(false);
  };

  //handle file name change
  const handleFileNameChange = (event) => {
    setFileName(event.target.value);
    setValidated(false);
  };

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
                console.error('Error downloading as PDF', error);
            }
          } catch (error) {
            console.error('Error exporting PDF:', error);
          }
    }

  };

  //save to mongodb
  const handleSaveModel = async() =>{
    const apollonSVG = await apollonEditor.exportAsSVG();
    const diagram = {
        projectId: param.projectId,
        svg: apollonSVG.svg,
        fileName: fileName,
        type: selectedUML,
        createdBy: '664cf4de7e3db63be5771215'
    }
    try{
    const newDiagram = await saveNewDiagram(diagram);
    }catch(error){
        console.error("error saving diagram to DB.", error);
    }

  }



    return (
        <Container fluid style={{ height: '100vh'}}>
            <BreadCrumbRow/>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">Re Modeling</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="File" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={handleModalOpen}>New</NavDropdown.Item>
                            <NavDropdown.Item onClick={handleSaveModel}>
                                Save
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={handleExport}>
                                Export as PDF
                            </NavDropdown.Item>
                        </NavDropdown>

                        {fileName? (
                            <Nav.Link disabled className="text-dark fw-bold">{fileName}</Nav.Link>
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
                            active={selectedUML === type.id}
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
            </Row>
        </Container>
    );
}

export default Modeling;
