import React from 'react';
import { enhance, FlowchartUpdateComponent } from '../flowchart-element/flowchart-update';
export const FlowchartTerminalUpdateComponent = (props) => {
    return React.createElement(FlowchartUpdateComponent, { ...props });
};
export const FlowchartTerminalUpdate = enhance(FlowchartTerminalUpdateComponent);
//# sourceMappingURL=flowchart-terminal-update.js.map