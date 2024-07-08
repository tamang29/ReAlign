import React, { useState, useEffect, useContext } from 'react';
import { Container, Accordion, Col } from "react-bootstrap";
import Header from "../components/Dashboard/Header";
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Settings.css';
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
  const [isProfileSettingsOpen, setIsProfileSettingsOpen] = useState(location.state?.openProfileSettings);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [user, organization, subscription] = useContext(UserContext);

  useEffect(() => {
    if (isSubscriptionOpen) {
      setIsActiveKey("0");
    } else if (isAppearanceOpen) {
      setIsActiveKey("1");
    } else if (isProfileSettingsOpen) {
      setIsActiveKey("2");
    } else if (isSupportOpen) {
      setIsActiveKey("3");
    } else {
      setIsActiveKey(null);
    }
  }, [isSubscriptionOpen, isAppearanceOpen, isProfileSettingsOpen, isSupportOpen]);

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
    setIsSupportOpen(false);
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
    setIsSupportOpen(false);
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
    setIsSupportOpen(false);
  };

  const toggleSupport = () => {
    if (isSupportOpen) {
      setIsActiveKey(null);
    } else {
      setIsActiveKey("3");
    }
    setIsSupportOpen(!isSupportOpen);
    setIsSubscriptionOpen(false);
    setIsAppearanceOpen(false);
    setIsProfileSettingsOpen(false);
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
    navigate('/login');
  };

  return (
    <Container fluid>
      <BreadCrumbRow />
      <Header title="Settings Page" />
      <Accordion activeKey={isActiveKey}>
        {user && user.role === 'Admin' && (
          <SubscriptionPlanAccordion
            toggleSubscription={toggleSubscription}
            isSubscriptionOpen={isSubscriptionOpen}
            handleCardClick={handleCardClick}
            goToPayment={goToPayment}
            organization={organization}
            subscription={subscription}
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
        {/* Support Accordion Item */}
        <Accordion.Item eventKey="3" className="accordion-item" activeKey = {isActiveKey}>
          <Accordion.Header className="accordion-item-header" onClick={toggleSupport}>
            <Col xs={11}>
              <span className="settings-header">Support</span>
            </Col>
          </Accordion.Header>
          <Accordion.Body>
            <div className="content">
            <div className="support-content">
                We are there for you! Reach out to us via{' '}
                <a href="mailto:support@realign.com">support@realign.com</a>.
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <SubscriptionModal
        show={showModal}
        onHide={handleCloseModal}
        plan={selectedPlan}
        subscription={subscription}
        organization={organization}
      />
    </Container>
  );
};

export default Settings;
