import { DeploymentRelationshipType } from '..';
import { UMLInterfaceProvided } from '../../common/uml-interface-provided/uml-interface-provided';
export class UMLDeploymentInterfaceProvided extends UMLInterfaceProvided {
    constructor() {
        super(...arguments);
        this.type = DeploymentRelationshipType.DeploymentInterfaceProvided;
    }
}
//# sourceMappingURL=uml-deployment-interface-provided.js.map