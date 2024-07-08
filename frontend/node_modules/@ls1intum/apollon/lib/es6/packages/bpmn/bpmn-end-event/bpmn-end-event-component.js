import React from 'react';
import { ThemedCircle } from '../../../components/theme/themedComponents';
import { Multiline } from '../../../utils/svg/multiline';
import { BPMNMessageFilledIcon } from '../common/icons/bpmn-message-filled-icon';
import { BPMNEscalationFilledIcon } from '../common/icons/bpmn-escalation-filled-icon';
import { BPMNCompensationFilledIcon } from '../common/icons/bpmn-compensation-filled-icon';
import { BPMNSignalFilledIcon } from '../common/icons/bpmn-signal-filled-icon';
import { BPMNTerminateFilledIcon } from '../common/icons/bpmn-terminate-filled-icon';
import { BPMNErrorFilledIcon } from '../common/icons/bpmn-error-filled-icon';
export const BPMNEndEventComponent = ({ element, fillColor, strokeColor, textColor }) => {
    /**
     * Retrieve an icon based on a given start event type
     * @param eventType The event type for which an icon should be rendered
     * @param props Additional props that are passed to the rendered icon
     */
    const renderIconForType = (eventType, props = {}) => {
        switch (eventType) {
            case 'default':
                return null;
            case 'message':
                return React.createElement(BPMNMessageFilledIcon, { ...props });
            case 'escalation':
                return React.createElement(BPMNEscalationFilledIcon, { ...props });
            case 'error':
                return React.createElement(BPMNErrorFilledIcon, { ...props });
            case 'compensation':
                return React.createElement(BPMNCompensationFilledIcon, { ...props });
            case 'signal':
                return React.createElement(BPMNSignalFilledIcon, { ...props });
            case 'terminate':
                return React.createElement(BPMNTerminateFilledIcon, { ...props });
            default:
                return null;
        }
    };
    return (React.createElement("g", null,
        React.createElement(ThemedCircle, { cx: "50%", cy: "50%", r: Math.min(element.bounds.width, element.bounds.height) / 2 - 1.5, strokeWidth: 3, fillColor: fillColor || element.fillColor, strokeColor: strokeColor || element.strokeColor }),
        React.createElement(Multiline, { x: element.bounds.width / 2, y: element.bounds.height + 20, fill: textColor || element.textColor, width: element.bounds.width * 2, lineHeight: 16, capHeight: 11, verticalAnchor: "start" }, element.name),
        renderIconForType(element.eventType, {
            x: element.bounds.width / 2 - 10,
            y: element.bounds.height / 2 - 10,
        })));
};
//# sourceMappingURL=bpmn-end-event-component.js.map