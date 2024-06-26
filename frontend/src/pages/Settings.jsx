import { useState, useEffect, useContext } from 'react'; 
import { Container, Accordion } from "react-bootstrap";
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
import CustomReactFlow from "../components/FunctionalReq/CustomReactFlow"; // Correct import path

const Settings = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(location.state?.openSubscription);
  const [isActiveKey, setIsActiveKey] = useState(null);
  const [isAppearanceOpen, setIsAppearanceOpen] = useState(false);
  const [isProfileSettingsOpen, setIsProfileSettingsOpen] = useState(location.state?.openProfileSettings);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [user, organization, subscription] = useContext(UserContext);

  const elements = [
    { id: '1', type: 'input', data: { label: 'Input Node' }, position: { x: 250, y: 5 } },
    { id: '2', type: 'output', data: { label: 'Output Node' }, position: { x: 250, y: 200 } },
    { id: 'e1-2', source: '1', target: '2', animated: true }
  ];

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
    navigate('/login');
  };

  return (
    <Container fluid>
      <BreadCrumbRow />
      <Header title="Settings Page" />
      {/* <CustomReactFlow nodes={elements} edges={[]} />  */}
      <Accordion activeKey={isActiveKey}>
        {user && user.role === 'Admin' && (
          <SubscriptionPlanAccordion
            toggleSubscription={toggleSubscription}
            isSubscriptionOpen={isSubscriptionOpen}
            handleCardClick={handleCardClick}
            goToPayment={goToPayment}
            organization={organization['name']}
            subscription={subscription['level']}
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
