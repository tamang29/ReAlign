import { ClassElementType } from '..';
import { UMLClassifierAttribute } from '../../common/uml-classifier/uml-classifier-attribute';
export class UMLClassAttribute extends UMLClassifierAttribute {
    constructor() {
        super(...arguments);
        this.type = ClassElementType.ClassAttribute;
    }
}
//# sourceMappingURL=uml-class-attribute.js.map