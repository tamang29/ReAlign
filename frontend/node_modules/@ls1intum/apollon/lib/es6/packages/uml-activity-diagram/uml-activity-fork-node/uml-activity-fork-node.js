import { ActivityElementType, ActivityRelationshipType } from '..';
import { UMLElement } from '../../../services/uml-element/uml-element';
export class UMLActivityForkNode extends UMLElement {
    constructor(values) {
        super(values);
        this.type = ActivityElementType.ActivityForkNode;
        this.bounds = {
            ...this.bounds,
        };
        this.bounds.height = (values && values.bounds && values.bounds.height) || UMLActivityForkNode.defaultHeight;
        this.bounds.width = UMLActivityForkNode.defaultWidth;
    }
    render(layer) {
        this.bounds.height = Math.max(this.bounds.height, UMLActivityForkNode.defaultHeight);
        return [this];
    }
}
UMLActivityForkNode.supportedRelationships = [ActivityRelationshipType.ActivityControlFlow];
UMLActivityForkNode.features = { ...UMLElement.features, updatable: false };
UMLActivityForkNode.defaultWidth = 20;
UMLActivityForkNode.defaultHeight = 60;
//# sourceMappingURL=uml-activity-fork-node.js.map