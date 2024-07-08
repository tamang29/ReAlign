import { ActivityElementType, ActivityRelationshipType } from '..';
import { UMLPackage } from '../../common/uml-package/uml-package';
export class UMLActivity extends UMLPackage {
    constructor() {
        super(...arguments);
        this.type = ActivityElementType.Activity;
    }
}
UMLActivity.supportedRelationships = [ActivityRelationshipType.ActivityControlFlow];
//# sourceMappingURL=uml-activity.js.map