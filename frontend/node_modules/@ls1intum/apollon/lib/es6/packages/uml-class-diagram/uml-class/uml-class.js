import { ClassElementType } from '..';
import { UMLClassifier } from '../../common/uml-classifier/uml-classifier';
export class UMLClass extends UMLClassifier {
    constructor() {
        super(...arguments);
        this.type = ClassElementType.Class;
    }
    reorderChildren(children) {
        const attributes = children.filter((x) => x.type === ClassElementType.ClassAttribute);
        const methods = children.filter((x) => x.type === ClassElementType.ClassMethod);
        return [...attributes.map((element) => element.id), ...methods.map((element) => element.id)];
    }
}
//# sourceMappingURL=uml-class.js.map