"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowchartInputOutputUpdate = exports.FlowchartInputOutputUpdateComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var flowchart_update_1 = require("../flowchart-element/flowchart-update");
var FlowchartInputOutputUpdateComponent = function (props) {
    return react_1.default.createElement(flowchart_update_1.FlowchartUpdateComponent, tslib_1.__assign({}, props));
};
exports.FlowchartInputOutputUpdateComponent = FlowchartInputOutputUpdateComponent;
exports.FlowchartInputOutputUpdate = (0, flowchart_update_1.enhance)(exports.FlowchartInputOutputUpdateComponent);
//# sourceMappingURL=flowchart-input-output-update.js.map