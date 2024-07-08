import React from 'react';
import { ThemedPolyline } from '../../../components/theme/themedComponents';
export const UMLInterfaceProvidedComponent = ({ element }) => (React.createElement("g", null,
    React.createElement(ThemedPolyline, { points: element.path.map((point) => `${point.x} ${point.y}`).join(','), strokeColor: element.strokeColor, fillColor: "none" })));
//# sourceMappingURL=uml-interface-provided-component.js.map