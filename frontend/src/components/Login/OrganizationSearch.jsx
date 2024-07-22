
import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/api/organization`;

const OrganizationSearch = ({ registerData, setRegisterData, setRegisterError }) => {
  const [orgSearch, setOrgSearch] = useState('');
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      if (orgSearch && orgSearch !== registerData.organization) {
        try {
          const response = await axios.get(`${API_URL}/search`, { params: { query: orgSearch } });
          setOrganizations(response.data);
        } catch (error) {
          console.error(error);
        }
      } else {
        setOrganizations([]);
      }
    };
    fetchOrganizations();
  }, [orgSearch, registerData.organization]);

  const handleSelectOrganization = (orgName) => {
    setRegisterData((prevData) => ({ ...prevData, organization: orgName }));
    setOrgSearch(orgName);
    setOrganizations([]);
  };

  return (
    <Form.Group controlId="formOrganization">
      <Form.Label>Team</Form.Label>
      <Form.Control
        type="text"
        placeholder="Search your Team"
        value={orgSearch}
        onChange={(e) => {
          setOrgSearch(e.target.value);
          setRegisterData((prevData) => ({ ...prevData, organization: e.target.value }));
        }}
      />
      {organizations.length > 0 && orgSearch !== registerData.organization && (
        <ul className="organization-dropdown" style={{backgroundColor: 'white', color: 'black'}}>
          {organizations.map((org) => (
            <li key={org._id} onClick={() => handleSelectOrganization(org.name)}>
              {org.name}
            </li>
          ))}
        </ul>
      )}
    </Form.Group>
  );
};

export default OrganizationSearch;
