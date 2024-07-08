import { ActivityElementType, ActivityRelationshipType } from '..';
import { UMLElement } from '../../../services/uml-element/uml-element';
import { calculateNameBounds } from '../../../utils/name-bounds';
export class UMLActivityObjectNode extends UMLElement {
    constructor() {
        super(...arguments);
        this.type = ActivityElementType.ActivityObjectNode;
    }
    render(canvas) {
        this.bounds = calculateNameBounds(this, canvas);
        return [this];
    }
}
UMLActivityObjectNode.supportedRelationships = [ActivityRelationshipType.ActivityControlFlow];
//# sourceMappingURL=uml-activity-object-node.js.map