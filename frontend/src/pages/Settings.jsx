import { Container, Col, Row, Button, Card, Accordion } from "react-bootstrap";
import Header from "../components/Dashboard/Header";
import SideBar from "../components/Dashboard/SideBar";
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/style.css';
import BreadCrumbRow from "../components/Dashboard/BreadCrumbRow";

const Settings = () => {

  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [isAppearanceOpen, setIsAppearanceOpen] = useState(false);
  const [isProfileSettingsOpen, setIsProfileSettingsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.openSubscription) {
      setIsSubscriptionOpen(true);
    }
  }, [location.state]);

  const goToPayment = () => {
    navigate('./payment');
  };

  const toggleSubscription = () => {
    setIsSubscriptionOpen(!isSubscriptionOpen);
    setIsAppearanceOpen(false); // Close Appearances if it's open
    setIsProfileSettingsOpen(false); // Close Profile Settings if it's open
  };

  const toggleAppearance = () => {
    setIsAppearanceOpen(!isAppearanceOpen);
    setIsSubscriptionOpen(false); // Close Subscription Plan if it's open
    setIsProfileSettingsOpen(false); // Close Profile Settings if it's open
  };

  const toggleProfileSettings = () => {
    setIsProfileSettingsOpen(!isProfileSettingsOpen);
    setIsSubscriptionOpen(false); // Close Subscription Plan if it's open
    setIsAppearanceOpen(false); // Close Appearances if it's open
  };

  return (
    <Container fluid>
        <BreadCrumbRow/>
       <Header title="Settings Page" />
          <Accordion>
            <Accordion.Item eventKey="0" className="accordion-item">
              <Accordion.Header onClick={toggleSubscription} className="accordion-item-header">
                  <Col xs={9}>
                  <span className="settings-header">Subscription Plan</span>
                  </Col>
                  <Col xs={2}>
                  <Button
                    onClick={(e) => { e.stopPropagation(); goToPayment(); }}
                    className="ms-auto"
                    style={{ backgroundColor: "rgb(62,30,65)", color: 'white', border: 'none', borderRadius: '5px' }}> 
                    Edit Payment Method
                  </Button>
                  </Col>
              </Accordion.Header>
              <Accordion.Body>
                {isSubscriptionOpen && (
                  <div className="content">
                    {/* Display subscription plans as cards horizontally */}
                    <div className="subscription-cards d-flex">
                      <Card className="card mx-2">Plan 1</Card>
                      <Card className="card mx-2">Plan 2</Card>
                      <Card className="card mx-2">Plan 3</Card>
                      <Card className="card mx-2">Plan 4</Card>
                      <Card className="card mx-2">Plan 5</Card>
                    </div>
                  </div>
                )}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1" className="accordion-item">
              <Accordion.Header onClick={toggleAppearance} className="accordion-item-header">
              <span className="settings-header">Appearances</span>
              </Accordion.Header>
              <Accordion.Body>
                {isAppearanceOpen && (
                  <div className="content">
                    Appearances content
                  </div>
                )}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2" className="accordion-item">
              <Accordion.Header onClick={toggleProfileSettings} className="accordion-item-header">
              <span className="settings-header">Profile Settings</span>
              </Accordion.Header>
              <Accordion.Body>
                {isProfileSettingsOpen && (
                  <div className="content">
                    User Profile Settings: Change Password, Profile Pic
                  </div>
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
    </Container>
  );
};

export default Settings;
