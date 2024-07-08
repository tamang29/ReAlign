import React from 'react';
import { Text } from '../../../components/controls/text/text';
import { ThemedRect } from '../../../components/theme/themedComponents';
export const UMLActivityComponent = ({ element, children, fillColor }) => (React.createElement("g", null,
    React.createElement(ThemedRect, { rx: 10, ry: 10, width: "100%", height: "100%", strokeColor: element.strokeColor, fillColor: fillColor || element.fillColor }),
    React.createElement(Text, { y: 20, fill: element.textColor }, element.name),
    children));
//# sourceMappingURL=uml-activity-component.js.map