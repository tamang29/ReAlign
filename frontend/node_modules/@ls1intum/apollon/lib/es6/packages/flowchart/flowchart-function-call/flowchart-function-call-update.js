import React from 'react';
import { enhance, FlowchartUpdateComponent } from '../flowchart-element/flowchart-update';
export const FlowchartFunctionCallUpdateComponent = (props) => {
    return React.createElement(FlowchartUpdateComponent, { ...props });
};
export const FlowchartFunctionCallUpdate = enhance(FlowchartFunctionCallUpdateComponent);
//# sourceMappingURL=flowchart-function-call-update.js.map