import { DeploymentElementType, DeploymentRelationshipType } from '../index';
import { UMLInterface } from '../../common/uml-interface/uml-interface';
export class UMLDeploymentInterface extends UMLInterface {
    constructor() {
        super(...arguments);
        this.type = DeploymentElementType.DeploymentInterface;
    }
}
UMLDeploymentInterface.supportedRelationships = [
    DeploymentRelationshipType.DeploymentInterfaceProvided,
    DeploymentRelationshipType.DeploymentInterfaceRequired,
];
//# sourceMappingURL=uml-component-interface.js.map