import { DeploymentRelationshipType } from '..';
import { UMLDependency } from '../../common/uml-dependency/uml-component-dependency';
export class UMLDeploymentDependency extends UMLDependency {
    constructor() {
        super(...arguments);
        this.type = DeploymentRelationshipType.DeploymentDependency;
    }
}
//# sourceMappingURL=uml-deployment-dependency.js.map