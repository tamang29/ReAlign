"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowchartFunctionCallComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var flowchart_component_1 = require("../flowchart-element/flowchart-component");
var themedComponents_1 = require("../../../components/theme/themedComponents");
var FlowchartFunctionCallComponent = function (_a) {
    var element = _a.element, fillColor = _a.fillColor;
    return (react_1.default.createElement(flowchart_component_1.FlowchartComponent, { element: element },
        react_1.default.createElement(themedComponents_1.ThemedRect, { fillColor: fillColor || element.fillColor, width: 10, height: "100%", strokeColor: element.strokeColor, x: "0" }),
        react_1.default.createElement(themedComponents_1.ThemedRect, { width: element.bounds.width - 20, height: "100%", strokeColor: element.strokeColor, x: 10, fillColor: fillColor || element.fillColor }),
        react_1.default.createElement(themedComponents_1.ThemedRect, { width: 10, height: "100%", strokeColor: element.strokeColor, x: element.bounds.width - 10, fillColor: fillColor || element.fillColor })));
};
exports.FlowchartFunctionCallComponent = FlowchartFunctionCallComponent;
//# sourceMappingURL=flowchart-function-call-component.js.map