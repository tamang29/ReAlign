import React from 'react';
import { Text } from '../../../components/controls/text/text';
import { ThemedCircle, ThemedLine } from '../../../components/theme/themedComponents';
import { computeDimension } from '../../../utils/geometry/boundary';
export const UMLUseCaseActorComponent = ({ element, fillColor }) => (React.createElement("g", null,
    React.createElement("rect", { width: "100%", height: "100%", fill: "none" }),
    React.createElement("g", { stroke: element.strokeColor || 'black', strokeWidth: 2 },
        React.createElement(ThemedCircle, { cx: computeDimension(1.0, 40, true), cy: computeDimension(1.0, 25, true), r: computeDimension(1.0, 15, true), fillColor: fillColor || element.fillColor, strokeColor: element.fillColor }),
        React.createElement(ThemedLine, { x1: computeDimension(1.0, 40), y1: computeDimension(1.0, 40), x2: computeDimension(1.0, 40), y2: computeDimension(1.0, 75), strokeColor: element.fillColor }),
        React.createElement(ThemedLine, { x1: computeDimension(1.0, 10), y1: 50, x2: computeDimension(1.0, 65), y2: 50, strokeColor: element.fillColor }),
        React.createElement(ThemedLine, { x1: computeDimension(1.0, 40), y1: computeDimension(1.0, 75), x2: computeDimension(1.0, 10), y2: computeDimension(1.0, 110), strokeColor: element.fillColor }),
        React.createElement(ThemedLine, { x1: computeDimension(1.0, 40), y1: computeDimension(1.0, 75), x2: computeDimension(1.0, 65), y2: computeDimension(1.0, 110), strokeColor: element.fillColor })),
    React.createElement(Text, { fill: element.textColor, x: computeDimension(1.0, 40), y: computeDimension(1.0, 130) }, element.name)));
//# sourceMappingURL=uml-use-case-actor-component.js.map