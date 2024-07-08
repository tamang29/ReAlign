import { ClassElementType } from '..';
import { UMLClassifier } from '../../common/uml-classifier/uml-classifier';
export class UMLInterface extends UMLClassifier {
    constructor() {
        super(...arguments);
        this.type = ClassElementType.Interface;
        this.stereotype = 'interface';
    }
    reorderChildren(children) {
        const attributes = children.filter((x) => x.type === ClassElementType.ClassAttribute);
        const methods = children.filter((x) => x.type === ClassElementType.ClassMethod);
        return [...attributes.map((element) => element.id), ...methods.map((element) => element.id)];
    }
}
//# sourceMappingURL=uml-interface.js.map