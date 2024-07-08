import React from 'react';
import { ThemedPolyline, ThemedRect } from '../../../components/theme/themedComponents';
import { Multiline } from '../../../utils/svg/multiline';
export const BPMNSubprocessComponent = ({ element, fillColor, strokeColor, textColor }) => (React.createElement("g", null,
    React.createElement(ThemedRect, { rx: 10, ry: 10, width: "100%", height: "100%", fillColor: fillColor || element.fillColor, strokeColor: strokeColor || element.strokeColor }),
    React.createElement(ThemedRect, { x: element.bounds.width / 2 - 7, y: element.bounds.height - 14, width: 14, height: 14, fillColor: "transparent", strokeColor: element.strokeColor }),
    React.createElement(ThemedPolyline, { points: `${element.bounds.width / 2 - 4} ${element.bounds.height - 7}, ${element.bounds.width / 2 + 4} ${element.bounds.height - 7}`, strokeColor: strokeColor || element.strokeColor, strokeLinejoin: "round", strokeLinecap: "round" }),
    React.createElement(ThemedPolyline, { points: `${element.bounds.width / 2} ${element.bounds.height - 11}, ${element.bounds.width / 2} ${element.bounds.height - 3}`, strokeColor: strokeColor || element.strokeColor, strokeLinejoin: "round", strokeLinecap: "round" }),
    React.createElement(Multiline, { x: element.bounds.width / 2, y: element.bounds.height / 2, width: element.bounds.width, height: element.bounds.height, fontWeight: "bold", fill: textColor || element.textColor, lineHeight: 16, capHeight: 11 }, element.name)));
//# sourceMappingURL=bpmn-subprocess-component.js.map