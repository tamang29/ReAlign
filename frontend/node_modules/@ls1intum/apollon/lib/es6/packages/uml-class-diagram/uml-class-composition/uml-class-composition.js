import { ClassRelationshipType } from '..';
import { UMLAssociation } from '../../common/uml-association/uml-association';
export class UMLClassComposition extends UMLAssociation {
    constructor() {
        super(...arguments);
        this.type = ClassRelationshipType.ClassComposition;
    }
}
//# sourceMappingURL=uml-class-composition.js.map