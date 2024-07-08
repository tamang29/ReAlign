import { ClassElementType } from '..';
import { UMLClassifierMethod } from '../../common/uml-classifier/uml-classifier-method';
export class UMLClassMethod extends UMLClassifierMethod {
    constructor() {
        super(...arguments);
        this.type = ClassElementType.ClassMethod;
    }
}
//# sourceMappingURL=uml-class-method.js.map