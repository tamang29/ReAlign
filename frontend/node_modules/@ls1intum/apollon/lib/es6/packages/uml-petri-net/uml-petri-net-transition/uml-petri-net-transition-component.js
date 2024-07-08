import React from 'react';
import { Text } from '../../../components/controls/text/text';
import { ThemedRect } from '../../../components/theme/themedComponents';
export const UMLPetriNetTransitionComponent = ({ element, fillColor }) => (React.createElement("g", null,
    React.createElement(Text, { y: -15, fill: element.textColor }, element.name),
    React.createElement(ThemedRect, { width: element.bounds.width, height: element.bounds.height, strokeColor: element.strokeColor, fillColor: fillColor || element.fillColor, strokeWidth: 1, fillOpacity: 1 })));
//# sourceMappingURL=uml-petri-net-transition-component.js.map