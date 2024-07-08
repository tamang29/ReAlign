import React from 'react';
import { Text } from '../../../components/controls/text/text';
import { ThemedPath, ThemedRect } from '../../../components/theme/themedComponents';
export const UMLClassifierComponent = ({ element, children, fillColor }) => {
    return (React.createElement("g", null,
        React.createElement(ThemedRect, { fillColor: fillColor || element.fillColor, strokeColor: "none", width: "100%", height: element.stereotype ? 50 : 40 }),
        React.createElement(ThemedRect, { y: element.stereotype ? 50 : 40, width: "100%", height: element.bounds.height - (element.stereotype ? 50 : 40), strokeColor: "none" }),
        element.stereotype ? (React.createElement("svg", { height: 50 },
            React.createElement(Text, { fill: element.textColor },
                React.createElement("tspan", { x: "50%", dy: -8, textAnchor: "middle", fontSize: "85%" }, `«${element.stereotype}»`),
                React.createElement("tspan", { x: "50%", dy: 18, textAnchor: "middle", fontStyle: element.italic ? 'italic' : undefined, textDecoration: element.underline ? 'underline' : undefined }, element.name)))) : (React.createElement("svg", { height: 40 },
            React.createElement(Text, { fill: element.textColor, fontStyle: element.italic ? 'italic' : undefined, textDecoration: element.underline ? 'underline' : undefined }, element.name))),
        children,
        React.createElement(ThemedRect, { width: "100%", height: "100%", strokeColor: element.strokeColor, fillColor: "none", "pointer-events": "none" }),
        element.hasAttributes && (React.createElement(ThemedPath, { d: `M 0 ${element.headerHeight} H ${element.bounds.width}`, strokeColor: element.strokeColor })),
        element.hasMethods && (React.createElement(ThemedPath, { d: `M 0 ${element.deviderPosition} H ${element.bounds.width}`, strokeColor: element.strokeColor }))));
};
//# sourceMappingURL=uml-classifier-component.js.map