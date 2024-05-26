import {Container, Row, Col, Nav} from 'react-bootstrap'


const SideBar = () =>{
    return(
        <Container className="sidebar-container">
            <Row className='p-5 bg-light'>
                Company Name/Logo
            </Row>
            <Col className='sidebar-items'>
                <Nav defaultActiveKey={'/dashboard'} className="flex-column">
                    <Nav.Link href="/dashboard" >Your Workspace</Nav.Link>
                    <Nav.Link href="/settings">Settings</Nav.Link>
                </Nav>
            </Col>
        </Container>
    );
}

export default SideBar;