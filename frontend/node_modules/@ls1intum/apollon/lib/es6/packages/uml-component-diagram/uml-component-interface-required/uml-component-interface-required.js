import { ComponentRelationshipType } from '..';
import { UMLInterfaceRequired } from '../../common/uml-interface-required/uml-interface-required';
export class UMLComponentInterfaceRequired extends UMLInterfaceRequired {
    constructor() {
        super(...arguments);
        this.type = ComponentRelationshipType.ComponentInterfaceRequired;
    }
}
//# sourceMappingURL=uml-component-interface-required.js.map