import { DeploymentRelationshipType } from '..';
import { UMLInterfaceRequired } from '../../common/uml-interface-required/uml-interface-required';
export class UMLDeploymentInterfaceRequired extends UMLInterfaceRequired {
    constructor() {
        super(...arguments);
        this.type = DeploymentRelationshipType.DeploymentInterfaceRequired;
    }
}
//# sourceMappingURL=uml-deployment-interface-required.js.map