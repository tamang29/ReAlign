import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Accordion } from 'react-bootstrap';
import Header from '../components/Dashboard/Header';
import '../styles/style.css';
import BreadCrumbRow from '../components/Dashboard/BreadCrumbRow';

const Payment = () => {
  const [isPayPalOpen, setIsPayPalOpen] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const navigate = useNavigate();

  const goToSettings = () => {
    navigate('../settings');
  };

  const togglePayPal = () => {
    setIsPayPalOpen(!isPayPalOpen);
    setIsCardOpen(false);
    setIsInvoiceOpen(false);
  };

  const toggleCard = () => {
    setIsCardOpen(!isCardOpen);
    setIsPayPalOpen(false);
    setIsInvoiceOpen(false);
  };

  const toggleInvoice = () => {
    setIsInvoiceOpen(!isInvoiceOpen);
    setIsPayPalOpen(false);
    setIsCardOpen(false);
  };

  return (
    <Container fluid>
          <BreadCrumbRow/>
          <Header title="Payment Methods" />
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header onClick={togglePayPal}>
                <span className="settings-header">PayPal</span>
              </Accordion.Header>
              <Accordion.Body>
                {isPayPalOpen && (
                  <div className="content">
                    PayPal payment method details.
                  </div>
                )}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header onClick={toggleCard}>
                <span className="settings-header">Credit Card</span>
              </Accordion.Header>
              <Accordion.Body>
                {isCardOpen && (
                  <div className="content">
                    Credit Card payment method details.
                  </div>
                )}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header onClick={toggleInvoice}>
                <span className="settings-header">Invoice</span>
              </Accordion.Header>
              <Accordion.Body>
                {isInvoiceOpen && (
                  <div className="content">
                    Invoice payment method details.
                  </div>
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Button variant="primary" onClick={goToSettings} className="mt-3"
          style={{ backgroundColor: "rgb(62,30,65)", color: 'white', border: 'none', borderRadius: '5px' }}>
            Back to Settings
          </Button>
    </Container>
  );
};

export default Payment;
