import React from 'react';
import { Text } from '../../../components/controls/text/text';
import { ThemedEllipse } from '../../../components/theme/themedComponents';
export const UMLUseCaseComponent = ({ element, fillColor }) => (React.createElement("g", null,
    React.createElement(ThemedEllipse, { cx: "50%", cy: "50%", rx: "50%", ry: "50%", strokeColor: element.strokeColor, fillColor: fillColor || element.fillColor }),
    React.createElement(Text, { fill: element.textColor }, element.name)));
//# sourceMappingURL=uml-use-case-component.js.map