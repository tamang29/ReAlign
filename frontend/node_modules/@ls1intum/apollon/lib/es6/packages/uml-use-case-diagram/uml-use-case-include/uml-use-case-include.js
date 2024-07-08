import { UseCaseRelationshipType } from '..';
import { UMLRelationship } from '../../../services/uml-relationship/uml-relationship';
export class UMLUseCaseInclude extends UMLRelationship {
    constructor() {
        super(...arguments);
        this.type = UseCaseRelationshipType.UseCaseInclude;
    }
}
UMLUseCaseInclude.features = { ...UMLRelationship.features, straight: true };
//# sourceMappingURL=uml-use-case-include.js.map