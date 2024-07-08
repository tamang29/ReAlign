import { UseCaseRelationshipType } from '..';
import { UMLRelationship } from '../../../services/uml-relationship/uml-relationship';
export class UMLUseCaseExtend extends UMLRelationship {
    constructor() {
        super(...arguments);
        this.type = UseCaseRelationshipType.UseCaseExtend;
    }
}
UMLUseCaseExtend.features = { ...UMLRelationship.features, straight: true };
//# sourceMappingURL=uml-use-case-extend.js.map