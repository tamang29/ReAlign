"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowchartTerminalComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var flowchart_component_1 = require("../flowchart-element/flowchart-component");
var themedComponents_1 = require("../../../components/theme/themedComponents");
var FlowchartTerminalComponent = function (_a) {
    var element = _a.element, fillColor = _a.fillColor;
    return (react_1.default.createElement(flowchart_component_1.FlowchartComponent, { element: element },
        react_1.default.createElement(themedComponents_1.ThemedRect, { fillColor: fillColor || element.fillColor, rx: 10, ry: 10, width: "100%", height: "100%", strokeColor: element.strokeColor })));
};
exports.FlowchartTerminalComponent = FlowchartTerminalComponent;
//# sourceMappingURL=flowchart-terminal-component.js.map