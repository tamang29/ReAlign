import { ClassRelationshipType } from '..';
import { UMLAssociation } from '../../common/uml-association/uml-association';
export class UMLClassBidirectional extends UMLAssociation {
    constructor() {
        super(...arguments);
        this.type = ClassRelationshipType.ClassBidirectional;
    }
}
//# sourceMappingURL=uml-class-bidirectional.js.map