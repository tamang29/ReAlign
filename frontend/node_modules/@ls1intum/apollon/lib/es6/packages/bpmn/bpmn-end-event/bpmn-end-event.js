import { BPMNElementType, BPMNRelationshipType } from '..';
import { assign } from '../../../utils/fx/assign';
import { UMLContainer } from '../../../services/uml-container/uml-container';
export class BPMNEndEvent extends UMLContainer {
    constructor(values) {
        super(values);
        this.type = BPMNElementType.BPMNEndEvent;
        this.bounds = { ...this.bounds, width: 40, height: 40 };
        assign(this, values);
        this.eventType = values?.eventType || BPMNEndEvent.defaultEventType;
    }
    serialize(children) {
        return {
            ...super.serialize(),
            type: this.type,
            eventType: this.eventType,
        };
    }
    deserialize(values, children) {
        super.deserialize(values, children);
        this.eventType = values.eventType || BPMNEndEvent.defaultEventType;
    }
    render(canvas) {
        return [this];
    }
}
BPMNEndEvent.supportedRelationships = [BPMNRelationshipType.BPMNFlow];
BPMNEndEvent.features = { ...UMLContainer.features, resizable: false };
BPMNEndEvent.defaultEventType = 'default';
//# sourceMappingURL=bpmn-end-event.js.map