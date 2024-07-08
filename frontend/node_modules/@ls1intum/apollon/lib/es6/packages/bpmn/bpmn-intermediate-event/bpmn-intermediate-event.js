import { BPMNElementType, BPMNRelationshipType } from '..';
import { assign } from '../../../utils/fx/assign';
import { UMLContainer } from '../../../services/uml-container/uml-container';
export class BPMNIntermediateEvent extends UMLContainer {
    constructor(values) {
        super(values);
        this.type = BPMNElementType.BPMNIntermediateEvent;
        this.bounds = { ...this.bounds, width: 40, height: 40 };
        assign(this, values);
        this.eventType = values?.eventType || BPMNIntermediateEvent.defaultEventType;
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
        this.eventType = values.eventType || BPMNIntermediateEvent.defaultEventType;
    }
    render(canvas) {
        return [this];
    }
}
BPMNIntermediateEvent.supportedRelationships = [BPMNRelationshipType.BPMNFlow];
BPMNIntermediateEvent.features = { ...UMLContainer.features, resizable: false };
BPMNIntermediateEvent.defaultEventType = 'default';
//# sourceMappingURL=bpmn-intermediate-event.js.map