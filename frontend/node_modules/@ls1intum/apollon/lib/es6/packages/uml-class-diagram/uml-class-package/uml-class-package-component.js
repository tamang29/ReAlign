import React from 'react';
import { ThemedPath, ThemedRect } from '../../../components/theme/themedComponents';
export const UMLClassPackageComponent = ({ element, children, fillColor }) => (React.createElement("g", null,
    React.createElement(ThemedPath, { d: `M 0 10 V 0 H 40 V 10`, strokeColor: element.strokeColor, fillColor: fillColor || element.fillColor }),
    React.createElement(ThemedRect, { y: 10, width: "100%", height: element.bounds.height - 10, strokeColor: element.strokeColor, fillColor: fillColor || element.fillColor }),
    React.createElement("text", { x: "50%", y: 20, dy: 10, textAnchor: "middle", fontWeight: "bold", pointerEvents: "none", style: element.textColor ? { fill: element.textColor } : {} }, element.name),
    children));
//# sourceMappingURL=uml-class-package-component.js.map