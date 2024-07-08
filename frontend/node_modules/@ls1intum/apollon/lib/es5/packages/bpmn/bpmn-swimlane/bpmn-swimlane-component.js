"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNSwimlaneComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var themedComponents_1 = require("../../../components/theme/themedComponents");
var multiline_1 = require("../../../utils/svg/multiline");
var BPMNSwimlaneComponent = function (_a) {
    var element = _a.element, fillColor = _a.fillColor, textColor = _a.textColor, children = _a.children;
    return (react_1.default.createElement("g", null,
        react_1.default.createElement(themedComponents_1.ThemedRect, { width: element.bounds.width, height: element.bounds.height, fillColor: fillColor || element.fillColor }),
        react_1.default.createElement(multiline_1.Multiline, { y: 20, x: -(element.bounds.height / 2), transform: "rotate(270)", textAnchor: "middle", alignmentBaseline: "middle", pointerEvents: "none", fill: textColor || element.textColor }, element.name),
        children));
};
exports.BPMNSwimlaneComponent = BPMNSwimlaneComponent;
//# sourceMappingURL=bpmn-swimlane-component.js.map