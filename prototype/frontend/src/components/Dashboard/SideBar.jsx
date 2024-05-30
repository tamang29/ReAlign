import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from "react-router-dom";
import SideBarItems from './SideBarItems';

const SideBar = () => {
    let navigate = useNavigate();
    const location = useLocation();

    const renderSideBarItems = () => {
        const currentPath = location.pathname;

        switch (currentPath) {
            case '/dashboard':
                return <SideBarItems />;
            case '/dashboard/settings':
                return <SideBarItems />;
            default:
                return '/404';
        }
    }

    const handleUpgradePress = () => {
        navigate("/dashboard/settings")
    }

    return (
        <Container className="sidebar-container p-0 d-flex flex-column" style={{ height: '100vh' }}>
            <Row className='p-5' role='button' onClick={() => navigate("/dashboard")}>
                Company Name/Logo
            </Row>
            <Row className="flex-grow-1">
                {renderSideBarItems()}
            </Row>
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
        </Container>
    );
}

export default SideBar;
