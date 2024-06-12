import { Container, Accordion } from "react-bootstrap";
import Header from "../components/Dashboard/Header";
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/style.css';
import BreadCrumbRow from "../components/Dashboard/BreadCrumbRow";
import SubscriptionModal from "../components/Settings/SubscriptionModal";
import SubscriptionPlanAccordion from '../components/Settings/SubscriptionPlanAccordion';
import AppearanceAccordion from '../components/Settings/AppearanceAccordion';
import ProfileSettingsAccordion from '../components/Settings/ProfileSettingsAccordion';

const Settings = () => {

  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [isAppearanceOpen, setIsAppearanceOpen] = useState(false);
  const [isProfileSettingsOpen, setIsProfileSettingsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [profilePic, setProfilePic] = useState(`${process.env.PUBLIC_URL}/defaultProfilePic.png`); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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


  return (
    <Container fluid>
        <BreadCrumbRow/>
       <Header title="Settings Page" />
       <Accordion>
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
    </Container>
  );
};

export default Settings;
