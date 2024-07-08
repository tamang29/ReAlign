import React from 'react';
import { FlowchartComponent } from '../flowchart-element/flowchart-component';
import { ThemedRect } from '../../../components/theme/themedComponents';
export const FlowchartFunctionCallComponent = ({ element, fillColor }) => (React.createElement(FlowchartComponent, { element: element },
    React.createElement(ThemedRect, { fillColor: fillColor || element.fillColor, width: 10, height: "100%", strokeColor: element.strokeColor, x: "0" }),
    React.createElement(ThemedRect, { width: element.bounds.width - 20, height: "100%", strokeColor: element.strokeColor, x: 10, fillColor: fillColor || element.fillColor }),
    React.createElement(ThemedRect, { width: 10, height: "100%", strokeColor: element.strokeColor, x: element.bounds.width - 10, fillColor: fillColor || element.fillColor })));
//# sourceMappingURL=flowchart-function-call-component.js.map