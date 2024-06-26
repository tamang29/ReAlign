import React, { useState } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import '../../styles/style.css';

const SubscriptionModal = ({ show, onHide, plan, changePlan, subscription, organization }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleConfirmChange = async () => {
    onHide(); // Close the subscription modal after plan change
    setShowConfirmModal(false); // Close the confirmation modal

    try {
      // Calculate new start date (one day after current plan's end date)
      const currentEndDate = subscription['end']; // Adjust this based on your actual subscription data structure
      const newStartDate = new Date(currentEndDate);
      const newEndDate = new Date(newStartDate);
      newStartDate.setDate(newStartDate.getDate() + 1);
      newEndDate.setDate(newStartDate.getDate() + 365);

      const level = plan.name
      let num_price = 0.0
      if (level === 'Pioneer') {
         num_price = 99.0
      } else if (level === 'Navigator') {
         num_price = 189.0
      } else if (level === 'Voyager') {
         num_price = 499.0
      } else if (level === 'Enterprize') {
        num_price = 1000.0
      }


      // Prepare data for API call to create new subscription
      const newSubscriptionData = {
        start: newStartDate.toISOString(), // Convert to ISO string format for sending to API
        end: newEndDate.toISOString(),
        level: level,
        price: num_price
      };

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSubscriptionData)
      });

      if (!response.ok) {
        throw new Error('Failed to create new subscription');
      }

      const responseData = await response.json();
      const newSubscriptionId = responseData._id; // Adjust based on actual API response structure
      
      const updateJSON = {
        nextSubscription: newSubscriptionId
      }

      const response2 = await fetch(`${process.env.REACT_APP_API_URL}/api/organization/${organization['_id']}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateJSON)
      });

      if (!response2.ok) {
        throw new Error('Failed to add as next subscription');
      }

    } catch (error) {
      // Handle error: show error message, log to console, etc.
      console.error('Failed to create new subscription:', error.message);
      // Optionally, show error message to the user
    }
    
  };

  return (
    <>
      <Modal show={show} onHide={onHide} plan={plan} className="subscription-modal">
        <Modal.Header closeButton>
          <Modal.Title>{plan && plan.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {plan ? (
            <>
              <Row>{plan.perfectFor}</Row>
              <Row><Col><strong>Team Size:</strong></Col> <Col>{plan.users}</Col></Row>
              <Row><Col><strong>Number of Projects:</strong></Col> <Col> {plan.projects}</Col></Row>
              <Row><Col><strong>Storage:</strong></Col> <Col> {plan.storage}</Col></Row>
              <Row><Col><strong>Document Creation and Management:</strong></Col> <Col> {plan.documentManagement}</Col></Row>
              <Row><Col><strong>Visual Modelling Tools:</strong></Col> <Col> {plan.visualModeling}</Col></Row>
              <Row><Col><strong>Collaboration Features:</strong></Col> <Col> {plan.collaboration}</Col></Row>
              <Row><Col><strong>Checklists and Best Practices:</strong></Col> <Col> {plan.checklists}</Col></Row>
              <Row><Col><strong>Version Control:</strong></Col> <Col> {plan.versionControl}</Col></Row>
              <Row><Col><strong>Premium Support:</strong></Col> <Col> {plan.support}</Col></Row>
              <Row><Col><strong>Automatic Cross-Checks:</strong></Col> <Col> {plan.crossChecks}</Col></Row>
              <Row><Col><strong>Integrations with Other Software:</strong></Col> <Col> {plan.integrations}</Col></Row>
              <Row><Col><strong>Analytics and Reporting:</strong></Col> <Col>{plan.analytics}</Col></Row>
              <Row><Col><strong>Additional Features:</strong></Col> <Col> {plan.additionalFeatures}</Col></Row>
              <Row style={{ textAlign: 'center', fontSize: "16pt" }}><strong>{plan.price}</strong></Row>

              {/* Conditionally render Change Plan button or selected message */}
              {plan.name !== subscription['level'] ? (
                <div className="d-flex justify-content-center mt-3">
                  <Button variant="primary" onClick={() => setShowConfirmModal(true)}
                    style={{ border: 'none', backgroundColor: '#3e1e41', color: 'white' }}>
                    Change Plan
                  </Button>
                </div>
              ) : (
                <div className="d-flex justify-content-center mt-3">
                  <strong>This is your selected subscription plan </strong>
                </div>
              )}
            </>
          ) : (
            <Row>No plan selected</Row>
          )}
        </Modal.Body>
      </Modal>

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: '#3e1e41' }}>Confirm Plan Change</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to change the plan to <strong>{plan?.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmChange}
            style={{ border: 'none', backgroundColor: '#3e1e41', color: 'white' }}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SubscriptionModal;
