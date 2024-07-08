"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNTaskComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var themedComponents_1 = require("../../../components/theme/themedComponents");
var multiline_1 = require("../../../utils/svg/multiline");
var bpmn_message_icon_1 = require("../common/icons/bpmn-message-icon");
var bpmn_message_filled_icon_1 = require("../common/icons/bpmn-message-filled-icon");
var bpmn_script_icon_1 = require("../common/icons/bpmn-script-icon");
var bpmn_business_rule_icon_1 = require("../common/icons/bpmn-business-rule-icon");
var bpmn_manual_icon_1 = require("../common/icons/bpmn-manual-icon");
var bpmn_user_icon_1 = require("../common/icons/bpmn-user-icon");
var bpmn_sequential_marker_icon_1 = require("../common/markers/bpmn-sequential-marker-icon");
var bpmn_loop_marker_icon_1 = require("../common/markers/bpmn-loop-marker-icon");
var bpmn_parallel_marker_icon_1 = require("../common/markers/bpmn-parallel-marker-icon");
var BPMNTaskComponent = function (_a) {
    var element = _a.element, fillColor = _a.fillColor, strokeColor = _a.strokeColor, textColor = _a.textColor;
    /**
     * Retrieve an icon based on a given task type
     * @param taskType The task type for which an icon should be rendered
     * @param props Additional props that are passed to the rendered icon
     */
    var renderIconForType = function (taskType, props) {
        if (props === void 0) { props = {}; }
        switch (taskType) {
            case 'default':
                return null;
            case 'user':
                return react_1.default.createElement(bpmn_user_icon_1.BPMNUserIcon, tslib_1.__assign({}, props));
            case 'send':
                return react_1.default.createElement(bpmn_message_filled_icon_1.BPMNMessageFilledIcon, tslib_1.__assign({}, props));
            case 'receive':
                return react_1.default.createElement(bpmn_message_icon_1.BPMNMessageIcon, tslib_1.__assign({}, props));
            case 'manual':
                return react_1.default.createElement(bpmn_manual_icon_1.BPMNManualIcon, tslib_1.__assign({}, props));
            case 'business-rule':
                return react_1.default.createElement(bpmn_business_rule_icon_1.BPMNBusinessRuleIcon, tslib_1.__assign({}, props));
            case 'script':
                return react_1.default.createElement(bpmn_script_icon_1.BPMNScriptIcon, tslib_1.__assign({}, props));
            default:
                return null;
        }
    };
    var renderMarker = function (taskType, props) {
        if (props === void 0) { props = {}; }
        switch (taskType) {
            case 'none':
                return null;
            case 'parallel multi instance':
                return react_1.default.createElement(bpmn_parallel_marker_icon_1.BPMNParallelMarkerIcon, tslib_1.__assign({}, props));
            case 'sequential multi instance':
                return react_1.default.createElement(bpmn_sequential_marker_icon_1.BPMNSequentialMarkerIcon, tslib_1.__assign({}, props));
            case 'loop':
                return react_1.default.createElement(bpmn_loop_marker_icon_1.BpmnLoopMarkerIcon, tslib_1.__assign({}, props));
            default:
                return null;
        }
    };
    return (react_1.default.createElement("g", null,
        react_1.default.createElement(themedComponents_1.ThemedRect, { rx: 10, ry: 10, width: "100%", height: "100%", fillColor: fillColor || element.fillColor, strokeColor: strokeColor || element.strokeColor }),
        react_1.default.createElement(multiline_1.Multiline, { x: element.bounds.width / 2, y: element.bounds.height / 2, width: element.bounds.width, height: element.bounds.height, fontWeight: "bold", fill: textColor || element.textColor, lineHeight: 16, capHeight: 11 }, element.name),
        renderIconForType(element.taskType, {
            x: 10,
            y: 10,
        }),
        renderMarker(element.marker, {
            x: element.bounds.width / 2 - 7,
            y: element.bounds.height - 16,
        })));
};
exports.BPMNTaskComponent = BPMNTaskComponent;
//# sourceMappingURL=bpmn-task-component.js.map