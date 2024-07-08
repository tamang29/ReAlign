import { DeploymentRelationshipType } from '..';
import { UMLRelationshipCenteredDescription } from '../../../services/uml-relationship/uml-relationship-centered-description';
export class UMLDeploymentAssociation extends UMLRelationshipCenteredDescription {
    constructor() {
        super(...arguments);
        this.type = DeploymentRelationshipType.DeploymentAssociation;
    }
}
//# sourceMappingURL=uml-deployment-association.js.map