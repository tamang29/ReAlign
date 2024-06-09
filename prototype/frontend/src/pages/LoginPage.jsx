// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Form, Button, Container, Modal, Col, Row} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FileUploadButton from '../components/Login/FileUploadButton';
import '../styles/LoginPage.css'; // Import the custom CSS

const LoginPage = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleRegisterClick = () => {
    setShow(true);
    console.log('Modal should open', show);  
  };

  const handleLogin = () => {
    navigate('/dashboard'); 
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className="login-page">
    <Container className="login-container d-flex flex-column align-items-center justify-content-center">
      <Form className="login-form">
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <div className="button-container">
            <Button variant="primary" type="submit" className="my-3" onClick={handleLogin}>
              Register
            </Button>
            <div className="text-center my-3 or-separator">OR</div>
            <Button variant="primary" className="mb-3" onClick={handleRegisterClick}>
              Create a new account
            </Button>
          </div>
        {/* <RegistrationModal show={show} onHide={handleClose} /> */}
        <Modal show={show} onHide={handleClose} ClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>Get Started With ReAlign!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
            <Row>
              <Form.Group as={Col} controlId="formFirstName">
                <Form.Label>First Name*</Form.Label>
                <Form.Control type="text" placeholder="First name" />
              </Form.Group>
              <Form.Group as={Col} controlId="formLastName">
                <Form.Label>Last Name*</Form.Label>
                <Form.Control type="text" placeholder="Last name" />
              </Form.Group>
            </Row>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Email address*</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    autoFocus
                  />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password*</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group controlId="formRepeatPassword">
                <Form.Label>Repeat Password*</Form.Label>
                <Form.Control type="password" placeholder="Repeat Password" />
              </Form.Group >
    
              <Form.Group controlId="formUploadPhoto"className="mb-3 align-items-right">
                <Form.Label>Upload Profile Photo</Form.Label>
                <FileUploadButton className="FileInput"/>
              </Form.Group>
              <div className="button-container">
              <Button variant="primary" type="submit" className="mt-3">
                Get Started
              </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
        <a href="#" className="d-block text-center">Forgot your password?</a>
        <div className="d-flex justify-content-center">
            <img 
              src={`${process.env.PUBLIC_URL}/ReAlignLogo.png`}
              width="450"
              height="100"
              className="logo"
              alt="ReAlign logo"
            />
          </div>
      </Form>
    
    </Container>
    </div>
  );
};

export default LoginPage;
