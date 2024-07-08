"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLDeploymentArtifactComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var text_1 = require("../../../components/controls/text/text");
var themedComponents_1 = require("../../../components/theme/themedComponents");
var UMLDeploymentArtifactComponent = function (_a) {
    var element = _a.element, fillColor = _a.fillColor;
    return (react_1.default.createElement("g", null,
        react_1.default.createElement(themedComponents_1.ThemedRect, { width: "100%", height: "100%", strokeColor: element.strokeColor, fillColor: fillColor || element.fillColor }),
        react_1.default.createElement(text_1.Text, { y: 28, dominantBaseline: "auto", fill: element.textColor }, element.name),
        react_1.default.createElement("g", { transform: "translate(".concat(element.bounds.width - 26, ", ").concat(7, ")") },
            react_1.default.createElement(themedComponents_1.ThemedPath, { d: "M 0 0 L 13 0 L 19.2 7.25 L 19.2 24 L 0 24 L 0 0 Z", fillColor: fillColor || element.fillColor, strokeColor: element.strokeColor, strokeWidth: "1.2", strokeMiterlimit: "10" }),
            react_1.default.createElement(themedComponents_1.ThemedPath, { d: "M 13 0 L 13 7.25 L 19.2 7.25", fillColor: "none", strokeColor: element.strokeColor, strokeWidth: "1.2", strokeMiterlimit: "10" }))));
};
exports.UMLDeploymentArtifactComponent = UMLDeploymentArtifactComponent;
//# sourceMappingURL=uml-deployment-artifact-component.js.map