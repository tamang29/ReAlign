import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import BreadCrumbRow from "../Dashboard/BreadCrumbRow";
import Header from "../Dashboard/Header";
import UserContext from '../../context/UserContext';

// Component for creating a new organization
const CreateOrganization = () => {
    
    const navigate = useNavigate(); // Hook for programmatic navigation
    const [user, organization, subscription] = useContext(UserContext); // Access user, organization, and subscription from context
    const [organizationName, setOrganizationName] = useState(''); // State to hold the new organization name
    const [error, setError] = useState(null); // State to hold error messages

    // Navigate back to the settings page
    const handleBackToSettings = () => {
        navigate('../settings'); // Update path if necessary
    };

    // Navigate to the join organization page
    const handleJoinOrganization = () => {
        navigate('../settings/join-organization'); // Update path if necessary
    };

    // Handle the creation of a new organization
    const handleCreateOrganization = async (e) => {
        e.preventDefault(); // Prevent form from submitting the default way

        try {
          // Create a new subscription
          const today = new Date();
          const endIfToday = new Date();
          endIfToday.setDate(today.getDate() + 365); // Subscription valid for 1 year
          const newSubscriptionData = {
            start: today.toISOString(),
            end: endIfToday.toISOString(),
            level: "Explorer",
            price: 0.0
          };

          // Send a POST request to create the subscription
          const responseSub = await fetch(`${process.env.REACT_APP_API_URL}/api/subscription`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newSubscriptionData)
          });

          // Handle errors in subscription creation
          if (!responseSub.ok) {
            throw new Error('Failed to create subscription');
          }

          const subscriptionResponse = await responseSub.json();
          const subscriptionId = subscriptionResponse._id;

          // Create the new organization
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/organization`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: organizationName, email: user.email, users: [user._id], subscription: subscriptionId }),
          });

          // Handle errors in organization creation
          if (!response.ok) {
            throw new Error('Failed to create organization');
          }
           
          const organizationResponse = await response.json();
          const organizationId = organizationResponse._id;

          // Update the user's role to "Admin" and set their organization
          try {
            const response2 = await fetch(`${process.env.REACT_APP_API_URL}/api/user/${user._id}`, {
              method: 'PUT',
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ role: "Admin", organization: organizationId }),
            });

            // Handle errors in updating the user
            if (!response2.ok) {
              const errorResponse = await response2.json();
              throw new Error(errorResponse.message || 'Failed to update user');
            }
        
            const updatedUser = await response2.json();
            console.log('User updated successfully', updatedUser); // Log success
          } catch (error) {
            console.error('Error updating user:', error.message);  // Log the error
            setError("Failed to create organization"); // Set error message to display
          }
          
          navigate('../../login'); // Navigate to login page after successful organization creation
        } catch (error) {
          setError(error.message); // Set error message to display if there's an error
        }
    };

    return (
        <Container fluid>
            <BreadCrumbRow /> {/* Render breadcrumb navigation */}
            <Header title="Create a team" /> {/* Render the page header */}
            <Form onSubmit={handleCreateOrganization}> {/* Form to create a new organization */}
                <Form.Group controlId="organizationName">
                    <Form.Label>You are not currently part of any team. Create a new team now and log in:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter organization name"
                        value={organizationName}
                        onChange={(e) => setOrganizationName(e.target.value)}
                        required
                    />
                </Form.Group>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if any */}
                <Row className="d-flex align-items-start mt-3">
                    {/* Button to submit the form and create the new organization */}
                    <Col xs="auto">
                        <Button
                            type="submit"
                            variant="primary"
                            className="mb-3"
                        >
                            Create Team
                        </Button>
                    </Col>
                    {/* Button to navigate to the join organization page */}
                    <Col xs="auto">
                        <Button
                            onClick={handleJoinOrganization}
                            style={{ border: 'none', backgroundColor: '#f8f9fa', color: 'black', border: '1px solid #ddd', borderRadius: '5px' }}
                        >
                            Join a team
                        </Button>
                    </Col>
                    {/* Button to navigate back to the settings page */}
                    <Col xs="auto">
                        <Button
                            onClick={handleBackToSettings}
                            style={{ border: 'none', backgroundColor: '#f8f9fa', color: 'black', border: '1px solid #ddd', borderRadius: '5px' }}
                        >
                            Back to settings
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default CreateOrganization;
