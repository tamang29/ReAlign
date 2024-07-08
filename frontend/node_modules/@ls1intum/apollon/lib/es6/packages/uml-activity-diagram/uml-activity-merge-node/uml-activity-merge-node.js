import { ActivityElementType, ActivityRelationshipType } from '..';
import { UMLElement } from '../../../services/uml-element/uml-element';
import { calculateNameBounds } from '../../../utils/name-bounds';
export class UMLActivityMergeNode extends UMLElement {
    constructor() {
        super(...arguments);
        this.type = ActivityElementType.ActivityMergeNode;
        this.bounds = { ...this.bounds };
    }
    render(canvas) {
        this.bounds = calculateNameBounds(this, canvas);
        return [this];
    }
}
UMLActivityMergeNode.supportedRelationships = [ActivityRelationshipType.ActivityControlFlow];
//# sourceMappingURL=uml-activity-merge-node.js.map