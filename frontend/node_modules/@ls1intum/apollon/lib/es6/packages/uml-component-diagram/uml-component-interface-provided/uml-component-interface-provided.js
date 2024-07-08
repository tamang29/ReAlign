import { ComponentRelationshipType } from '..';
import { UMLInterfaceProvided } from '../../common/uml-interface-provided/uml-interface-provided';
export class UMLComponentInterfaceProvided extends UMLInterfaceProvided {
    constructor() {
        super(...arguments);
        this.type = ComponentRelationshipType.ComponentInterfaceProvided;
    }
}
//# sourceMappingURL=uml-component-interface-provided.js.map