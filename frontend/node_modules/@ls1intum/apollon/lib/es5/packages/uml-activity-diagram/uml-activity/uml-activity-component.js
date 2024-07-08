"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLActivityComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var text_1 = require("../../../components/controls/text/text");
var themedComponents_1 = require("../../../components/theme/themedComponents");
var UMLActivityComponent = function (_a) {
    var element = _a.element, children = _a.children, fillColor = _a.fillColor;
    return (react_1.default.createElement("g", null,
        react_1.default.createElement(themedComponents_1.ThemedRect, { rx: 10, ry: 10, width: "100%", height: "100%", strokeColor: element.strokeColor, fillColor: fillColor || element.fillColor }),
        react_1.default.createElement(text_1.Text, { y: 20, fill: element.textColor }, element.name),
        children));
};
exports.UMLActivityComponent = UMLActivityComponent;
//# sourceMappingURL=uml-activity-component.js.map