import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import SideBarItems from './SideBarItems';
import UserContext from '../../context/UserContext';

const SideBar = () => {
    const navigate = useNavigate();
    const [user] = useContext(UserContext);
    const [profilePic, setProfilePic] = useState(`${process.env.PUBLIC_URL}/defaultProfilePic.png`);

    const handleUpgradePress = () => {
        navigate("/dashboard/settings", { state: { openSubscription: true } });
    };

    const handleProfileSettingsClick = () => {
        navigate("/dashboard/settings", { state: { openProfileSettings: true } });
    };

    return (
        <Container className="sidebar-container p-0 d-flex flex-column" style={{ height: '100vh' }}>
            <Row className="p-5" role="button" onClick={() => navigate("/dashboard")}>
                Company Name/Logo
            </Row>
            <Row className="flex-grow-1">
                <SideBarItems />
            </Row>
            <Row className="mx-5 my-4 justify-content-center">
                <Col className="d-flex flex-column align-items-center">
                    <Image 
                        src={profilePic} 
                        alt="User" 
                        roundedCircle 
                        style={{ width: '100px', height: '100px' }} 
                        className="mb-2"
                        onClick={handleProfileSettingsClick}
                    />
                    {user && (
                        <div className="text-center mb-2">
                            {`${user.firstName || ' '} ${user.lastName || ' '}`}
                        </div>
                    )}
                    <Button 
                        className="mt-auto" 
                        style={{ backgroundColor: "rgb(62,30,65)", border: 'none', width: '150px' }} 
                        onClick={handleUpgradePress}
                    >
                        Upgrade
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default SideBar;
