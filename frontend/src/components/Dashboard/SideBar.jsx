import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import SideBarItems from './SideBarItems';
import UserContext from '../../context/UserContext';

const SideBar = () => {
    const navigate = useNavigate();
    // const [user] = useContext(UserContext);
    // console.log(user);


    // const firstName = user.firstName || '';
    // const lastName = user.lastName || '';

    const handleUpgradePress = () => {
        navigate("/dashboard/settings", { state: { openSubscription: true } });
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
                <Col className="d-flex flex-column align-items-center mt-auto">
                    <Image src='' alt="User" roundedCircle style={{ width: '100px', height: '100px' }} />
                    {/* {user && (
                        <Row className="text-center my-2">
                            {`${user[0].firstName || ' '} ${user[0].lastName || ' '}`}
                        </Row>
                    )} */}
                    <Button className="mt-2" style={{ backgroundColor: "rgb(62,30,65)", border: 'none' }} onClick={handleUpgradePress}>
                        Upgrade
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default SideBar;
