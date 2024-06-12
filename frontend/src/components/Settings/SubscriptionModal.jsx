import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import '../../styles/style.css';

const SubscriptionModal = ({ show, onHide, plan }) => {
  return (
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

          </>
        ) : (
          <Row>No plan selected</Row>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SubscriptionModal;
