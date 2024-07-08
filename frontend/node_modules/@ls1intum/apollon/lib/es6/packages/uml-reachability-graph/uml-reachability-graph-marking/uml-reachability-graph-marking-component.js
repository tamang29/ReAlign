import React from 'react';
import { Multiline } from '../../../utils/svg/multiline';
import { ThemedPath, ThemedPolyline, ThemedRect } from '../../../components/theme/themedComponents';
export const UMLReachabilityGraphMarkingComponent = ({ element, fillColor }) => (React.createElement("g", null,
    React.createElement(ThemedRect, { rx: 10, ry: 10, width: "100%", height: "100%", strokeColor: element.strokeColor, fillColor: fillColor || element.fillColor }),
    React.createElement(Multiline, { x: element.bounds.width / 2, y: element.bounds.height / 2, width: element.bounds.width, height: element.bounds.height, fontWeight: "bold", fill: element.textColor, lineHeight: 16, capHeight: 11 }, element.name),
    element.isInitialMarking && (React.createElement("g", null,
        React.createElement("marker", { id: `marker-${element.id}`, viewBox: `0 0 ${30} ${30}`, markerWidth: 22, markerHeight: 30, refX: 30, refY: 15, orient: "auto", markerUnits: "strokeWidth" },
            React.createElement(ThemedPath, { d: `M0,${29} L${30},${15} L0,${1}`, fillColor: "none", strokeColor: element.strokeColor })),
        React.createElement(ThemedPolyline, { points: `-${50},-${50} ${3},${3}`, strokeColor: element.strokeColor, fillColor: "none", strokeWidth: 1, markerEnd: `url(#marker-${element.id})` })))));
//# sourceMappingURL=uml-reachability-graph-marking-component.js.map