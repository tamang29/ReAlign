"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowchartInputOutputComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var flowchart_component_1 = require("../flowchart-element/flowchart-component");
var themedComponents_1 = require("../../../components/theme/themedComponents");
var boundary_1 = require("../../../utils/geometry/boundary");
var FlowchartInputOutputComponent = function (_a) {
    var element = _a.element, fillColor = _a.fillColor;
    return (react_1.default.createElement(flowchart_component_1.FlowchartComponent, { element: element },
        react_1.default.createElement(themedComponents_1.ThemedPolyline, { points: "".concat((0, boundary_1.computeDimension)(1.1, element.bounds.width), " 0, ").concat((0, boundary_1.computeDimension)(0.9, element.bounds.width), " ").concat(element.bounds.height, ", ").concat((0, boundary_1.computeDimension)(-0.1, element.bounds.width), " ").concat(element.bounds.height, ", ").concat((0, boundary_1.computeDimension)(0.1, element.bounds.width), " 0, ").concat((0, boundary_1.computeDimension)(1.1, element.bounds.width), " 0"), strokeColor: element.strokeColor, fillColor: fillColor || element.fillColor })));
};
exports.FlowchartInputOutputComponent = FlowchartInputOutputComponent;
//# sourceMappingURL=flowchart-input-output-component.js.map