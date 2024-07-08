import { PetriNetRelationshipType } from '../index';
import { UMLRelationship } from '../../../services/uml-relationship/uml-relationship';
export class UMLPetriNetArc extends UMLRelationship {
    constructor(values) {
        super(values);
        this.type = PetriNetRelationshipType.PetriNetArc;
        this.name = UMLPetriNetArc.defaultMultiplicity;
        this.name = (values && values.name) || this.name;
    }
}
UMLPetriNetArc.features = { ...UMLRelationship.features, straight: true };
UMLPetriNetArc.defaultMultiplicity = '1';
//# sourceMappingURL=uml-petri-net-arc.js.map