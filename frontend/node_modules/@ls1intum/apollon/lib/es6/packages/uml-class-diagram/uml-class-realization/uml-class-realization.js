import { ClassRelationshipType } from '..';
import { UMLAssociation } from '../../common/uml-association/uml-association';
export class UMLClassRealization extends UMLAssociation {
    constructor() {
        super(...arguments);
        this.type = ClassRelationshipType.ClassRealization;
    }
}
//# sourceMappingURL=uml-class-realization.js.map