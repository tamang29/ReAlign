"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLClassPackageComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var themedComponents_1 = require("../../../components/theme/themedComponents");
var UMLClassPackageComponent = function (_a) {
    var element = _a.element, children = _a.children, fillColor = _a.fillColor;
    return (react_1.default.createElement("g", null,
        react_1.default.createElement(themedComponents_1.ThemedPath, { d: "M 0 10 V 0 H 40 V 10", strokeColor: element.strokeColor, fillColor: fillColor || element.fillColor }),
        react_1.default.createElement(themedComponents_1.ThemedRect, { y: 10, width: "100%", height: element.bounds.height - 10, strokeColor: element.strokeColor, fillColor: fillColor || element.fillColor }),
        react_1.default.createElement("text", { x: "50%", y: 20, dy: 10, textAnchor: "middle", fontWeight: "bold", pointerEvents: "none", style: element.textColor ? { fill: element.textColor } : {} }, element.name),
        children));
};
exports.UMLClassPackageComponent = UMLClassPackageComponent;
//# sourceMappingURL=uml-class-package-component.js.map