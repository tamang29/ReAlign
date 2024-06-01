import React from 'react';
import { Row, Col, Image, Button, Nav } from 'react-bootstrap';
import { useNavigate, NavLink } from 'react-router-dom';

const RequirementsBoard = ({ projectId }) => {
    let navigate = useNavigate();
    const handleUpgradePress = () => {
        navigate("/dashboard/settings")
    }

    return (
        <Col className="sidebar-items">
            <Row className='p-5' role='button' onClick={() => navigate("/dashboard")}>
                Company Name/Logo
            </Row>
            <Row style={{ padding: "0.3em 2.5em", fontWeight: 800 }}>
                Functional
            </Row>
            <Nav defaultActiveKey={`/dashboard/requirements/${projectId}/elicitation`} className="flex-column">
                <NavLink to={`/dashboard/requirements/${projectId}/elicitation`}>Re Elicitation</NavLink>
                <NavLink to={`/dashboard/requirements/${projectId}/specification`}>Re Specification</NavLink>
                <NavLink to={`/dashboard/requirements/${projectId}/modeling`}>Re Modeling</NavLink>
            </Nav>
            <Nav style={{ fontWeight: 800 }} className="flex-column">
                <NavLink to={`/dashboard/requirements/${projectId}/nfr`}>Non Functional Requirements</NavLink>
            </Nav>
            <Row className="mx-5 my-4 ">
                <Col className="mt-auto" >
                    <Row className='mx-3 my-3'>
                        <Image src='' alt="User" roundedCircle />
                    </Row>
                    <Row>
                        <Button style={{ backgroundColor: "rgb(62,30,65)" }} onClick={handleUpgradePress}>Upgrade</Button>
                    </Row>
                </Col>
            </Row>
        </Col>
    );
}

export default RequirementsBoard;
