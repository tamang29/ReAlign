import { ObjectRelationshipType } from '..';
import { UMLRelationship } from '../../../services/uml-relationship/uml-relationship';
export class UMLObjectLink extends UMLRelationship {
    constructor() {
        super(...arguments);
        this.type = ObjectRelationshipType.ObjectLink;
    }
}
//# sourceMappingURL=uml-object-link.js.map