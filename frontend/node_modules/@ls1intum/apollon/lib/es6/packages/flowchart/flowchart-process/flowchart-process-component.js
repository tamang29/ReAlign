import React from 'react';
import { FlowchartComponent } from '../flowchart-element/flowchart-component';
import { ThemedRect } from '../../../components/theme/themedComponents';
export const FlowchartProcessComponent = ({ element, fillColor }) => (React.createElement(FlowchartComponent, { element: element },
    React.createElement(ThemedRect, { width: "100%", height: "100%", strokeColor: element.strokeColor, fillColor: fillColor || element.fillColor })));
//# sourceMappingURL=flowchart-process-component.js.map