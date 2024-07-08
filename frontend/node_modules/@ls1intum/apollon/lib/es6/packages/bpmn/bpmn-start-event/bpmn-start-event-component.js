import React from 'react';
import { ThemedCircle } from '../../../components/theme/themedComponents';
import { Multiline } from '../../../utils/svg/multiline';
import { BPMNMessageIcon } from '../common/icons/bpmn-message-icon';
import { BPMNTimerIcon } from '../common/icons/bpmn-timer-icon';
import { BPMNSignalIcon } from '../common/icons/bpmn-signal-icon';
import { BPMNConditionalIcon } from '../common/icons/bpmn-conditional-icon';
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
            return React.createElement(BPMNMessageIcon, { ...props });
        case 'timer':
            return React.createElement(BPMNTimerIcon, { ...props });
        case 'conditional':
            return React.createElement(BPMNConditionalIcon, { ...props });
        case 'signal':
            return React.createElement(BPMNSignalIcon, { ...props });
        default:
            return null;
    }
};
export const BPMNStartEventComponent = ({ element, fillColor, strokeColor, textColor }) => {
    return (React.createElement("g", null,
        React.createElement(ThemedCircle, { cx: "50%", cy: "50%", r: Math.min(element.bounds.width, element.bounds.height) / 2, fillColor: fillColor || element.fillColor || 'transparent', strokeColor: strokeColor || element.strokeColor }),
        React.createElement(Multiline, { x: element.bounds.width / 2, y: element.bounds.height + 20, width: element.bounds.width * 2, fill: textColor || element.textColor, lineHeight: 16, capHeight: 11, verticalAnchor: "start" }, element.name),
        renderIconForType(element.eventType, {
            x: element.bounds.width / 2 - 10,
            y: element.bounds.height / 2 - 10,
        })));
};
//# sourceMappingURL=bpmn-start-event-component.js.map