"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLUseCaseComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var text_1 = require("../../../components/controls/text/text");
var themedComponents_1 = require("../../../components/theme/themedComponents");
var UMLUseCaseComponent = function (_a) {
    var element = _a.element, fillColor = _a.fillColor;
    return (react_1.default.createElement("g", null,
        react_1.default.createElement(themedComponents_1.ThemedEllipse, { cx: "50%", cy: "50%", rx: "50%", ry: "50%", strokeColor: element.strokeColor, fillColor: fillColor || element.fillColor }),
        react_1.default.createElement(text_1.Text, { fill: element.textColor }, element.name)));
};
exports.UMLUseCaseComponent = UMLUseCaseComponent;
//# sourceMappingURL=uml-use-case-component.js.map