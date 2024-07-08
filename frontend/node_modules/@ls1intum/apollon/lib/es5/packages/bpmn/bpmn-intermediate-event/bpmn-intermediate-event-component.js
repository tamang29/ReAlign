"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNIntermediateEventComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var themedComponents_1 = require("../../../components/theme/themedComponents");
var multiline_1 = require("../../../utils/svg/multiline");
var bpmn_message_icon_1 = require("../common/icons/bpmn-message-icon");
var bpmn_message_filled_icon_1 = require("../common/icons/bpmn-message-filled-icon");
var bpmn_timer_icon_1 = require("../common/icons/bpmn-timer-icon");
var bpmn_escalation_filled_icon_1 = require("../common/icons/bpmn-escalation-filled-icon");
var bpmn_conditional_icon_1 = require("../common/icons/bpmn-conditional-icon");
var bpmn_link_icon_1 = require("../common/icons/bpmn-link-icon");
var bpmn_link_filled_icon_1 = require("../common/icons/bpmn-link-filled-icon");
var bpmn_compensation_filled_icon_1 = require("../common/icons/bpmn-compensation-filled-icon");
var bpmn_signal_icon_1 = require("../common/icons/bpmn-signal-icon");
var bpmn_signal_filled_icon_1 = require("../common/icons/bpmn-signal-filled-icon");
var BPMNIntermediateEventComponent = function (_a) {
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
            case 'message-catch':
                return react_1.default.createElement(bpmn_message_icon_1.BPMNMessageIcon, tslib_1.__assign({}, props));
            case 'message-throw':
                return react_1.default.createElement(bpmn_message_filled_icon_1.BPMNMessageFilledIcon, tslib_1.__assign({}, props));
            case 'timer-catch':
                return react_1.default.createElement(bpmn_timer_icon_1.BPMNTimerIcon, tslib_1.__assign({}, props));
            case 'escalation-throw':
                return react_1.default.createElement(bpmn_escalation_filled_icon_1.BPMNEscalationFilledIcon, tslib_1.__assign({}, props));
            case 'conditional-catch':
                return react_1.default.createElement(bpmn_conditional_icon_1.BPMNConditionalIcon, tslib_1.__assign({}, props));
            case 'link-catch':
                return react_1.default.createElement(bpmn_link_icon_1.BPMNLinkIcon, tslib_1.__assign({}, props));
            case 'link-throw':
                return react_1.default.createElement(bpmn_link_filled_icon_1.BPMNLinkFilledIcon, tslib_1.__assign({}, props));
            case 'compensation-throw':
                return react_1.default.createElement(bpmn_compensation_filled_icon_1.BPMNCompensationFilledIcon, tslib_1.__assign({}, props));
            case 'signal-catch':
                return react_1.default.createElement(bpmn_signal_icon_1.BPMNSignalIcon, tslib_1.__assign({}, props));
            case 'signal-throw':
                return react_1.default.createElement(bpmn_signal_filled_icon_1.BPMNSignalFilledIcon, tslib_1.__assign({}, props));
            default:
                return null;
        }
    };
    return (react_1.default.createElement("g", null,
        react_1.default.createElement(themedComponents_1.ThemedCircle, { cx: "50%", cy: "50%", r: Math.min(element.bounds.width, element.bounds.height) / 2 - 0.5, fillColor: fillColor || element.fillColor || 'transparent', strokeColor: strokeColor || element.strokeColor }),
        react_1.default.createElement(themedComponents_1.ThemedCircle, { cx: "50%", cy: "50%", r: Math.min(element.bounds.width, element.bounds.height) / 2 - 3.5, fillColor: fillColor || element.fillColor || 'transparent', strokeColor: strokeColor || element.strokeColor }),
        react_1.default.createElement(multiline_1.Multiline, { x: element.bounds.width / 2, y: element.bounds.height + 20, width: element.bounds.width * 2, fill: textColor || element.textColor, lineHeight: 16, capHeight: 11, verticalAnchor: "start" }, element.name),
        renderIconForType(element.eventType, {
            x: element.bounds.width / 2 - 10,
            y: element.bounds.height / 2 - 10,
        })));
};
exports.BPMNIntermediateEventComponent = BPMNIntermediateEventComponent;
//# sourceMappingURL=bpmn-intermediate-event-component.js.map