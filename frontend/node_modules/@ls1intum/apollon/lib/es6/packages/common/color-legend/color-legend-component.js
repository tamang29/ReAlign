import React from 'react';
import { Multiline } from '../../../utils/svg/multiline';
import { ThemedPath } from '../../../components/theme/themedComponents';
export const ColorLegendComponent = ({ element, fillColor }) => (React.createElement("g", null,
    React.createElement(ThemedPath, { d: `M 0 0 L ${element.bounds.width - 15} 0 L ${element.bounds.width} 15 L ${element.bounds.width} ${element.bounds.height} L 0 ${element.bounds.height} L 0 0 Z`, fillColor: fillColor || element.fillColor, strokeColor: element.strokeColor, strokeWidth: "1.2", strokeMiterlimit: "10" }),
    React.createElement(ThemedPath, { d: `M ${element.bounds.width - 15} 0 L ${element.bounds.width - 15} 15 L ${element.bounds.width} 15`, fillColor: "none", strokeColor: element.strokeColor, strokeWidth: "1.2", strokeMiterlimit: "10" }),
    React.createElement(Multiline, { x: element.bounds.width / 2, y: element.bounds.height / 2, width: element.bounds.width, height: element.bounds.height, fontWeight: "bold", fill: element.textColor }, element.name)));
//# sourceMappingURL=color-legend-component.js.map