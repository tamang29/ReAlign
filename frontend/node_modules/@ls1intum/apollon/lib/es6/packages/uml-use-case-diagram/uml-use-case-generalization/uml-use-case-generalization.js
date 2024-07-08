import { UseCaseRelationshipType } from '..';
import { UMLRelationship } from '../../../services/uml-relationship/uml-relationship';
export class UMLUseCaseGeneralization extends UMLRelationship {
    constructor() {
        super(...arguments);
        this.type = UseCaseRelationshipType.UseCaseGeneralization;
    }
}
UMLUseCaseGeneralization.features = { ...UMLRelationship.features, straight: true };
//# sourceMappingURL=uml-use-case-generalization.js.map