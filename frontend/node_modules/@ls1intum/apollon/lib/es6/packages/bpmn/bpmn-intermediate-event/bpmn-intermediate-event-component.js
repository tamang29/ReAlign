import React from 'react';
import { ThemedCircle } from '../../../components/theme/themedComponents';
import { Multiline } from '../../../utils/svg/multiline';
import { BPMNMessageIcon } from '../common/icons/bpmn-message-icon';
import { BPMNMessageFilledIcon } from '../common/icons/bpmn-message-filled-icon';
import { BPMNTimerIcon } from '../common/icons/bpmn-timer-icon';
import { BPMNEscalationFilledIcon } from '../common/icons/bpmn-escalation-filled-icon';
import { BPMNConditionalIcon } from '../common/icons/bpmn-conditional-icon';
import { BPMNLinkIcon } from '../common/icons/bpmn-link-icon';
import { BPMNLinkFilledIcon } from '../common/icons/bpmn-link-filled-icon';
import { BPMNCompensationFilledIcon } from '../common/icons/bpmn-compensation-filled-icon';
import { BPMNSignalIcon } from '../common/icons/bpmn-signal-icon';
import { BPMNSignalFilledIcon } from '../common/icons/bpmn-signal-filled-icon';
export const BPMNIntermediateEventComponent = ({ element, fillColor, strokeColor, textColor, }) => {
    /**
     * Retrieve an icon based on a given start event type
     * @param eventType The event type for which an icon should be rendered
     * @param props Additional props that are passed to the rendered icon
     */
    const renderIconForType = (eventType, props = {}) => {
        switch (eventType) {
            case 'default':
                return null;
            case 'message-catch':
                return React.createElement(BPMNMessageIcon, { ...props });
            case 'message-throw':
                return React.createElement(BPMNMessageFilledIcon, { ...props });
            case 'timer-catch':
                return React.createElement(BPMNTimerIcon, { ...props });
            case 'escalation-throw':
                return React.createElement(BPMNEscalationFilledIcon, { ...props });
            case 'conditional-catch':
                return React.createElement(BPMNConditionalIcon, { ...props });
            case 'link-catch':
                return React.createElement(BPMNLinkIcon, { ...props });
            case 'link-throw':
                return React.createElement(BPMNLinkFilledIcon, { ...props });
            case 'compensation-throw':
                return React.createElement(BPMNCompensationFilledIcon, { ...props });
            case 'signal-catch':
                return React.createElement(BPMNSignalIcon, { ...props });
            case 'signal-throw':
                return React.createElement(BPMNSignalFilledIcon, { ...props });
            default:
                return null;
        }
    };
    return (React.createElement("g", null,
        React.createElement(ThemedCircle, { cx: "50%", cy: "50%", r: Math.min(element.bounds.width, element.bounds.height) / 2 - 0.5, fillColor: fillColor || element.fillColor || 'transparent', strokeColor: strokeColor || element.strokeColor }),
        React.createElement(ThemedCircle, { cx: "50%", cy: "50%", r: Math.min(element.bounds.width, element.bounds.height) / 2 - 3.5, fillColor: fillColor || element.fillColor || 'transparent', strokeColor: strokeColor || element.strokeColor }),
        React.createElement(Multiline, { x: element.bounds.width / 2, y: element.bounds.height + 20, width: element.bounds.width * 2, fill: textColor || element.textColor, lineHeight: 16, capHeight: 11, verticalAnchor: "start" }, element.name),
        renderIconForType(element.eventType, {
            x: element.bounds.width / 2 - 10,
            y: element.bounds.height / 2 - 10,
        })));
};
//# sourceMappingURL=bpmn-intermediate-event-component.js.map