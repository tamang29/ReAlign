"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNEndEventComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var themedComponents_1 = require("../../../components/theme/themedComponents");
var multiline_1 = require("../../../utils/svg/multiline");
var bpmn_message_filled_icon_1 = require("../common/icons/bpmn-message-filled-icon");
var bpmn_escalation_filled_icon_1 = require("../common/icons/bpmn-escalation-filled-icon");
var bpmn_compensation_filled_icon_1 = require("../common/icons/bpmn-compensation-filled-icon");
var bpmn_signal_filled_icon_1 = require("../common/icons/bpmn-signal-filled-icon");
var bpmn_terminate_filled_icon_1 = require("../common/icons/bpmn-terminate-filled-icon");
var bpmn_error_filled_icon_1 = require("../common/icons/bpmn-error-filled-icon");
var BPMNEndEventComponent = function (_a) {
    var element = _a.element, fillColor = _a.fillColor, strokeColor = _a.strokeColor, textColor = _a.textColor;
    /**
     * Retrieve an icon based on a given start event type
     * @param eventType The event type for which an icon should be rendered
     * @param props Additional props that are passed to the rendered icon
     */
    var renderIconForType = function (eventType, props) {
        if (props === void 0) { props = {}; }
        switch (eventType) {
            case 'default':
                return null;
            case 'message':
                return react_1.default.createElement(bpmn_message_filled_icon_1.BPMNMessageFilledIcon, tslib_1.__assign({}, props));
            case 'escalation':
                return react_1.default.createElement(bpmn_escalation_filled_icon_1.BPMNEscalationFilledIcon, tslib_1.__assign({}, props));
            case 'error':
                return react_1.default.createElement(bpmn_error_filled_icon_1.BPMNErrorFilledIcon, tslib_1.__assign({}, props));
            case 'compensation':
                return react_1.default.createElement(bpmn_compensation_filled_icon_1.BPMNCompensationFilledIcon, tslib_1.__assign({}, props));
            case 'signal':
                return react_1.default.createElement(bpmn_signal_filled_icon_1.BPMNSignalFilledIcon, tslib_1.__assign({}, props));
            case 'terminate':
                return react_1.default.createElement(bpmn_terminate_filled_icon_1.BPMNTerminateFilledIcon, tslib_1.__assign({}, props));
            default:
                return null;
        }
    };
    return (react_1.default.createElement("g", null,
        react_1.default.createElement(themedComponents_1.ThemedCircle, { cx: "50%", cy: "50%", r: Math.min(element.bounds.width, element.bounds.height) / 2 - 1.5, strokeWidth: 3, fillColor: fillColor || element.fillColor, strokeColor: strokeColor || element.strokeColor }),
        react_1.default.createElement(multiline_1.Multiline, { x: element.bounds.width / 2, y: element.bounds.height + 20, fill: textColor || element.textColor, width: element.bounds.width * 2, lineHeight: 16, capHeight: 11, verticalAnchor: "start" }, element.name),
        renderIconForType(element.eventType, {
            x: element.bounds.width / 2 - 10,
            y: element.bounds.height / 2 - 10,
        })));
};
exports.BPMNEndEventComponent = BPMNEndEventComponent;
//# sourceMappingURL=bpmn-end-event-component.js.map