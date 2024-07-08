import React from 'react';
import { ThemedRect } from '../../../components/theme/themedComponents';
import { Multiline } from '../../../utils/svg/multiline';
export const BPMNTransactionComponent = ({ element, fillColor, strokeColor, textColor }) => (React.createElement("g", null,
    React.createElement(ThemedRect, { rx: 10, ry: 10, width: element.bounds.width, height: element.bounds.height, fillColor: fillColor || element.fillColor, strokeColor: strokeColor || element.strokeColor }),
    React.createElement(ThemedRect, { rx: 7, ry: 7, x: 3, y: 3, width: element.bounds.width - 6, height: element.bounds.height - 6, fillColor: fillColor || element.fillColor, strokeColor: strokeColor || element.strokeColor }),
    React.createElement(Multiline, { x: element.bounds.width / 2, y: element.bounds.height / 2, width: element.bounds.width, height: element.bounds.height, fontWeight: "bold", fill: textColor || element.textColor, lineHeight: 16, capHeight: 11 }, element.name)));
//# sourceMappingURL=bpmn-transaction-component.js.map