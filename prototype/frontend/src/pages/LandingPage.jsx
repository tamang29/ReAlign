import React from 'react';
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css'; // Import the custom CSS from the styles folder

const LandingPage = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/login');
    };

    return (
        <div>
            <Navbar bg="transparent" variant="dark" expand="lg" className="landing-navbar">
                {/* <Navbar.Brand href="#home">ReAlign</Navbar.Brand> */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end"> {/* Add className "justify-content-end" */}
                    <Nav>
                        <Nav.Link href="#contact"> Contact Us </Nav.Link>
                        <Button variant="dark" onClick={handleGetStarted}>Get Started</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
      
              <img 
                      src={`${process.env.PUBLIC_URL}/ReAlignLogo.png`}
                      width="820"
                      height="240"
                      className="d-inline-block align-top main-logo"
                      alt="ReAlign logo"
              />
            
            <Container fluid className="text-center my-5">
                <p className="lead">Simplifying Requirements Engineering for Agile Teams!</p>
                <p className='text-left1'>
                    All-in-one requirements engineering platform designed to streamline the documentation,
                    management, and collaboration of project requirements.
                </p>
                <p className='text-left2'>
                    Whether you're a Product Owner, Project Manager, or Software Developer, ReAlign helps you improve
                    project clarity, reduce delays, and enhance team collaboration!
                </p>
                <Row className="my-4">
                    <Col>
                        <img src={`${process.env.PUBLIC_URL}/ConsistencyIcon.png`} alt="Version Consistency" className="feature-icon1" />
                        <p>Version Consistency of Requirements.</p>
                    </Col>
                    <Col>
                        <img src={`${process.env.PUBLIC_URL}/ReqIcon.png`} alt="Requirements Specification" className="feature-icon2" />
                        <p>Requirements Elicitation, Specification, Diagrams in one Tool.</p>
                    </Col>
                    <Col>
                        <img src={`${process.env.PUBLIC_URL}/CollabIcon.png`} alt="Team Collaboration" className="feature-icon3" />
                        <p>Seamless Team Collaboration.</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default LandingPage;
