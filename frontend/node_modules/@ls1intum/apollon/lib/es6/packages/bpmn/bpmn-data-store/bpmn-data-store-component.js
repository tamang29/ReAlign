import React from 'react';
import { ThemedPath } from '../../../components/theme/themedComponents';
import { Multiline } from '../../../utils/svg/multiline';
export const BPMNDataStoreComponent = ({ element, fillColor, strokeColor, textColor }) => (React.createElement("g", null,
    React.createElement(ThemedPath, { d: `M 0 10 L 0 ${element.bounds.height - 10} A ${element.bounds.width / 2} 10 0 0 0 ${element.bounds.width} ${element.bounds.height - 10} L ${element.bounds.width} 10 A ${element.bounds.width / 2} 10 180 0 0 0 10`, strokeColor: strokeColor || element.strokeColor, fillColor: fillColor || element.fillColor }),
    React.createElement(ThemedPath, { d: `M 0 30 A ${element.bounds.width / 2} 10 0 0 0 ${element.bounds.width} 30`, strokeColor: strokeColor || element.strokeColor, fillColor: "transparent" }),
    React.createElement(ThemedPath, { d: `M 0 20 A ${element.bounds.width / 2} 10 0 0 0 ${element.bounds.width} 20`, strokeColor: strokeColor || element.strokeColor, fillColor: "transparent" }),
    React.createElement(ThemedPath, { d: `M 0 10 A ${element.bounds.width / 2} 10 0 0 0 ${element.bounds.width} 10`, strokeColor: strokeColor || element.strokeColor, fillColor: "transparent" }),
    React.createElement(Multiline, { x: element.bounds.width / 2, y: element.bounds.height + 20, width: element.bounds.width * 2, fill: textColor || element.textColor, lineHeight: 16, capHeight: 11, verticalAnchor: "start" }, element.name)));
//# sourceMappingURL=bpmn-data-store-component.js.map