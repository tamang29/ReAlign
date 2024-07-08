import React from 'react';
import { FlowchartComponent } from '../flowchart-element/flowchart-component';
import { ThemedPolyline } from '../../../components/theme/themedComponents';
export const FlowchartDecisionComponent = ({ element, fillColor }) => (React.createElement(FlowchartComponent, { element: element },
    React.createElement(ThemedPolyline, { points: `${element.bounds.width / 2} 0, ${element.bounds.width} ${element.bounds.height / 2}, ${element.bounds.width / 2} ${element.bounds.height}, 0 ${element.bounds.height / 2}, ${element.bounds.width / 2} 0`, strokeColor: element.strokeColor, fillColor: fillColor || element.fillColor })));
//# sourceMappingURL=flowchart-decision-component.js.map