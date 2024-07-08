import { ClassRelationshipType } from '..';
import { UMLAssociation } from '../../common/uml-association/uml-association';
export class UMLClassAggregation extends UMLAssociation {
    constructor() {
        super(...arguments);
        this.type = ClassRelationshipType.ClassAggregation;
    }
}
//# sourceMappingURL=uml-class-aggregation.js.map