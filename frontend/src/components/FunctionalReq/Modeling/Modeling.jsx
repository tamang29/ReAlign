import React, { useContext } from "react";
import { Container ,Button, Form, Row, Nav, Navbar, NavDropdown, Modal, ListGroup, Col, Dropdown} from "react-bootstrap";
import { useEffect, useRef ,useState} from 'react';
import BreadCrumbRow from "../../Dashboard/BreadCrumbRow";
import { downloadAsPDF, convertSvgToPDF, saveNewDiagram, getDiagramByProject, initializeDiagram,diagramTypes, openDiagramFromDB } from "../../../services/diagramService";
import { useParams } from "react-router-dom";
import ToastMessage from "../../Modal/ToastMessage";
import OpenDiagramModal from "../../Modal/OpenDiagramModal";
import UserContext from "../../../context/UserContext";
import Header from "../../Dashboard/Header";
import ModelList from "./ModelList";
import ApollonModal from "../../Modal/ApollonModal";


const Modeling = () => {
    const params = useParams();
    const projectId = params.projectId;
    const [diagrams, setDiagrams] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedModal, setSelectedModel] = useState('');

    //open diagram state
    const [selectedDiagram, setSelectedDiagram] = useState([]);

    const fetchDiagrams = async(projectId) =>{
        const response = await getDiagramByProject(projectId);
        setDiagrams(response);
    }
    
    useEffect(()=>{
        fetchDiagrams(projectId);
    },[])

    const handleCreateClick = (id) => {
        setSelectedDiagram(null);
        setSelectedModel(id);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        fetchDiagrams(projectId);
    };

    const openDiagram = (diagram) =>{
        setSelectedDiagram(diagram);
        setShowModal(true)
    }

    return(
        <Container fluid>
        <BreadCrumbRow/>
        <Header title="Modeling"/>
            <Row className="my-2">
                <Col md={6}>
                    <strong style={{fontSize:15}}>choose template to model your system</strong>
                </Col>
                <Col md={5} className="d-flex justify-content-end">
                <Dropdown>
                    <Dropdown.Toggle className="realign-button" drop="down-centered">
                        Create
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {diagramTypes.map((diagram)=>(
                            <Dropdown.Item key={diagram.id} onClick={() =>handleCreateClick(diagram.id)}>{diagram.id}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <Row className="my-5">
            <ModelList diagrams={diagrams} openDiagram={openDiagram}/>
            </Row>

            {showModal && <ApollonModal onClose={handleCloseModal} selectedModal={selectedModal} diagram={selectedDiagram}/>}
        </Container>
    );
}

export default Modeling;
