import React from 'react';
import { enhance, FlowchartUpdateComponent } from '../flowchart-element/flowchart-update';
export const FlowchartDecisionUpdateComponent = (props) => {
    return React.createElement(FlowchartUpdateComponent, { ...props });
};
export const FlowchartDecisionUpdate = enhance(FlowchartDecisionUpdateComponent);
//# sourceMappingURL=flowchart-decision-update.js.map