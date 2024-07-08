import React from 'react';
import { Text } from '../../../components/controls/text/text';
import { Point } from '../../../utils/geometry/point';
import { ThemedPath } from '../../../components/theme/themedComponents';
const Arrow = ({ id, color, d }) => (React.createElement("g", null,
    React.createElement("marker", { id: `marker-${id}`, viewBox: "0 0 30 30", markerWidth: "22", markerHeight: "30", refX: "30", refY: "15", orient: "auto", markerUnits: "strokeWidth" },
        React.createElement(ThemedPath, { d: "M0,29 L30,15 L0,1", fillColor: "none", strokeColor: color })),
    React.createElement(ThemedPath, { d: d, strokeColor: color, strokeDasharray: 7, markerEnd: `url(#marker-${id})` })));
export const UMLUseCaseIncludeComponent = ({ element }) => {
    const [start, end] = element.path.map((p) => new Point(p.x, p.y));
    const line = end.subtract(start);
    if (line.length <= 100) {
        return React.createElement(Arrow, { id: element.id, color: element.strokeColor, d: `M ${start.x} ${start.y} L ${end.x} ${end.y}` });
    }
    const norm = line.normalize();
    const center = start.add(norm.scale(0.5 * line.length));
    const startSection = start.add(norm.scale(0.5 * line.length - 40));
    const endSection = end.subtract(norm.scale(0.5 * line.length - 40));
    return (React.createElement("g", null,
        React.createElement(Arrow, { id: element.id, color: element.strokeColor, d: `
          M ${start.x} ${start.y} L ${startSection.x} ${startSection.y}
          M ${endSection.x} ${endSection.y} L ${end.x} ${end.y}
        ` }),
        React.createElement("path", { id: `textpath-${element.id}`, d: `
          M ${startSection.x} ${startSection.y}
          L ${endSection.x} ${endSection.y}
        ` }),
        React.createElement(Text, { noX: true, noY: true, fill: element.textColor, transform: norm.x < 0
                ? `
              translate(${center.x}, ${center.y})
              rotate(180)
              translate(${-center.x}, ${-center.y})
            `
                : undefined },
            React.createElement("textPath", { xlinkHref: `#textpath-${element.id}`, startOffset: "50%" }, "\u00ABinclude\u00BB"))));
};
//# sourceMappingURL=uml-use-case-include-component.js.map