"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNPoolComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var bpmn_pool_1 = require("./bpmn-pool");
var themedComponents_1 = require("../../../components/theme/themedComponents");
var multiline_1 = require("../../../utils/svg/multiline");
var BPMNPoolComponent = function (_a) {
    var element = _a.element, fillColor = _a.fillColor, strokeColor = _a.strokeColor, textColor = _a.textColor, children = _a.children;
    return (react_1.default.createElement("g", null,
        react_1.default.createElement(themedComponents_1.ThemedRect, { y: 0, width: bpmn_pool_1.BPMNPool.HEADER_WIDTH, height: element.bounds.height, strokeColor: strokeColor || element.strokeColor, fillColor: fillColor || element.fillColor }),
        react_1.default.createElement(themedComponents_1.ThemedRect, { y: 0, x: bpmn_pool_1.BPMNPool.HEADER_WIDTH, width: element.bounds.width - bpmn_pool_1.BPMNPool.HEADER_WIDTH, height: element.bounds.height, strokeColor: strokeColor || element.strokeColor, fillColor: fillColor || element.fillColor }),
        react_1.default.createElement(multiline_1.Multiline, { y: 20, x: -(element.bounds.height / 2), textAnchor: "middle", alignmentBaseline: "middle", transform: "rotate(270)", fontWeight: "bold", pointerEvents: "none", fill: textColor || element.textColor }, element.name),
        children));
};
exports.BPMNPoolComponent = BPMNPoolComponent;
//# sourceMappingURL=bpmn-pool-component.js.map