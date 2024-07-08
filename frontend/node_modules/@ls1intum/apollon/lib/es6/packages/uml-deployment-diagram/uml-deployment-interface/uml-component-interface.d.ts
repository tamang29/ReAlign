import { UMLElementType } from '../../uml-element-type';
import { UMLInterface } from '../../common/uml-interface/uml-interface';
export declare class UMLDeploymentInterface extends UMLInterface {
    static supportedRelationships: ("DeploymentInterfaceProvided" | "DeploymentInterfaceRequired")[];
    type: UMLElementType;
}
