import React from 'react';
import { FlowchartComponent } from '../flowchart-element/flowchart-component';
import { ThemedRect } from '../../../components/theme/themedComponents';
export const FlowchartTerminalComponent = ({ element, fillColor }) => (React.createElement(FlowchartComponent, { element: element },
    React.createElement(ThemedRect, { fillColor: fillColor || element.fillColor, rx: 10, ry: 10, width: "100%", height: "100%", strokeColor: element.strokeColor })));
//# sourceMappingURL=flowchart-terminal-component.js.map