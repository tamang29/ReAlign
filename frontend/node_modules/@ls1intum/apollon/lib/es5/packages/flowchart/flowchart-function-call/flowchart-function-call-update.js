"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowchartFunctionCallUpdate = exports.FlowchartFunctionCallUpdateComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var flowchart_update_1 = require("../flowchart-element/flowchart-update");
var FlowchartFunctionCallUpdateComponent = function (props) {
    return react_1.default.createElement(flowchart_update_1.FlowchartUpdateComponent, tslib_1.__assign({}, props));
};
exports.FlowchartFunctionCallUpdateComponent = FlowchartFunctionCallUpdateComponent;
exports.FlowchartFunctionCallUpdate = (0, flowchart_update_1.enhance)(exports.FlowchartFunctionCallUpdateComponent);
//# sourceMappingURL=flowchart-function-call-update.js.map