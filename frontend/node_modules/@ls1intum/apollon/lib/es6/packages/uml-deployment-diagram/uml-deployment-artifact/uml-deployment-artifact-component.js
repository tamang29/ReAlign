import React from 'react';
import { Text } from '../../../components/controls/text/text';
import { ThemedPath, ThemedRect } from '../../../components/theme/themedComponents';
export const UMLDeploymentArtifactComponent = ({ element, fillColor }) => (React.createElement("g", null,
    React.createElement(ThemedRect, { width: "100%", height: "100%", strokeColor: element.strokeColor, fillColor: fillColor || element.fillColor }),
    React.createElement(Text, { y: 28, dominantBaseline: "auto", fill: element.textColor }, element.name),
    React.createElement("g", { transform: `translate(${element.bounds.width - 26}, ${7})` },
        React.createElement(ThemedPath, { d: "M 0 0 L 13 0 L 19.2 7.25 L 19.2 24 L 0 24 L 0 0 Z", fillColor: fillColor || element.fillColor, strokeColor: element.strokeColor, strokeWidth: "1.2", strokeMiterlimit: "10" }),
        React.createElement(ThemedPath, { d: "M 13 0 L 13 7.25 L 19.2 7.25", fillColor: "none", strokeColor: element.strokeColor, strokeWidth: "1.2", strokeMiterlimit: "10" }))));
//# sourceMappingURL=uml-deployment-artifact-component.js.map