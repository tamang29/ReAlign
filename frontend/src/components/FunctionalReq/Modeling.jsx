import React from "react";
import { Container ,Button, Form, Row,Col} from "react-bootstrap";
import Header from "../Dashboard/Header";
import { useEffect, useRef ,useState} from 'react';
import { ApollonEditor, UMLDiagramType, ApollonMode, Locale} from '@ls1intum/apollon';
import BreadCrumbRow from "../Dashboard/BreadCrumbRow";

const Modeling = () => {
    const editorContainerRef = useRef(null);
    const [isEditorActive, setEditorActive] = useState(false);

    //selected UML type
    const [selectedUML, setSelectedUML] = useState('');

    //create button state
    const [isCreateDisabled, setIsCreateDisabled] = useState(true);


    useEffect(() => {
        console.log(editorContainerRef.current);
    }, []);

    const handleCreateModel = () => {
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
        console.log(ApolloEditor)
        }catch(error){
            console.error(error);
        }
        setEditorActive(true)
    };

    const onModelSelect =  (e) =>{
        setSelectedUML(e.target.value);
        setIsCreateDisabled(false);

    }

    return (
        <Container fluid style={{ height: '100vh'}}>

            <BreadCrumbRow/>
            <Header title="Modeling" />
            <Row>
                <Col>
                    <Form.Select aria-label="Default select example" onChange={onModelSelect}>
                        <option>select a model</option>
                        <option value="ClassDiagram">ClassDiagram</option>
                        <option value="ObjectDiagram">ObjectDiagram</option>
                        <option value="ActivityDiagram">ActivityDiagram</option>
                        <option value="UseCaseDiagram">UseCaseDiagram</option>
                        <option value="CommunicationDiagram">CommunicationDiagram</option>
                        <option value="ComponentDiagram">ComponentDiagram</option>
                        <option value="DeploymentDiagram">DeploymentDiagram</option>
                        <option value="PetriNet">PetriNet</option>
                        <option value="ReachabilityGraph">ReachabilityGraph</option>
                        <option value="SyntaxTree">SyntaxTree</option>
                        <option value="Flowchart">Flowchart</option>
                        <option value="BPMN">BPMN</option>

                    </Form.Select>
                </Col>
                <Col>
                    <Button onClick={handleCreateModel} disabled={isCreateDisabled}>Create</Button>
                </Col>
            </Row>
            <Row>
            <Container ref={editorContainerRef} className={`mt-3 ${isEditorActive ? 'bg-white' : ''}`} style={{height:'80vh'}}>

            </Container>
            </Row>
        </Container>
    );
}

export default Modeling;
