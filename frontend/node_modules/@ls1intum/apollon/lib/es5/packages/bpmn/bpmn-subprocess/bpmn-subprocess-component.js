"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNSubprocessComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var themedComponents_1 = require("../../../components/theme/themedComponents");
var multiline_1 = require("../../../utils/svg/multiline");
var BPMNSubprocessComponent = function (_a) {
    var element = _a.element, fillColor = _a.fillColor, strokeColor = _a.strokeColor, textColor = _a.textColor;
    return (react_1.default.createElement("g", null,
        react_1.default.createElement(themedComponents_1.ThemedRect, { rx: 10, ry: 10, width: "100%", height: "100%", fillColor: fillColor || element.fillColor, strokeColor: strokeColor || element.strokeColor }),
        react_1.default.createElement(themedComponents_1.ThemedRect, { x: element.bounds.width / 2 - 7, y: element.bounds.height - 14, width: 14, height: 14, fillColor: "transparent", strokeColor: element.strokeColor }),
        react_1.default.createElement(themedComponents_1.ThemedPolyline, { points: "".concat(element.bounds.width / 2 - 4, " ").concat(element.bounds.height - 7, ", ").concat(element.bounds.width / 2 + 4, " ").concat(element.bounds.height - 7), strokeColor: strokeColor || element.strokeColor, strokeLinejoin: "round", strokeLinecap: "round" }),
        react_1.default.createElement(themedComponents_1.ThemedPolyline, { points: "".concat(element.bounds.width / 2, " ").concat(element.bounds.height - 11, ", ").concat(element.bounds.width / 2, " ").concat(element.bounds.height - 3), strokeColor: strokeColor || element.strokeColor, strokeLinejoin: "round", strokeLinecap: "round" }),
        react_1.default.createElement(multiline_1.Multiline, { x: element.bounds.width / 2, y: element.bounds.height / 2, width: element.bounds.width, height: element.bounds.height, fontWeight: "bold", fill: textColor || element.textColor, lineHeight: 16, capHeight: 11 }, element.name)));
};
exports.BPMNSubprocessComponent = BPMNSubprocessComponent;
//# sourceMappingURL=bpmn-subprocess-component.js.map