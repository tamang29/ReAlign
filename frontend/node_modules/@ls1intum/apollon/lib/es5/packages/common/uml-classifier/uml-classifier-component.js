"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLClassifierComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var text_1 = require("../../../components/controls/text/text");
var themedComponents_1 = require("../../../components/theme/themedComponents");
var UMLClassifierComponent = function (_a) {
    var element = _a.element, children = _a.children, fillColor = _a.fillColor;
    return (react_1.default.createElement("g", null,
        react_1.default.createElement(themedComponents_1.ThemedRect, { fillColor: fillColor || element.fillColor, strokeColor: "none", width: "100%", height: element.stereotype ? 50 : 40 }),
        react_1.default.createElement(themedComponents_1.ThemedRect, { y: element.stereotype ? 50 : 40, width: "100%", height: element.bounds.height - (element.stereotype ? 50 : 40), strokeColor: "none" }),
        element.stereotype ? (react_1.default.createElement("svg", { height: 50 },
            react_1.default.createElement(text_1.Text, { fill: element.textColor },
                react_1.default.createElement("tspan", { x: "50%", dy: -8, textAnchor: "middle", fontSize: "85%" }, "\u00AB".concat(element.stereotype, "\u00BB")),
                react_1.default.createElement("tspan", { x: "50%", dy: 18, textAnchor: "middle", fontStyle: element.italic ? 'italic' : undefined, textDecoration: element.underline ? 'underline' : undefined }, element.name)))) : (react_1.default.createElement("svg", { height: 40 },
            react_1.default.createElement(text_1.Text, { fill: element.textColor, fontStyle: element.italic ? 'italic' : undefined, textDecoration: element.underline ? 'underline' : undefined }, element.name))),
        children,
        react_1.default.createElement(themedComponents_1.ThemedRect, { width: "100%", height: "100%", strokeColor: element.strokeColor, fillColor: "none", "pointer-events": "none" }),
        element.hasAttributes && (react_1.default.createElement(themedComponents_1.ThemedPath, { d: "M 0 ".concat(element.headerHeight, " H ").concat(element.bounds.width), strokeColor: element.strokeColor })),
        element.hasMethods && (react_1.default.createElement(themedComponents_1.ThemedPath, { d: "M 0 ".concat(element.deviderPosition, " H ").concat(element.bounds.width), strokeColor: element.strokeColor }))));
};
exports.UMLClassifierComponent = UMLClassifierComponent;
//# sourceMappingURL=uml-classifier-component.js.map