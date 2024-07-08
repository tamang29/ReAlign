import { ClassRelationshipType } from '..';
import { UMLAssociation } from '../../common/uml-association/uml-association';
export class UMLClassDependency extends UMLAssociation {
    constructor() {
        super(...arguments);
        this.type = ClassRelationshipType.ClassDependency;
    }
}
//# sourceMappingURL=uml-class-dependency.js.map