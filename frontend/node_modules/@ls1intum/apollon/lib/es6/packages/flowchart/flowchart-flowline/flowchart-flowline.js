import { FlowchartRelationshipType } from '..';
import { UMLRelationship } from '../../../services/uml-relationship/uml-relationship';
export class FlowchartFlowline extends UMLRelationship {
    constructor() {
        super(...arguments);
        this.type = FlowchartRelationshipType.FlowchartFlowline;
    }
}
//# sourceMappingURL=flowchart-flowline.js.map