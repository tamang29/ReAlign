import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import BreadCrumbRow from "../Dashboard/BreadCrumbRow";
import Header from "../Dashboard/Header";
import UserContext from '../../context/UserContext';
import OrganizationSearch from '../Login/OrganizationSearch';
import axios from 'axios';

const JoinOrganization = () => {
  const navigate = useNavigate();
  const [user] = useContext(UserContext);
  const [orgJoinData, setOrgJoinData] = useState({
    organization: '',
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleBackToSettings = () => {
    navigate('../settings'); // Replace with the actual path
  };

  const handleCreateOrganization = () => {
    navigate('../settings/create-organization'); // Replace with the actual path
  };

  const handleJoinOrganization = async () => {
    try {
      if (!orgJoinData.organization) {
        setMessageType('error');
        setMessage('Please search for an existing organization');
      }else{
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/organization/join`, {
        userId: user._id,
        organization: orgJoinData.organization
      });
      setMessageType('success');
      setMessage(response.data.message);
    }
    } catch (error) {
      setMessageType('error');
      setMessage(error.response.data.message || 'Failed to join organization');
    }
  };

  return (
    <Container fluid>
      <BreadCrumbRow />
      <Header title="Join an existing team on ReAlign" />
      {message && (
        <Row className="mb-3">
          <Col>
            <Alert variant={messageType === 'success' ? 'success' : 'danger'}>
              {message}
            </Alert>
          </Col>
        </Row>
      )}
      <Row className="mb-3"> 
        <OrganizationSearch
          registerData={orgJoinData.organization} 
          setRegisterData={setOrgJoinData}
        />
      </Row>
      <Row className="d-flex align-items-start">
        <Col xs="auto">
          <Button
            type="submit"
            variant="primary"
            className="mb-3"
            onClick={handleJoinOrganization}
          >
            Join Team
          </Button>
        </Col>
        <Col xs="auto">
          <Button
            variant="primary"
            onClick={handleCreateOrganization}
            className="mb-3"
            style={{ border: 'none', backgroundColor: '#f8f9fa', color: 'black'}}>
            Create a team
          </Button>
        </Col>
        <Col xs="auto">
          <Button
            variant="primary"
            onClick={handleBackToSettings}
            className="mb-3"
            style={{ border: 'none', backgroundColor: '#f8f9fa', color: 'black'}}
          >
            Back to settings
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default JoinOrganization;
