import React from 'react';
import { Multiline } from '../../../utils/svg/multiline';
import { ThemedPolyline } from '../../../components/theme/themedComponents';
export const UMLActivityMergeNodeComponent = ({ element, fillColor }) => (React.createElement("g", null,
    React.createElement(ThemedPolyline, { points: `${element.bounds.width / 2} 0, ${element.bounds.width} ${element.bounds.height / 2}, ${element.bounds.width / 2} ${element.bounds.height}, 0 ${element.bounds.height / 2}, ${element.bounds.width / 2} 0`, strokeColor: element.strokeColor, fillColor: fillColor || element.fillColor }),
    React.createElement(Multiline, { x: element.bounds.width / 2, y: element.bounds.height / 2, width: element.bounds.width, height: element.bounds.height, fontWeight: "bold", fill: element.textColor }, element.name)));
//# sourceMappingURL=uml-activity-merge-node-component.js.map