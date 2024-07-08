"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLUseCaseSystemComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var text_1 = require("../../../components/controls/text/text");
var themedComponents_1 = require("../../../components/theme/themedComponents");
var UMLUseCaseSystemComponent = function (_a) {
    var element = _a.element, children = _a.children, fillColor = _a.fillColor;
    return (react_1.default.createElement("g", null,
        react_1.default.createElement(themedComponents_1.ThemedRect, { width: "100%", height: "100%", fillColor: fillColor || element.fillColor, strokeColor: element.strokeColor }),
        react_1.default.createElement(text_1.Text, { fill: element.textColor, y: 16 }, element.name),
        children));
};
exports.UMLUseCaseSystemComponent = UMLUseCaseSystemComponent;
//# sourceMappingURL=uml-use-case-system-component.js.map