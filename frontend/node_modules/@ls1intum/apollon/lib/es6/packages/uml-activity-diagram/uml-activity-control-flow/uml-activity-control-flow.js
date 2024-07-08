import { ActivityRelationshipType } from '..';
import { UMLRelationshipCenteredDescription } from '../../../services/uml-relationship/uml-relationship-centered-description';
export class UMLActivityControlFlow extends UMLRelationshipCenteredDescription {
    constructor() {
        super(...arguments);
        this.type = ActivityRelationshipType.ActivityControlFlow;
    }
}
//# sourceMappingURL=uml-activity-control-flow.js.map