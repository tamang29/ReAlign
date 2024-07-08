import { ActivityElementType, ActivityRelationshipType } from '..';
import { UMLElement } from '../../../services/uml-element/uml-element';
import { calculateNameBounds } from '../../../utils/name-bounds';
export class UMLActivityActionNode extends UMLElement {
    constructor() {
        super(...arguments);
        this.type = ActivityElementType.ActivityActionNode;
    }
    render(canvas) {
        this.bounds = calculateNameBounds(this, canvas);
        return [this];
    }
}
UMLActivityActionNode.supportedRelationships = [ActivityRelationshipType.ActivityControlFlow];
//# sourceMappingURL=uml-activity-action-node.js.map