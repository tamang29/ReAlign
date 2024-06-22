import React, { useState } from 'react';
import { Form, Button, Container, Modal, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as AuthService from '../services/AuthService'; // Import your AuthService
import '../styles/LoginPage.css'; // Import the custom CSS

const LoginPage = () => {
  const navigate = useNavigate();
  const authService = AuthService; // Use your AuthService

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegisterClick = () => {
    setShow(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password };
      const response = await authService.login(userData); // Call login method from AuthService
      if (response.token) {
        localStorage.setItem('userToken', response.token);
        navigate('/dashboard');
      } else {
        // Handle login failure, show error message to user
        console.error('Login failed:', response.error); // Example: if login fails
      }
    } catch (error) {
      console.error('Login error:', error);
      // Handle other potential errors (network, etc.)
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className="login-page">
      <Container className="login-container d-flex flex-column align-items-center justify-content-center">
        <Form className="login-form" onSubmit={handleLogin}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="button-container">
            <Button variant="primary" type="submit" className="my-3">
              Login
            </Button>
            <div className="text-center my-3 or-separator">OR</div>
            <Button variant="primary" className="mb-3" onClick={handleRegisterClick}>
              Create a new account
            </Button>
          </div>
        </Form>
        {/* Registration Modal */}
        <Modal show={show} onHide={handleClose} className="custom-modal">
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
              </Form.Group>
              <Form.Group controlId="formUploadPhoto" className="mb-3 align-items-right">
                <Form.Label>Upload Profile Photo</Form.Label>
                {/* Include your FileUploadButton component */}
              </Form.Group>
              <div className="button-container">
                <Button variant="primary" type="submit" className="mt-3">
                  Get Started
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
        <a href="#" className="d-block text-center">
          Forgot your password?
        </a>
        <div className="d-flex justify-content-center">
          <img
            src={`${process.env.PUBLIC_URL}/ReAlignLogo.png`}
            width="450"
            height="100"
            className="logo"
            alt="ReAlign logo"
          />
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
