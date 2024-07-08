import { UseCaseRelationshipType } from '..';
import { UMLRelationship } from '../../../services/uml-relationship/uml-relationship';
export class UMLUseCaseAssociation extends UMLRelationship {
    constructor() {
        super(...arguments);
        this.type = UseCaseRelationshipType.UseCaseAssociation;
    }
}
UMLUseCaseAssociation.features = { ...UMLRelationship.features, straight: true };
//# sourceMappingURL=uml-use-case-association.js.map