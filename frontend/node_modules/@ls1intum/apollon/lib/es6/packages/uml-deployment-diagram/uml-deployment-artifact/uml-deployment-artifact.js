import { DeploymentElementType, DeploymentRelationshipType } from '..';
import { UMLElement } from '../../../services/uml-element/uml-element';
import { assign } from '../../../utils/fx/assign';
import { calculateNameBounds } from '../../../utils/name-bounds';
export class UMLDeploymentArtifact extends UMLElement {
    constructor(values) {
        super();
        this.type = DeploymentElementType.DeploymentArtifact;
        this.bounds = { ...this.bounds, height: 40 };
        assign(this, values);
        this.bounds.height = (values && values.bounds && values.bounds.height) || 40;
    }
    render(layer) {
        this.bounds.height = Math.max(this.bounds.height, 40);
        this.bounds = calculateNameBounds(this, layer);
        return [this];
    }
}
UMLDeploymentArtifact.supportedRelationships = [
    DeploymentRelationshipType.DeploymentAssociation,
    DeploymentRelationshipType.DeploymentDependency,
    DeploymentRelationshipType.DeploymentInterfaceProvided,
    DeploymentRelationshipType.DeploymentInterfaceRequired,
];
//# sourceMappingURL=uml-deployment-artifact.js.map