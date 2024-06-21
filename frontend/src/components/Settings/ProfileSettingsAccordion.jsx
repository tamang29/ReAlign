import React from 'react';
import { Accordion, Button, Col, Form, Image, Row, Container } from 'react-bootstrap';

const ProfileSettingsAccordion = ({
  toggleProfileSettings,
  isProfileSettingsOpen,
  handleProfilePicChange,
  handlePasswordChange,
  handleConfirmPasswordChange,
  handleProfileSettingsSubmit,
  profilePic,
  password,
  confirmPassword,
  handleLogout
}) => {
  return (
    <Accordion.Item eventKey="2" className="accordion-item">
      <Accordion.Header onClick={toggleProfileSettings} className="accordion-item-header">
        <span className="settings-header">Profile Settings</span>
      </Accordion.Header>
      <Accordion.Body>
        {isProfileSettingsOpen && (
          <Container className="p-3" style={{ maxWidth: '600px' }}>
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
                <Form onSubmit={handleProfileSettingsSubmit}>
                  <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={handlePasswordChange} />
                  </Form.Group>
                  <Form.Group controlId="formConfirmPassword" className="mb-3">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
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
