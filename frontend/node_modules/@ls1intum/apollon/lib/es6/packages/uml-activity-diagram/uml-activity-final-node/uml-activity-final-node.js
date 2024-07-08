import { ActivityElementType, ActivityRelationshipType } from '..';
import { UMLElement } from '../../../services/uml-element/uml-element';
import { assign } from '../../../utils/fx/assign';
export class UMLActivityFinalNode extends UMLElement {
    constructor(values) {
        super(values);
        this.type = ActivityElementType.ActivityFinalNode;
        this.bounds = { ...this.bounds, width: 50, height: 50 };
        assign(this, values);
    }
    render(canvas) {
        return [this];
    }
}
UMLActivityFinalNode.supportedRelationships = [ActivityRelationshipType.ActivityControlFlow];
UMLActivityFinalNode.features = { ...UMLElement.features, resizable: false, updatable: false };
//# sourceMappingURL=uml-activity-final-node.js.map