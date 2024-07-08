"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowchartDecisionComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var flowchart_component_1 = require("../flowchart-element/flowchart-component");
var themedComponents_1 = require("../../../components/theme/themedComponents");
var FlowchartDecisionComponent = function (_a) {
    var element = _a.element, fillColor = _a.fillColor;
    return (react_1.default.createElement(flowchart_component_1.FlowchartComponent, { element: element },
        react_1.default.createElement(themedComponents_1.ThemedPolyline, { points: "".concat(element.bounds.width / 2, " 0, ").concat(element.bounds.width, " ").concat(element.bounds.height / 2, ", ").concat(element.bounds.width / 2, " ").concat(element.bounds.height, ", 0 ").concat(element.bounds.height / 2, ", ").concat(element.bounds.width / 2, " 0"), strokeColor: element.strokeColor, fillColor: fillColor || element.fillColor })));
};
exports.FlowchartDecisionComponent = FlowchartDecisionComponent;
//# sourceMappingURL=flowchart-decision-component.js.map