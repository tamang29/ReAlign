import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Elicitation from "../components/FunctionalReq/Elicitation";
import Specification from "../components/FunctionalReq/Specification";
import Modeling from "../components/FunctionalReq/Modeling";
import NonFunctionalReq from "../components/NonFunctionalReq/NonFunctionalReq";
import RequirementsBoard from "../components/Project/RequirementsBoard";
import { Routes, Route, useParams } from 'react-router-dom'; 
import '../styles/style.css';

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
                    <Container className="mainview-container">
                        <Routes>
                            <Route path="/dashboard/requirements/:projectId/elicitation" element={<Elicitation/>} />
                            <Route path="/dashboard/requirements/:projectId/specification" element={<Specification/>} />
                            <Route path="/dashboard/requirements/:projectId/modeling" element={<Modeling/>} />
                            <Route path="/dashboard/requirements/:projectId/nonFunctionalReq" element={<NonFunctionalReq/>} />
                        </Routes>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default Requirements;
