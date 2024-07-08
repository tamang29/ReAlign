import { BPMNElementType, BPMNRelationshipType } from '..';
import { assign } from '../../../utils/fx/assign';
import { UMLContainer } from '../../../services/uml-container/uml-container';
export class BPMNStartEvent extends UMLContainer {
    constructor(values) {
        super(values);
        this.type = BPMNElementType.BPMNStartEvent;
        this.bounds = { ...this.bounds, width: 40, height: 40 };
        assign(this, values);
        this.eventType = values?.eventType || BPMNStartEvent.defaultEventType;
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
        this.eventType = values.eventType || BPMNStartEvent.defaultEventType;
    }
    render(canvas) {
        return [this];
    }
}
BPMNStartEvent.supportedRelationships = [BPMNRelationshipType.BPMNFlow];
BPMNStartEvent.features = { ...UMLContainer.features, resizable: false };
BPMNStartEvent.defaultEventType = 'default';
//# sourceMappingURL=bpmn-start-event.js.map