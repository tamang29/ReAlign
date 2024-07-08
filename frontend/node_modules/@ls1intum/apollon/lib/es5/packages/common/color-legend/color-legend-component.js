"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorLegendComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var multiline_1 = require("../../../utils/svg/multiline");
var themedComponents_1 = require("../../../components/theme/themedComponents");
var ColorLegendComponent = function (_a) {
    var element = _a.element, fillColor = _a.fillColor;
    return (react_1.default.createElement("g", null,
        react_1.default.createElement(themedComponents_1.ThemedPath, { d: "M 0 0 L ".concat(element.bounds.width - 15, " 0 L ").concat(element.bounds.width, " 15 L ").concat(element.bounds.width, " ").concat(element.bounds.height, " L 0 ").concat(element.bounds.height, " L 0 0 Z"), fillColor: fillColor || element.fillColor, strokeColor: element.strokeColor, strokeWidth: "1.2", strokeMiterlimit: "10" }),
        react_1.default.createElement(themedComponents_1.ThemedPath, { d: "M ".concat(element.bounds.width - 15, " 0 L ").concat(element.bounds.width - 15, " 15 L ").concat(element.bounds.width, " 15"), fillColor: "none", strokeColor: element.strokeColor, strokeWidth: "1.2", strokeMiterlimit: "10" }),
        react_1.default.createElement(multiline_1.Multiline, { x: element.bounds.width / 2, y: element.bounds.height / 2, width: element.bounds.width, height: element.bounds.height, fontWeight: "bold", fill: element.textColor }, element.name)));
};
exports.ColorLegendComponent = ColorLegendComponent;
//# sourceMappingURL=color-legend-component.js.map