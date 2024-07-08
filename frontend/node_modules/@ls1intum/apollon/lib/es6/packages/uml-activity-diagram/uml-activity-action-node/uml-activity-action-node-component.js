import React from 'react';
import { Multiline } from '../../../utils/svg/multiline';
import { ThemedRect } from '../../../components/theme/themedComponents';
export const UMLActivityActionNodeComponent = ({ element, fillColor }) => (React.createElement("g", null,
    React.createElement(ThemedRect, { rx: 10, ry: 10, width: "100%", height: "100%", strokeColor: element.strokeColor, fillColor: fillColor || element.fillColor }),
    React.createElement(Multiline, { x: element.bounds.width / 2, y: element.bounds.height / 2, width: element.bounds.width, height: element.bounds.height, fontWeight: "bold", fill: element.textColor }, element.name)));
//# sourceMappingURL=uml-activity-action-node-component.js.map