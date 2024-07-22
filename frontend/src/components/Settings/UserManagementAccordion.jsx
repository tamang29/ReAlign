import React, { useState, useEffect, useContext } from 'react';
import { Accordion, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import UserContext from '../../context/UserContext';
import axios from 'axios';
import { FaTrash} from 'react-icons/fa';
import '../../styles/Settings.css';

const UserManagementAccordion = ({ toggleUserManagement, isUserManagementOpen }) => {
  const [user, organization, subscription] = useContext(UserContext);
  const [orgUsersDetails, setOrgUsersDetails] = useState([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const orgUsers = organization?.users;

  // Fetch organization users details when the component mounts or orgUsers changes
  useEffect(() => {
    if (orgUsers && orgUsers.length > 0) {
      fetchUsersDetails();
    }
  }, [orgUsers]);

  // Fetch details for each user in the organization
  const fetchUsersDetails = async () => {
    try {
      const promises = orgUsers.map(user =>
        fetch(`${process.env.REACT_APP_API_URL}/api/user/organization/${user._id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }).then(response => {
            if (!response.ok) {
              throw new Error('Failed to fetch user details');
            }
            return response.json();
          })
      );
      const usersDetails = await Promise.all(promises);
      // Sort users so that the logged-in user is at the top
      const sortedUsersDetails = usersDetails.sort((a, b) => (a._id === user._id ? -1 : 1));
      setOrgUsersDetails(sortedUsersDetails);
    } catch (error) {
      console.error('Error fetching users details:', error.message);
    }
  };

  // Handle removing a user from the organization
  const handleRemoveUser = async (userId) => {
    let userCount = organization.users.length;
    try {
      // Update the user's organization to null
      const responseUser = await fetch(`${process.env.REACT_APP_API_URL}/api/user/organization/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
        body: JSON.stringify({ organization: null, role: null }),
      });

      if (!responseUser.ok) {
        throw new Error('Failed to update user');
      }

      // Remove the user from the organization
      const updatedUsers = organization.users.filter(user => user._id !== userId);
      const responseOrg = await fetch(`${process.env.REACT_APP_API_URL}/api/organization/${organization._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
        body: JSON.stringify({ users: updatedUsers }),
      });

      if (!responseOrg.ok) {
        throw new Error('Failed to update team');
      }

      // Update local state
      setOrgUsersDetails(orgUsersDetails.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error removing user:', error.message);
    }

    userCount -= 1;
    // Clear upgrade required message in organization and local storage if user count is within limit
    if (subscription && userCount <= subscription.userLimit) {
      localStorage.removeItem('upgradeAlert');
      window.location.reload();
    }
  };

  // Handle adding a new user to the organization
  const handleAddUser = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/organization/add`, {
        email: newUserEmail,
        organizationId: organization._id,
      });

      setMessageType('success');
      setMessage(response.data.message);
      fetchUsersDetails(); // Refresh user list
      handleModalClose();
    } catch (error) {
      setMessageType('error');
      setMessage(error.response.data.message || 'Failed to add user to team');
    }
    window.location.reload();
  };

  // Close the add user modal and reset the email field
  const handleModalClose = () => {
    setShowAddUserModal(false);
    setNewUserEmail('');
  };

  return (
    <Accordion.Item eventKey="1" className="accordion-item">
      <Accordion.Header onClick={toggleUserManagement} className="accordion-item-header">
        <span className="settings-header">User Management</span>
      </Accordion.Header>
      <Accordion.Body>
        {isUserManagementOpen && (
          <div className="content">
            <h5>Users at your Team: </h5>
            {orgUsersDetails.length > 0 ? (
              <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>  </th>
                </tr>
              </thead>
              <tbody>
                {orgUsersDetails.map((orgUser, index) => (
                  <tr key={index}>
                    <td>{orgUser.firstName} {orgUser.lastName}</td>
                    <td>{orgUser.email}</td>
                    <td>{orgUser.role}</td>
                    <td>
                      {orgUser._id !== user._id && (
                        <FaTrash
                          className="icon-button" 
                          onClick={() => handleRemoveUser(orgUser._id)}
                          />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            ) : (
              <p>No users found.</p>
            )}
            <Button
              variant="primary"
              onClick={() => setShowAddUserModal(true)}
              className="mt-3"
            >
              Add Users
            </Button>
          </div>
        )}
      </Accordion.Body>

      <Modal show={showAddUserModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        {message && (
          <Alert variant={messageType === 'success' ? 'success' : 'danger'}>
            {message}
          </Alert>
        )}
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUserEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddUser}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>
    </Accordion.Item>
  );
};

export default UserManagementAccordion;
