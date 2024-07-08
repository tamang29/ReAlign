import React from 'react';
import { enhance, FlowchartUpdateComponent } from '../flowchart-element/flowchart-update';
export const FlowchartProcessUpdateComponent = (props) => {
    return React.createElement(FlowchartUpdateComponent, { ...props });
};
export const FlowchartProcessUpdate = enhance(FlowchartProcessUpdateComponent);
//# sourceMappingURL=flowchart-process-update.js.map