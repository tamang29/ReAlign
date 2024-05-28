import {Container, Row, Col, Nav, Image, Button} from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faHouse, faGear} from "@fortawesome/free-solid-svg-icons"
import {useNavigate} from "react-router-dom"

const SideBar = () =>{
    let navigate = useNavigate();
    const handleUpgradePress = () =>{
        navigate("/settings")

    }

    return(
        <Container className="sidebar-container p-0 d-flex flex-column" style={{ height: '100vh' }}>
            <Row className='p-5'>
                Company Name/Logo
            </Row>
            <Row className="flex-grow-1">
                <Col className="sidebar-items">
                    <Nav variant='pills' defaultActiveKey={'/dashboard'} className="flex-column">
                        <NavLink to="/"><FontAwesomeIcon icon={faHouse} className="mx-2"/>Your Workspace</NavLink>
                        <NavLink to="/settings"><FontAwesomeIcon icon={faGear} className='mx-2' />Settings</NavLink>
                    </Nav>
                </Col>
            </Row>
            <Row className="mx-5 my-4 ">
                <Col className="mt-auto" >
                    <Row className='mx-3 my-3'>
                    <Image src='' alt="User" roundedCircle/>
                    </Row>
                    <Row>
                    <Button style={{backgroundColor: "rgb(62,30,65)"}} onClick={handleUpgradePress}>Upgrade</Button>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default SideBar;