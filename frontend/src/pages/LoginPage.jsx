// src/pages/LoginPage.js
import React, { useState } from 'react';
import {Container} from 'react-bootstrap';
import LoginForm from '../components/Login/LoginForm';
import RegisterModal from '../components/Login/RegisterModal';
import '../styles/LoginPage.css';

const LoginPage = () => {

  const [show, setShow] = useState(false); // State to control the visibility of the registration modal
 
  const handleShowRegister = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className="login-page">
      <Container className="login-container d-flex flex-column align-items-center justify-content-center">
        <LoginForm onShowRegister={handleShowRegister} />
        <RegisterModal show={show} handleClose={handleClose}/>
      </Container>
    </div>
  );
};

export default LoginPage;
