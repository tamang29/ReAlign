import React from 'react';
import { enhance, FlowchartUpdateComponent } from '../flowchart-element/flowchart-update';
export const FlowchartInputOutputUpdateComponent = (props) => {
    return React.createElement(FlowchartUpdateComponent, { ...props });
};
export const FlowchartInputOutputUpdate = enhance(FlowchartInputOutputUpdateComponent);
//# sourceMappingURL=flowchart-input-output-update.js.map