import React from 'react';
import { ThemedRect } from '../../../components/theme/themedComponents';
import { Multiline } from '../../../utils/svg/multiline';
export const BPMNSwimlaneComponent = ({ element, fillColor, textColor, children }) => {
    return (React.createElement("g", null,
        React.createElement(ThemedRect, { width: element.bounds.width, height: element.bounds.height, fillColor: fillColor || element.fillColor }),
        React.createElement(Multiline, { y: 20, x: -(element.bounds.height / 2), transform: "rotate(270)", textAnchor: "middle", alignmentBaseline: "middle", pointerEvents: "none", fill: textColor || element.textColor }, element.name),
        children));
};
//# sourceMappingURL=bpmn-swimlane-component.js.map