import { UMLElementType } from '../../uml-element-type';
import { UMLInterface } from '../../common/uml-interface/uml-interface';
export declare class UMLComponentInterface extends UMLInterface {
    static supportedRelationships: ("ComponentInterfaceProvided" | "ComponentInterfaceRequired")[];
    type: UMLElementType;
}
