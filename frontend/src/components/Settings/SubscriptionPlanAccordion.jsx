import React, { useEffect, useState } from 'react';
import { Accordion, Button, Card, Row, Col } from 'react-bootstrap';

const SubscriptionPlanAccordion = ({
  toggleSubscription,
  isSubscriptionOpen,
  handleCardClick,
  goToPayment,
  organization,
  subscription,
}) => {
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
      additionalFeatures: "none",
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
      additionalFeatures: "none",
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
      additionalFeatures: "none",
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
      additionalFeatures: "none",
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
      additionalFeatures: "dedicated infrastructure, security management, etc.",
    },
  ];

  const currentSubscriptionEnd = subscription?.end ? new Date(subscription.end) : null;
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedCurSubEnd = currentSubscriptionEnd ? currentSubscriptionEnd.toLocaleDateString('en-US', dateOptions) : 'N/A';
  const [nextSubLevel, setNextSubLevel] = useState(null);

  useEffect(() => {
    const fetchNextSubLevel = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscription/${organization.nextSubscription}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to read subscription data');
        }

        const responseData = await response.json();
        setNextSubLevel(responseData.level);
      } catch (error) {
        console.error('Failed to read subscription data:', error.message);
      }
    };

    if (organization.nextSubscription) {
      fetchNextSubLevel();
    }
  }, [organization.nextSubscription]);

  return (
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
        {organization?.nextSubscription && (
          <div>
            Your current subscription runs out on {formattedCurSubEnd}. Your following subscription plan is {nextSubLevel}. 
          </div>
        )}
        {isSubscriptionOpen && (
          <div className="content">
            <div className="subscription-cards d-flex">
              {subscriptionPlans.map((plan, index) => (
                <Card
                  key={index}
                  className={`card mx-2 ${plan.name === subscription?.level ? 'highlighted-card' : ''}`}
                  onClick={() => handleCardClick(plan)}
                >
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
  );
};

export default SubscriptionPlanAccordion;
