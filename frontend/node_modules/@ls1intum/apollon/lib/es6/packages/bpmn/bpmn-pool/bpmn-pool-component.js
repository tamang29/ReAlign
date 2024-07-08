import React from 'react';
import { BPMNPool } from './bpmn-pool';
import { ThemedRect } from '../../../components/theme/themedComponents';
import { Multiline } from '../../../utils/svg/multiline';
export const BPMNPoolComponent = ({ element, fillColor, strokeColor, textColor, children, }) => {
    return (React.createElement("g", null,
        React.createElement(ThemedRect, { y: 0, width: BPMNPool.HEADER_WIDTH, height: element.bounds.height, strokeColor: strokeColor || element.strokeColor, fillColor: fillColor || element.fillColor }),
        React.createElement(ThemedRect, { y: 0, x: BPMNPool.HEADER_WIDTH, width: element.bounds.width - BPMNPool.HEADER_WIDTH, height: element.bounds.height, strokeColor: strokeColor || element.strokeColor, fillColor: fillColor || element.fillColor }),
        React.createElement(Multiline, { y: 20, x: -(element.bounds.height / 2), textAnchor: "middle", alignmentBaseline: "middle", transform: "rotate(270)", fontWeight: "bold", pointerEvents: "none", fill: textColor || element.textColor }, element.name),
        children));
};
//# sourceMappingURL=bpmn-pool-component.js.map