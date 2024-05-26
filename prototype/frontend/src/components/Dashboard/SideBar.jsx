import {Container, Row, Col, Nav} from 'react-bootstrap'
import { NavLink } from 'react-router-dom';


const SideBar = () =>{
    return(
        <Container className="sidebar-container p-0">
            <Row className='p-5'>
                Company Name/Logo
            </Row>
            <Col className='sidebar-items'>
                <Nav variant='pills' defaultActiveKey={'/dashboard'} className="flex-column">
                    <NavLink to="/">Your Workspace</NavLink>
                    <NavLink to="/settings">Settings</NavLink>
                </Nav>
            </Col>
        </Container>
    );
}

export default SideBar;