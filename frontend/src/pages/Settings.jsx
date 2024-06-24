import { Container, Accordion } from "react-bootstrap";
import Header from "../components/Dashboard/Header";
import { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/style.css';
import BreadCrumbRow from "../components/Dashboard/BreadCrumbRow";
import SubscriptionModal from "../components/Settings/SubscriptionModal";
import SubscriptionPlanAccordion from '../components/Settings/SubscriptionPlanAccordion';
import AppearanceAccordion from '../components/Settings/AppearanceAccordion';
import ProfileSettingsAccordion from '../components/Settings/ProfileSettingsAccordion';
import UserContext from '../context/UserContext';
import { logout } from '../services/AuthService';

const Settings = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(location.state?.openSubscription);
  const [isActiveKey, setIsActiveKey] = useState(null);
  const [isAppearanceOpen, setIsAppearanceOpen] = useState(false);
  const [isProfileSettingsOpen, setIsProfileSettingsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);


  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    if (isSubscriptionOpen) {
      setIsActiveKey("0");
    } else if (isAppearanceOpen) {
      setIsActiveKey("1");
    } else if (isProfileSettingsOpen) {
      setIsActiveKey("2");
    } else {
      setIsActiveKey(null);
    }
  }, [isSubscriptionOpen, isAppearanceOpen, isProfileSettingsOpen]);

  const goToPayment = () => {
    navigate('./payment');
  };

  const toggleSubscription = () => {
    if (isSubscriptionOpen) {
      setIsActiveKey(null);
    } else {
      setIsActiveKey("0");
    }
    setIsSubscriptionOpen(!isSubscriptionOpen);
    setIsAppearanceOpen(false);
    setIsProfileSettingsOpen(false);
  };

  const toggleAppearance = () => {
    if (isAppearanceOpen) {
      setIsActiveKey(null);
    } else {
      setIsActiveKey("1");
    }
    setIsAppearanceOpen(!isAppearanceOpen);
    setIsSubscriptionOpen(false);
    setIsProfileSettingsOpen(false);
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

  

  

  const handleLogout = () => {
    logout();
    // setUser(null);
    navigate('/login');
  };

  return (
    <Container fluid>
      <BreadCrumbRow/>
      <Header title="Settings Page" />
      <Accordion activeKey={isActiveKey}>
        {user && user.role === 'Admin' && (
          <SubscriptionPlanAccordion
            toggleSubscription={toggleSubscription}
            isSubscriptionOpen={isSubscriptionOpen}
            handleCardClick={handleCardClick}
            goToPayment={goToPayment}
          />
        )}
        <AppearanceAccordion
          toggleAppearance={toggleAppearance}
          isAppearanceOpen={isAppearanceOpen}
        />
        <ProfileSettingsAccordion
          toggleProfileSettings={toggleProfileSettings}
          isProfileSettingsOpen={isProfileSettingsOpen}
          handleLogout={handleLogout}
          user={user}
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
