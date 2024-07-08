import React from 'react';
import { FlowchartComponent } from '../flowchart-element/flowchart-component';
import { ThemedPolyline } from '../../../components/theme/themedComponents';
import { computeDimension } from '../../../utils/geometry/boundary';
export const FlowchartInputOutputComponent = ({ element, fillColor }) => {
    return (React.createElement(FlowchartComponent, { element: element },
        React.createElement(ThemedPolyline, { points: `${computeDimension(1.1, element.bounds.width)} 0, ${computeDimension(0.9, element.bounds.width)} ${element.bounds.height}, ${computeDimension(-0.1, element.bounds.width)} ${element.bounds.height}, ${computeDimension(0.1, element.bounds.width)} 0, ${computeDimension(1.1, element.bounds.width)} 0`, strokeColor: element.strokeColor, fillColor: fillColor || element.fillColor })));
};
//# sourceMappingURL=flowchart-input-output-component.js.map