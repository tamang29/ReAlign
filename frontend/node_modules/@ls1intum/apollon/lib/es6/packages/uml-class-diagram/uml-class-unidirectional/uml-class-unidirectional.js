import { ClassRelationshipType } from '..';
import { UMLAssociation } from '../../common/uml-association/uml-association';
export class UMLClassUnidirectional extends UMLAssociation {
    constructor() {
        super(...arguments);
        this.type = ClassRelationshipType.ClassUnidirectional;
    }
}
//# sourceMappingURL=uml-class-unidirectional.js.map