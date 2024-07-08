import React from 'react';
import { ThemedPolyline } from '../../../../components/theme/themedComponents';
import { Multiline } from '../../../../utils/svg/multiline';
export const BPMNParallelGatewayComponent = ({ element, fillColor }) => (React.createElement("g", null,
    React.createElement(ThemedPolyline, { points: `${element.bounds.width / 2} 0, ${element.bounds.width} ${element.bounds.height / 2}, ${element.bounds.width / 2} ${element.bounds.height}, 0 ${element.bounds.height / 2}, ${element.bounds.width / 2} 0`, strokeColor: element.strokeColor, fillColor: fillColor || element.fillColor }),
    React.createElement(ThemedPolyline, { points: `${element.bounds.width / 2} 10, ${element.bounds.width / 2} ${element.bounds.height - 10}`, strokeColor: element.strokeColor, fillColor: "transparent" }),
    React.createElement(ThemedPolyline, { points: `10 ${element.bounds.height / 2}, ${element.bounds.width - 10} ${element.bounds.height / 2}`, strokeColor: element.strokeColor, fillColor: "transparent" }),
    React.createElement(Multiline, { x: element.bounds.width / 2, y: element.bounds.height + 20, width: element.bounds.width * 2, height: element.bounds.height, fill: element.textColor, lineHeight: 16, capHeight: 11, verticalAnchor: "start" }, element.name)));
//# sourceMappingURL=bpmn-parallel-gateway-component.js.map