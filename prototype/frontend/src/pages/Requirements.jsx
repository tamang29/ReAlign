import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Elicitation from "../components/FunctionalReq/Elicitation";
import Specification from "../components/FunctionalReq/Specification";
import Modeling from "../components/FunctionalReq/Modeling";
import NonFunctionalReq from "../components/NonFunctionalReq/NonFunctionalReq";
import RequirementsBoard from "../components/Project/RequirementsBoard";
import { Routes, Route, useParams } from 'react-router-dom';
import '../styles/style.css';
import NotFound from '../components/ErrorPages/NotFound';


const Requirements = () => {
    const { projectId } = useParams();
    console.log(projectId);

    return (
        <Container fluid className="dashboard-container p-0">
            <Row>
                <Col xs={2} className="p-0">
                    <RequirementsBoard projectId={projectId} />
                </Col>
                <Col xs={10} className="p-0">
                    <Container fluid className="mainview-container">
                        <Routes>
                            <Route path="/elicitation" element={<Elicitation/>} />
                            <Route path="/specification" element={<Specification/>} />
                            <Route path="/modeling" element={<Modeling/>} />
                            <Route path="/nonFunctionalReq" element={<NonFunctionalReq/>} />
                            <Route path="/*" element={<NotFound/>} />
                        </Routes>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default Requirements;
