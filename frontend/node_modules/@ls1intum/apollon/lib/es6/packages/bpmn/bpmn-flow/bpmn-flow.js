import { BPMNRelationshipType } from '..';
import { UMLRelationship } from '../../../services/uml-relationship/uml-relationship';
import { UMLRelationshipCenteredDescription } from '../../../services/uml-relationship/uml-relationship-centered-description';
export class BPMNFlow extends UMLRelationshipCenteredDescription {
    constructor(values) {
        super(values);
        this.type = BPMNRelationshipType.BPMNFlow;
        this.name = '';
        this.name = values?.name || this.name;
        this.flowType = values?.flowType || BPMNFlow.defaultFlowType;
    }
    serialize(children) {
        return {
            ...super.serialize(),
            type: this.type,
            flowType: this.flowType,
        };
    }
    deserialize(values, children) {
        super.deserialize(values, children);
        this.flowType = values.flowType || BPMNFlow.defaultFlowType;
    }
}
BPMNFlow.features = { ...UMLRelationship.features };
BPMNFlow.defaultFlowType = 'sequence';
//# sourceMappingURL=bpmn-flow.js.map