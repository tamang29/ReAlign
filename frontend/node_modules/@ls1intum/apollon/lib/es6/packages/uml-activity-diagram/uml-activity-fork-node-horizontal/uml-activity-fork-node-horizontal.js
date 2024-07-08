import { ActivityElementType, ActivityRelationshipType } from '..';
import { UMLElement } from '../../../services/uml-element/uml-element';
export class UMLActivityForkNodeHorizontal extends UMLElement {
    constructor(values) {
        super(values);
        this.type = ActivityElementType.ActivityForkNodeHorizontal;
        this.bounds = {
            ...this.bounds,
        };
        this.bounds.width = (values && values.bounds && values.bounds.width) || UMLActivityForkNodeHorizontal.defaultWidth;
        this.bounds.height = UMLActivityForkNodeHorizontal.defaultHeight;
    }
    render(layer) {
        this.bounds.width = Math.max(this.bounds.width, UMLActivityForkNodeHorizontal.defaultWidth);
        return [this];
    }
}
UMLActivityForkNodeHorizontal.supportedRelationships = [ActivityRelationshipType.ActivityControlFlow];
UMLActivityForkNodeHorizontal.features = { ...UMLElement.features, updatable: false };
UMLActivityForkNodeHorizontal.defaultWidth = 60;
UMLActivityForkNodeHorizontal.defaultHeight = 20;
//# sourceMappingURL=uml-activity-fork-node-horizontal.js.map