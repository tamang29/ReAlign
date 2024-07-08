import React from 'react';
import { ThemedRect } from '../../../components/theme/themedComponents';
import { Multiline } from '../../../utils/svg/multiline';
export const BPMNCallActivityComponent = ({ element, fillColor, strokeColor, textColor }) => (React.createElement("g", null,
    React.createElement(ThemedRect, { rx: 10, ry: 10, width: element.bounds.width, height: element.bounds.height, strokeColor: strokeColor || element.strokeColor, strokeWidth: 3, fillColor: fillColor || element.fillColor }),
    React.createElement(Multiline, { x: element.bounds.width / 2, y: element.bounds.height / 2, width: element.bounds.width, height: element.bounds.height, fontWeight: "bold", fill: textColor || element.textColor, lineHeight: 16, capHeight: 11 }, element.name)));
//# sourceMappingURL=bpmn-call-activity-component.js.map