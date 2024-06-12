import { Container, Col, Row, Button, Card, Accordion } from "react-bootstrap";
import Header from "../components/Dashboard/Header";
import SideBar from "../components/Dashboard/SideBar";
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/style.css';
import BreadCrumbRow from "../components/Dashboard/BreadCrumbRow";
import SubscriptionModal from "../components/Settings/SubscriptionModal";

const Settings = () => {

  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [isAppearanceOpen, setIsAppearanceOpen] = useState(false);
  const [isProfileSettingsOpen, setIsProfileSettingsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
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
  };

  const toggleAppearance = () => {
    setIsAppearanceOpen(!isAppearanceOpen);
    setIsSubscriptionOpen(false); // Close Subscription Plan if it's open
  };

  const toggleProfileSettings = () => {
    setIsProfileSettingsOpen(!isProfileSettingsOpen);
    setIsSubscriptionOpen(false);
    setIsAppearanceOpen(false);
  };

  const handleCardClick = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPlan(null);
  };


  const subscriptionPlans = [
    {
      name: "Explorer",
      users: "up to 5 users",
      features: "basic features",
      storage: "up to 1 GB storage",
      price: "FREE",
      perfectFor: "Ideal for hobby or school projects, or to get familiar with the software",
      projects: "only 1 project",
      documentManagement: "Basic templates available",
      visualModeling: "Basic model types available",
      versionControl: "no",
      collaboration: "no",
      checklists: "no",
      crossChecks: "no",
      integrations: "no",
      support: "no",
      analytics: "no",
      additionalFeatures: "none"
    },
    {
      name: "Pioneer",
      users: "up to 10 users",
      features: "basic features",
      storage: "up to 5 GB storage",
      price: "99€/month",
      perfectFor: "Ideal for small teams or startups with basic requirements engineering needs",
      projects: "only 1 project",
      documentManagement: "Basic templates available",
      visualModeling: "Basic model types available",
      versionControl: "no",
      collaboration: "Basic",
      checklists: "Basic",
      crossChecks: "no",
      integrations: "no",
      support: "no",
      analytics: "no",
      additionalFeatures: "none"
    },
    {
      name: "Navigator",
      users: "up to 25 users",
      features: "standard features",
      storage: "up to 20 GB storage",
      price: "189€/month",
      perfectFor: "Suitable for growing teams or mid-sized companies requiring more comprehensive requirements management capabilities",
      projects: "up to 5 projects",
      documentManagement: "Standard templates available",
      visualModeling: "Standard model types available",
      versionControl: "yes",
      collaboration: "Advanced",
      checklists: "Advanced and customizable",
      crossChecks: "no",
      integrations: "no",
      support: "yes",
      analytics: "no",
      additionalFeatures: "none"
    },
    {
      name: "Voyager",
      users: "unlimited users",
      features: "premium features",
      storage: "unlimited storage",
      price: "499€/month",
      perfectFor: "Designed for larger enterprises or consulting firms with complex requirements engineering requirements",
      projects: "up to 20 projects",
      documentManagement: "Premium templates available, own template creation",
      visualModeling: "Premium model types available",
      versionControl: "yes",
      collaboration: "Advanced, real-time",
      checklists: "Advanced and customizable",
      crossChecks: "yes",
      integrations: "yes (Jira, Github)",
      support: "yes, with an account manager",
      analytics: "yes",
      additionalFeatures: "none"
    },
    {
      name: "Enterprize",
      users: "unlimited users",
      features: "premium & custom features",
      storage: "unlimited storage",
      price: "CUSTOM PRICING",
      perfectFor: "Ideal for large enterprises seeking personalized solutions and advanced support",
      projects: "unlimited projects",
      documentManagement: "Premium templates available, own template creation",
      visualModeling: "Premium model types available, custom model types",
      versionControl: "yes",
      collaboration: "Advanced, real-time, custom",
      checklists: "Advanced and customizable",
      crossChecks: "yes",
      integrations: "yes, even custom",
      support: "yes, with an account manager",
      analytics: "yes and customizable",
      additionalFeatures: "dedicated infrastructure, security management, etc."
    }
  ];


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
                      <div className="subscription-cards d-flex">
                        {subscriptionPlans.map((plan, index) => (
                          <Card key={index} className="card mx-2" onClick={() => handleCardClick(plan)}>
                            <Row>{plan.name}</Row>
                            <Row>{plan.users}</Row>
                            <Row>{plan.features}</Row>
                            <Row>{plan.storage}</Row>
                            <Row>{plan.price}</Row>
                          </Card>
                        ))}
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
            <SubscriptionModal
              show={showModal}
              onHide={handleCloseModal}
              plan={selectedPlan}
            />
    </Container>
  );
};

export default Settings;
