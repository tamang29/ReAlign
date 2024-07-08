import { ComponentElementType, ComponentRelationshipType } from '..';
import { UMLInterface } from '../../common/uml-interface/uml-interface';
export class UMLComponentInterface extends UMLInterface {
    constructor() {
        super(...arguments);
        this.type = ComponentElementType.ComponentInterface;
    }
}
UMLComponentInterface.supportedRelationships = [
    ComponentRelationshipType.ComponentInterfaceProvided,
    ComponentRelationshipType.ComponentInterfaceRequired,
];
//# sourceMappingURL=uml-component-interface.js.map