"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeFlowchartPreview = void 0;
var tslib_1 = require("tslib");
var boundary_1 = require("../../utils/geometry/boundary");
var flowchart_decision_1 = require("./flowchart-decision/flowchart-decision");
var flowchart_function_call_1 = require("./flowchart-function-call/flowchart-function-call");
var flowchart_input_output_1 = require("./flowchart-input-output/flowchart-input-output");
var flowchart_process_1 = require("./flowchart-process/flowchart-process");
var flowchart_terminal_1 = require("./flowchart-terminal/flowchart-terminal");
var composeFlowchartPreview = function (layer, translate) {
    var elements = [];
    var defaultBounds = { x: 0, y: 0, width: 160, height: (0, boundary_1.computeDimension)(1.0, 70) };
    elements.push(new flowchart_terminal_1.FlowchartTerminal({
        name: translate('packages.Flowchart.FlowchartTerminal'),
        bounds: defaultBounds,
    }));
    elements.push(new flowchart_process_1.FlowchartProcess({
        name: translate('packages.Flowchart.FlowchartProcess'),
        bounds: defaultBounds,
    }));
    elements.push(new flowchart_decision_1.FlowchartDecision({
        name: translate('packages.Flowchart.FlowchartDecision'),
        bounds: defaultBounds,
    }));
    elements.push(new flowchart_input_output_1.FlowchartInputOutput({
        name: translate('packages.Flowchart.FlowchartInputOutput'),
        bounds: tslib_1.__assign(tslib_1.__assign({}, defaultBounds), { width: 140 }),
    }));
    elements.push(new flowchart_function_call_1.FlowchartFunctionCall({
        name: translate('packages.Flowchart.FlowchartFunctionCall'),
        bounds: defaultBounds,
    }));
    return elements;
};
exports.composeFlowchartPreview = composeFlowchartPreview;
//# sourceMappingURL=flowchart-diagram-preview.js.map