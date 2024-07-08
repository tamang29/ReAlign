import { ReachabilityGraphRelationshipType } from '..';
import { UMLRelationship } from '../../../services/uml-relationship/uml-relationship';
import { UMLRelationshipCenteredDescription } from '../../../services/uml-relationship/uml-relationship-centered-description';
export class UMLReachabilityGraphArc extends UMLRelationshipCenteredDescription {
    constructor(values) {
        super(values);
        this.type = ReachabilityGraphRelationshipType.ReachabilityGraphArc;
        this.name = UMLReachabilityGraphArc.transition;
        this.name = (values && values.name) || this.name;
    }
}
UMLReachabilityGraphArc.features = { ...UMLRelationship.features };
UMLReachabilityGraphArc.transition = 't';
//# sourceMappingURL=uml-reachability-graph-arc.js.map