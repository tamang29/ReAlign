import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Base URL for the authentication API
const API_URL = 'http://localhost:3000/api/auth';

//log in a user
const loginUser = async (userData) => {
    try {
        // Send a POST request to the /login endpoint with the user data
        const response = await axios.post(`${API_URL}/login`, userData);
        // Return the response data from the server
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const LoginForm = ({ onShowRegister }) => {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email: loginEmail, password: loginPassword });
      console.log(data);
      navigate('/dashboard'); 
    } catch (err) {
      setLoginError(err.message);
    }
  };

  return (
    <Form className="login-form" onSubmit={handleLogin}>
      {loginError && <Alert variant="danger">{loginError}</Alert>}
      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
      </Form.Group>
      <div className="button-container">
        <Button variant="primary" type="submit" className="my-3">
          Login
        </Button>
        <div className="text-center my-3 or-separator">OR</div>
        <Button variant="primary" className="mb-3" onClick={onShowRegister}>
          Create a new account
        </Button>
      </div>
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
  );
};

export default LoginForm;
