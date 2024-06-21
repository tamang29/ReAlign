import React, { useState } from 'react';
import { Form, Button, Modal, Col, Row, Alert } from 'react-bootstrap';
import FileUploadButton from './FileUploadButton';
import axios from 'axios';

const isValidEmail = (email) => {
  //remove leading and trailing spaces
  email = email.trim();
  const re = /^(?![.])[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?<![.])$/;
  return re.test(email);
};

// Base URL for the authentication API
const API_URL = 'http://localhost:3000/api/auth';

//register a new user
const registerUser = async (userData) => {
    try {
        // Send a POST request to the /register endpoint with the user data
        const response = await axios.post(`${API_URL}/register`, userData);
        // Return the response data from the server
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const RegisterModal = ({ show, handleClose}) => {
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
    //profile photo not necessary for registration
  });
  const [registerError, setRegisterError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [success, setSuccess] = useState(null); // State to store success message

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      !registerData.firstName ||
      !registerData.lastName ||
      !registerData.email ||
      !registerData.password ||
      !registerData.repeatPassword
    ) {
      setRegisterError('Please complete all necessary fields.');
      return;
    }
    if (!isValidEmail(registerData.email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    if (registerData.password !== registerData.repeatPassword) {
      setRegisterError('Passwords do not match.');
      return;
    }
    try {
      const data = await registerUser(registerData);
      console.log(data);
      setSuccess('Registration successful!');
      setRegisterError(null);
      setTimeout(() => {
        handleClose();
        setSuccess(null);
      }, 2000);
    } catch (err) {
      setRegisterError(err.message);
    }
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
    if (name === 'email') {
      if (!isValidEmail(value)) {
        setEmailError('Please enter a valid email address.');
      } else {
        setEmailError(null);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose} className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Get Started With ReAlign!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {registerError && <Alert variant="danger">{registerError}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleRegister}>
          <Row>
            <Form.Group as={Col} controlId="formFirstName">
              <Form.Label>First Name*</Form.Label>
              <Form.Control 
                type="text"
                placeholder="First name"
                name="firstName"
                value={registerData.firstName}
                onChange={handleRegisterChange} 
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formLastName">
              <Form.Label>Last Name*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last name"
                name="lastName"
                value={registerData.lastName}
                onChange={handleRegisterChange}
              />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address*</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              name="email"
              value={registerData.email}
              onChange={handleRegisterChange}
              isInvalid={!!emailError}
            />
            <Form.Control.Feedback type="invalid">
              {emailError}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password*</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={registerData.password}
              onChange={handleRegisterChange}
            />
          </Form.Group>
          <Form.Group controlId="formRepeatPassword">
            <Form.Label>Repeat Password*</Form.Label>
            <Form.Control
              type="password"
              placeholder="Repeat Password"
              name="repeatPassword"
              value={registerData.repeatPassword}
              onChange={handleRegisterChange}
            />
          </Form.Group>
          <Form.Group controlId="formUploadPhoto" className="mb-3 align-items-right">
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
  );
};

export default RegisterModal;
