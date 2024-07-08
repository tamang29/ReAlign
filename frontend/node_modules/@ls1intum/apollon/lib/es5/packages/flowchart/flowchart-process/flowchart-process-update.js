"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowchartProcessUpdate = exports.FlowchartProcessUpdateComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var flowchart_update_1 = require("../flowchart-element/flowchart-update");
var FlowchartProcessUpdateComponent = function (props) {
    return react_1.default.createElement(flowchart_update_1.FlowchartUpdateComponent, tslib_1.__assign({}, props));
};
exports.FlowchartProcessUpdateComponent = FlowchartProcessUpdateComponent;
exports.FlowchartProcessUpdate = (0, flowchart_update_1.enhance)(exports.FlowchartProcessUpdateComponent);
//# sourceMappingURL=flowchart-process-update.js.map