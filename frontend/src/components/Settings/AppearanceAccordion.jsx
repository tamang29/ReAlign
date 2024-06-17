import React from 'react';
import { Accordion } from 'react-bootstrap';

const AppearanceAccordion = ({ toggleAppearance, isAppearanceOpen }) => {
  return (
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
  );
};

export default AppearanceAccordion;
