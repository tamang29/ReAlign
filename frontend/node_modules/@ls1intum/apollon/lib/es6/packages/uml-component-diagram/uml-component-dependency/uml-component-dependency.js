import { ComponentRelationshipType } from '..';
import { UMLDependency } from '../../common/uml-dependency/uml-component-dependency';
export class UMLComponentDependency extends UMLDependency {
    constructor() {
        super(...arguments);
        this.type = ComponentRelationshipType.ComponentDependency;
    }
}
//# sourceMappingURL=uml-component-dependency.js.map