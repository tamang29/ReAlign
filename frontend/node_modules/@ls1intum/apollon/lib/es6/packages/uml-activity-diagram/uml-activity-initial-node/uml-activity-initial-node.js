import { ActivityElementType, ActivityRelationshipType } from '..';
import { UMLElement } from '../../../services/uml-element/uml-element';
import { assign } from '../../../utils/fx/assign';
export class UMLActivityInitialNode extends UMLElement {
    constructor(values) {
        super(values);
        this.type = ActivityElementType.ActivityInitialNode;
        this.bounds = { ...this.bounds, width: 50, height: 50 };
        assign(this, values);
    }
    render(canvas) {
        return [this];
    }
}
UMLActivityInitialNode.supportedRelationships = [ActivityRelationshipType.ActivityControlFlow];
UMLActivityInitialNode.features = { ...UMLElement.features, resizable: false, updatable: false };
//# sourceMappingURL=uml-activity-initial-node.js.map