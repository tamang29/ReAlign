import { ObjectElementType } from '..';
import { UMLClassifierAttribute } from '../../common/uml-classifier/uml-classifier-attribute';
export class UMLObjectAttribute extends UMLClassifierAttribute {
    constructor() {
        super(...arguments);
        this.type = ObjectElementType.ObjectAttribute;
    }
}
//# sourceMappingURL=uml-object-attribute.js.map