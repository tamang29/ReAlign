<<<<<<< HEAD
import { Container, Col, Row, Button, Card, Accordion } from "react-bootstrap";
import Header from "../components/Dashboard/Header";
import SideBar from "../components/Dashboard/SideBar";
=======
import { Container, Accordion } from "react-bootstrap";
import Header from "../components/Dashboard/Header";
>>>>>>> marina-week2
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/style.css';
import BreadCrumbRow from "../components/Dashboard/BreadCrumbRow";
<<<<<<< HEAD

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
=======
import SubscriptionModal from "../components/Settings/SubscriptionModal";
import SubscriptionPlanAccordion from '../components/Settings/SubscriptionPlanAccordion';
import AppearanceAccordion from '../components/Settings/AppearanceAccordion';
import ProfileSettingsAccordion from '../components/Settings/ProfileSettingsAccordion';

const Settings = () => {
  
  const location = useLocation();
  console.log("Location state:", location.state?.openSubscription);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(location.state?.openSubscription);
  const [isActiveKey, setIsActiveKey] = useState(null);
  const [isAppearanceOpen, setIsAppearanceOpen] = useState(false);
  const [isProfileSettingsOpen, setIsProfileSettingsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [profilePic, setProfilePic] = useState(`${process.env.PUBLIC_URL}/defaultProfilePic.png`); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {

  console.log("Effect triggered");
    if (isSubscriptionOpen) {
      setIsActiveKey("0");
    } else if (isAppearanceOpen) {
      setIsActiveKey("1"); 
    } else if (isProfileSettingsOpen) {
      setIsActiveKey("2");
    } else {
      setIsActiveKey(null)
    }
  }, []);
>>>>>>> marina-week2

  const goToPayment = () => {
    navigate('./payment');
  };

  const toggleSubscription = () => {
<<<<<<< HEAD
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

=======
    if (isSubscriptionOpen) {
    setIsActiveKey(null); // Set active key to null to close the accordion item entirely
  } else {
    setIsActiveKey("0"); // Set active key to "0" to open the accordion item
  }
    setIsSubscriptionOpen(!isSubscriptionOpen);
    setIsAppearanceOpen(false); // Close Appearances if it's open
    setIsProfileSettingsOpen(false); // Close Profile if it's open
  };

  const toggleAppearance = () => {
    if (isAppearanceOpen) {
      setIsActiveKey(null);
    } else {
      setIsActiveKey("1");
    }
    setIsAppearanceOpen(!isAppearanceOpen);
    setIsSubscriptionOpen(false); // Close Subscription Plan if it's open
    setIsProfileSettingsOpen(false); // Close Profile if it's open
  };

  const toggleProfileSettings = () => {
    if (isProfileSettingsOpen) {
      setIsActiveKey(null);
    } else {
      setIsActiveKey("2");
    }
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

  const handleProfilePicChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleProfileSettingsSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission, e.g., send data to the server
    console.log('Profile picture:', profilePic);
    console.log('New password:', password);
  };


>>>>>>> marina-week2
  return (
    <Container fluid>
        <BreadCrumbRow/>
       <Header title="Settings Page" />
<<<<<<< HEAD
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
=======
       <Accordion activeKey={isActiveKey}>
        <SubscriptionPlanAccordion
          toggleSubscription={toggleSubscription}
          isSubscriptionOpen={isSubscriptionOpen}
          handleCardClick={handleCardClick}
          goToPayment={goToPayment}
        />
        <AppearanceAccordion
          toggleAppearance={toggleAppearance}
          isAppearanceOpen={isAppearanceOpen}
        />
        <ProfileSettingsAccordion
          toggleProfileSettings={toggleProfileSettings}
          isProfileSettingsOpen={isProfileSettingsOpen}
          handleProfilePicChange={handleProfilePicChange}
          handlePasswordChange={handlePasswordChange}
          handleConfirmPasswordChange={handleConfirmPasswordChange}
          handleProfileSettingsSubmit={handleProfileSettingsSubmit}
          profilePic={profilePic}
          password={password}
          confirmPassword={confirmPassword}
        />
      </Accordion>
            <SubscriptionModal
              show={showModal}
              onHide={handleCloseModal}
              plan={selectedPlan}
            />
>>>>>>> marina-week2
    </Container>
  );
};

export default Settings;
