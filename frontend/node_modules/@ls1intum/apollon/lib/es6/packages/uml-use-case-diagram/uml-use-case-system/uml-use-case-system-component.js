import React from 'react';
import { Text } from '../../../components/controls/text/text';
import { ThemedRect } from '../../../components/theme/themedComponents';
export const UMLUseCaseSystemComponent = ({ element, children, fillColor }) => (React.createElement("g", null,
    React.createElement(ThemedRect, { width: "100%", height: "100%", fillColor: fillColor || element.fillColor, strokeColor: element.strokeColor }),
    React.createElement(Text, { fill: element.textColor, y: 16 }, element.name),
    children));
//# sourceMappingURL=uml-use-case-system-component.js.map