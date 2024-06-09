import React, { useState } from 'react';
import { Row, Col, Nav, Image, Button, Container } from 'react-bootstrap';
import { useNavigate, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt, faFileAlt, faCogs } from "@fortawesome/free-solid-svg-icons";

const RequirementsBoard = ({ projectId }) => {
    const navigate = useNavigate();
    const [showFunctional, setShowFunctional] = useState(false);

    const handleUpgradePress = () => {
        navigate("/dashboard/settings");
    }

    const handleFunctionalClick = () => {
        setShowFunctional(!showFunctional);
    }

    const handleNonFunctionalClick = () => {
        navigate(`/dashboard/requirements/${projectId}/nonFunctionalReq`);
    }

    return (
        <Container className="sidebar-container p-0 d-flex flex-column">
            <Col className="sidebar-items d-flex flex-column p-0">
                <Row className='p-5 company-logo' role='button' onClick={() => navigate("/dashboard")}>
                    <Image src={`${process.env.PUBLIC_URL}/ReAlignLogo.png`} alt="Company Logo" fluid />
                </Row>
                <Row className="section-title" role='button' onClick={handleFunctionalClick}>
                    Functional
                </Row>
                {showFunctional && (
                    <Nav className="flex-column">
                        <NavLink to={`/dashboard/requirements/${projectId}/elicitation`}>
                            <FontAwesomeIcon icon={faListAlt} className="mx-2"/> Re Elicitation
                        </NavLink>
                        <NavLink to={`/dashboard/requirements/${projectId}/specification`}>
                            <FontAwesomeIcon icon={faFileAlt} className="mx-2"/> Re Specification
                        </NavLink>
                        <NavLink to={`/dashboard/requirements/${projectId}/modeling`}>
                            <FontAwesomeIcon icon={faCogs} className="mx-2"/> Re Modeling
                        </NavLink>
                    </Nav>
                )}
                <Row className="section-title mt-4" role='button' onClick={handleNonFunctionalClick}>
                    Non Functional Requirements
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
