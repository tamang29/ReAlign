import { BPMNElementType } from '..';
import { UMLContainer } from '../../../services/uml-container/uml-container';
import { assign } from '../../../utils/fx/assign';
export class BPMNTask extends UMLContainer {
    constructor(values) {
        super(values);
        this.type = BPMNElementType.BPMNTask;
        assign(this, values);
        this.taskType = values?.taskType || BPMNTask.defaultTaskType;
        this.marker = values?.marker || BPMNTask.defaultMarker;
    }
    serialize(children) {
        return {
            ...super.serialize(),
            type: this.type,
            taskType: this.taskType,
            marker: this.marker,
        };
    }
    deserialize(values, children) {
        super.deserialize(values, children);
        this.taskType = values.taskType || BPMNTask.defaultTaskType;
        this.marker = values.marker || BPMNTask.defaultMarker;
    }
    render(canvas) {
        return [this];
    }
}
BPMNTask.defaultTaskType = 'default';
BPMNTask.defaultMarker = 'none';
//# sourceMappingURL=bpmn-task.js.map