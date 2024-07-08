import React from 'react';
import { Multiline } from '../../../utils/svg/multiline';
import { ThemedRect } from '../../../components/theme/themedComponents';
export const UMLActivityObjectNodeComponent = ({ element, fillColor }) => (React.createElement("g", null,
    React.createElement(ThemedRect, { width: "100%", height: "100%", fillColor: fillColor || element.fillColor, strokeColor: element.strokeColor }),
    React.createElement(Multiline, { x: element.bounds.width / 2, y: element.bounds.height / 2, width: element.bounds.width, height: element.bounds.height, fontWeight: "bold", fill: element.textColor }, element.name)));
//# sourceMappingURL=uml-activity-object-node-component.js.map