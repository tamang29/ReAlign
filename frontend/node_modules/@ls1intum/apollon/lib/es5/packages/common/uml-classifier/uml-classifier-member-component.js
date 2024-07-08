"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLClassifierMemberComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var text_1 = require("../../../components/controls/text/text");
var themedComponents_1 = require("../../../components/theme/themedComponents");
var UMLClassifierMemberComponent = function (_a) {
    var element = _a.element, fillColor = _a.fillColor;
    return (react_1.default.createElement("g", null,
        react_1.default.createElement(themedComponents_1.ThemedRect, { fillColor: fillColor || element.fillColor, strokeColor: "none", width: "100%", height: "100%" }),
        react_1.default.createElement(text_1.Text, { x: 10, fill: element.textColor, fontWeight: "normal", textAnchor: "start" }, element.name)));
};
exports.UMLClassifierMemberComponent = UMLClassifierMemberComponent;
//# sourceMappingURL=uml-classifier-member-component.js.map