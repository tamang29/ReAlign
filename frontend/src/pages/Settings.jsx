import { Container, Accordion } from "react-bootstrap";
import Header from "../components/Dashboard/Header";
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/style.css';
import BreadCrumbRow from "../components/Dashboard/BreadCrumbRow";
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

  const goToPayment = () => {
    navigate('./payment');
  };

  const toggleSubscription = () => {
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


  return (
    <Container fluid>
        <BreadCrumbRow/>
       <Header title="Settings Page" />
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
    </Container>
  );
};

export default Settings;
