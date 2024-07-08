import { ObjectElementType } from '..';
import { UMLClassifierMethod } from '../../common/uml-classifier/uml-classifier-method';
export class UMLObjectMethod extends UMLClassifierMethod {
    constructor() {
        super(...arguments);
        this.type = ObjectElementType.ObjectMethod;
    }
}
//# sourceMappingURL=uml-object-method.js.map