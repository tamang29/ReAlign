import React from 'react';
import { Multiline } from '../../../utils/svg/multiline';
export const FlowchartComponent = ({ element, children }) => (React.createElement("g", null,
    children,
    React.createElement(Multiline, { x: element.bounds.width / 2, y: element.bounds.height / 2, width: element.bounds.width, height: element.bounds.height, fontWeight: "bold", fill: element.textColor, lineHeight: 16, capHeight: 11 }, element.name)));
//# sourceMappingURL=flowchart-component.js.map