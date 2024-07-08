import React from 'react';
import { Text } from '../../../components/controls/text/text';
import { Point } from '../../../utils/geometry/point';
import { UMLPetriNetArc } from './uml-petri-net-arc';
import { ThemedPathContrast, ThemedPolyline } from '../../../components/theme/themedComponents';
export const UMLPetriNetArcComponent = ({ element }) => {
    const [start, end] = element.path.map((p) => new Point(p.x, p.y));
    const line = end.subtract(start);
    const norm = line.normalize();
    const center = start.add(norm.scale(0.5 * line.length));
    const displayMultiplicity = element.name !== UMLPetriNetArc.defaultMultiplicity;
    return (React.createElement("g", null,
        React.createElement("marker", { id: `marker-${element.id}`, viewBox: "0 0 30 30", markerWidth: "22", markerHeight: "30", refX: "30", refY: "15", orient: "auto", markerUnits: "strokeWidth" },
            React.createElement(ThemedPathContrast, { d: "M0,1 L0,29 L30,15 z", fill: element.strokeColor })),
        React.createElement("path", { id: `textpath-${element.id}`, d: `
        M ${start.x} ${start.y - 10}
        L ${end.x} ${end.y - 10}
    ` }),
        displayMultiplicity && (React.createElement(Text, { dy: "20px", noX: true, noY: true, fill: element.textColor, transform: norm.x < 0
                ? `
            translate(${center.x}, ${center.y})
            rotate(180)
            translate(${-center.x}, ${-center.y})
          `
                : undefined },
            React.createElement("textPath", { xlinkHref: `#textpath-${element.id}`, startOffset: "50%" }, element.name))),
        React.createElement(ThemedPolyline, { points: element.path.map((point) => `${point.x} ${point.y}`).join(','), strokeColor: element.strokeColor, fillColor: "none", strokeWidth: 1, markerEnd: `url(#marker-${element.id})` })));
};
//# sourceMappingURL=uml-petri-net-arc-component.js.map