import { SyntaxTreeRelationshipType } from '..';
import { UMLRelationship } from '../../../services/uml-relationship/uml-relationship';
export class SyntaxTreeLink extends UMLRelationship {
    constructor() {
        super(...arguments);
        this.type = SyntaxTreeRelationshipType.SyntaxTreeLink;
    }
}
SyntaxTreeLink.features = { ...UMLRelationship.features, straight: true };
//# sourceMappingURL=syntax-tree-link.js.map