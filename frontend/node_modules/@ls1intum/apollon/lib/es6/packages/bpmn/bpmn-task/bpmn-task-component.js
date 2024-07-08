import React from 'react';
import { ThemedRect } from '../../../components/theme/themedComponents';
import { Multiline } from '../../../utils/svg/multiline';
import { BPMNMessageIcon } from '../common/icons/bpmn-message-icon';
import { BPMNMessageFilledIcon } from '../common/icons/bpmn-message-filled-icon';
import { BPMNScriptIcon } from '../common/icons/bpmn-script-icon';
import { BPMNBusinessRuleIcon } from '../common/icons/bpmn-business-rule-icon';
import { BPMNManualIcon } from '../common/icons/bpmn-manual-icon';
import { BPMNUserIcon } from '../common/icons/bpmn-user-icon';
import { BPMNSequentialMarkerIcon } from '../common/markers/bpmn-sequential-marker-icon';
import { BpmnLoopMarkerIcon } from '../common/markers/bpmn-loop-marker-icon';
import { BPMNParallelMarkerIcon } from '../common/markers/bpmn-parallel-marker-icon';
export const BPMNTaskComponent = ({ element, fillColor, strokeColor, textColor }) => {
    /**
     * Retrieve an icon based on a given task type
     * @param taskType The task type for which an icon should be rendered
     * @param props Additional props that are passed to the rendered icon
     */
    const renderIconForType = (taskType, props = {}) => {
        switch (taskType) {
            case 'default':
                return null;
            case 'user':
                return React.createElement(BPMNUserIcon, { ...props });
            case 'send':
                return React.createElement(BPMNMessageFilledIcon, { ...props });
            case 'receive':
                return React.createElement(BPMNMessageIcon, { ...props });
            case 'manual':
                return React.createElement(BPMNManualIcon, { ...props });
            case 'business-rule':
                return React.createElement(BPMNBusinessRuleIcon, { ...props });
            case 'script':
                return React.createElement(BPMNScriptIcon, { ...props });
            default:
                return null;
        }
    };
    const renderMarker = (taskType, props = {}) => {
        switch (taskType) {
            case 'none':
                return null;
            case 'parallel multi instance':
                return React.createElement(BPMNParallelMarkerIcon, { ...props });
            case 'sequential multi instance':
                return React.createElement(BPMNSequentialMarkerIcon, { ...props });
            case 'loop':
                return React.createElement(BpmnLoopMarkerIcon, { ...props });
            default:
                return null;
        }
    };
    return (React.createElement("g", null,
        React.createElement(ThemedRect, { rx: 10, ry: 10, width: "100%", height: "100%", fillColor: fillColor || element.fillColor, strokeColor: strokeColor || element.strokeColor }),
        React.createElement(Multiline, { x: element.bounds.width / 2, y: element.bounds.height / 2, width: element.bounds.width, height: element.bounds.height, fontWeight: "bold", fill: textColor || element.textColor, lineHeight: 16, capHeight: 11 }, element.name),
        renderIconForType(element.taskType, {
            x: 10,
            y: 10,
        }),
        renderMarker(element.marker, {
            x: element.bounds.width / 2 - 7,
            y: element.bounds.height - 16,
        })));
};
//# sourceMappingURL=bpmn-task-component.js.map