"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNCallActivityComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var themedComponents_1 = require("../../../components/theme/themedComponents");
var multiline_1 = require("../../../utils/svg/multiline");
var BPMNCallActivityComponent = function (_a) {
    var element = _a.element, fillColor = _a.fillColor, strokeColor = _a.strokeColor, textColor = _a.textColor;
    return (react_1.default.createElement("g", null,
        react_1.default.createElement(themedComponents_1.ThemedRect, { rx: 10, ry: 10, width: element.bounds.width, height: element.bounds.height, strokeColor: strokeColor || element.strokeColor, strokeWidth: 3, fillColor: fillColor || element.fillColor }),
        react_1.default.createElement(multiline_1.Multiline, { x: element.bounds.width / 2, y: element.bounds.height / 2, width: element.bounds.width, height: element.bounds.height, fontWeight: "bold", fill: textColor || element.textColor, lineHeight: 16, capHeight: 11 }, element.name)));
};
exports.BPMNCallActivityComponent = BPMNCallActivityComponent;
//# sourceMappingURL=bpmn-call-activity-component.js.map