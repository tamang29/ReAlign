import React, { useState } from 'react';
import { Accordion, Button, Col, Form, Image, Row, Container, Alert } from 'react-bootstrap';

const ProfileSettingsAccordion = ({
  toggleProfileSettings,
  isProfileSettingsOpen,
  handleLogout,
  user
}) => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePic, setProfilePic] = useState(`${process.env.PUBLIC_URL}/defaultProfilePic.png`);

  const handleProfilePicChange = (e) => {
    setProfilePic(URL.createObjectURL(e.target.files[0]));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleProfileSettingsSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      setSuccessMessage('');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        },
        body: JSON.stringify({ password })
      });

      if (!response.ok) {
        throw new Error('Failed to update password');
      }

      setSuccessMessage('Password updated successfully');
      setErrorMessage('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage('');
    }
  };

  return (
    <Accordion.Item eventKey="2" className="accordion-item">
      <Accordion.Header onClick={toggleProfileSettings} className="accordion-item-header">
        <span className="settings-header">Profile Settings</span>
      </Accordion.Header>
      <Accordion.Body>
        {isProfileSettingsOpen && (
          <Container className="p-3 scrollable-container">
            <Row className="content">
              <Col md={4} className="text-center">
                {profilePic && (
                  <Image src={profilePic} roundedCircle className="mb-3" style={{ width: '150px', height: '150px' }} />
                )}
                <Form.Group controlId="formProfilePic" className="mb-3">
                  <Form.Control
                    type="file"
                    onChange={handleProfilePicChange}
                    style={{ display: 'none' }}
                    id="fileInput"
                  />
                  <Button
                    onClick={() => document.getElementById('fileInput').click()}
                    style={{ backgroundColor: 'rgb(62,30,65)', color: 'white', border: 'none', borderRadius: '5px' }}
                  >
                    Change Profile Picture
                  </Button>
                </Form.Group>
              </Col>
              <Col md={8}>
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <Form onSubmit={handleProfileSettingsSubmit}>
                  <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={user.email}
                      readOnly
                      className="read-only-field"
                    />
                  </Form.Group>
                  <Form.Group controlId="formName" className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={`${user.firstName} ${user.lastName}`}
                      readOnly
                      className="read-only-field"
                    />
                  </Form.Group>
                  <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formConfirmPassword" className="mb-3">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    style={{ backgroundColor: 'rgb(62,30,65)', color: 'white', border: 'none', borderRadius: '5px' }}
                  >
                    Save Changes
                  </Button>
                </Form>
                <Button variant="danger" onClick={handleLogout} className="mt-3">
                  Logout
                </Button>
              </Col>
            </Row>
          </Container>
        )}
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default ProfileSettingsAccordion;
