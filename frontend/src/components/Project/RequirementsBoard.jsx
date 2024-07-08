import React, { useState } from 'react';
import { Row, Col, Nav, Image, Button, Container , Accordion} from 'react-bootstrap';
import { useNavigate, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt, faFileAlt, faCogs ,faGear} from "@fortawesome/free-solid-svg-icons";

const RequirementsBoard = ({ projectId }) => {
    const navigate = useNavigate();
    const [showFunctional, setShowFunctional] = useState(true);

    const handleUpgradePress = () => {
        navigate("/dashboard/settings");
    }

    const handleFunctionalClick = () => {
        setShowFunctional(!showFunctional);
    }

    const handleNonFunctionalClick = () => {
        navigate(`/dashboard/requirements/${projectId}/nonFunctionalReq`);
    }

    const handleSettingsClick = () =>{
        navigate(`/dashboard/requirements/${projectId}/settings`);
    }

    return (
        <Container className="sidebar-container p-0 d-flex flex-column">
            <Col className="sidebar-items d-flex flex-column p-0">
                <Row className='p-5 company-logo' role='button' onClick={() => navigate("/dashboard")}>
                    <Image src={`${process.env.PUBLIC_URL}/ReAlignLogo.png`} alt="Company Logo" fluid />
                </Row>
                <Row>
                    <Col className="sidebar-items">
                        <Nav className="flex-column">
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header border="light"><strong>Functional</strong></Accordion.Header>
                                    <Accordion.Body className='p-0'>
                                    <Nav className="flex-column">
                                        <NavLink to={`/dashboard/requirements/${projectId}/elicitation`}>
                                        <Row>
                                        <Col md={2}>
                                            <FontAwesomeIcon icon={faListAlt} className="mx-2"/>
                                        </Col>
                                        <Col>
                                        Re Elicitation
                                        </Col>
                                        </Row>
                                        </NavLink>
                                        <NavLink to={`/dashboard/requirements/${projectId}/specification`}>
                                            <Row>
                                            <Col md={2}>
                                                <FontAwesomeIcon icon={faFileAlt} className="mx-2"/>
                                            </Col>
                                            <Col>
                                            Re Specification
                                            </Col>
                                            </Row>
                                        </NavLink>
                                        <NavLink to={`/dashboard/requirements/${projectId}/modeling`}>
                                        <Row>
                                            <Col md={2}>
                                                <FontAwesomeIcon icon={faCogs} className="mx-2"/>
                                            </Col>
                                            <Col>
                                            Re Modeling
                                            </Col>
                                        </Row>
                                        </NavLink>
                                    </Nav>
                                    </Accordion.Body>
                                    </Accordion.Item>
                                    </Accordion>
                        </Nav>
                    </Col>
                </Row>
                <Row className="flex-grow-1">
                    <Col className="sidebar-items">
                        <Nav className="flex-column">
                            <NavLink to={`/dashboard/requirements/${projectId}/nonFunctionalReq`}>Non Functional</NavLink>
                        </Nav>
                    </Col>
                </Row>
                <Row className="flex-grow-1">
                    <Col className="sidebar-items mt-auto">
                        <Nav className="flex-column">
                            <NavLink to={`/dashboard/requirements/${projectId}/settings`}><FontAwesomeIcon icon={faGear} className='mx-2' />Settings</NavLink>
                        </Nav>
                    </Col>
                </Row>
                <Row className="mt-auto mx-5 my-4">
                    <Col className="text-center">
                        <Row className='mx-3 my-3'>
                            <Image src='' alt="User" roundedCircle />
                        </Row>
                        <Row>
                            <Button style={{ backgroundColor: "rgb(62,30,65)", border: 'none' }} onClick={handleUpgradePress}>Upgrade</Button>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Container>
    );
}

export default RequirementsBoard;
