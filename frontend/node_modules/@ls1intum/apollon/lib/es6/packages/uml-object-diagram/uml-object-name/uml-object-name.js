import { ObjectElementType } from '..';
import { UMLClassifier } from '../../common/uml-classifier/uml-classifier';
export class UMLObjectName extends UMLClassifier {
    constructor() {
        super(...arguments);
        this.type = ObjectElementType.ObjectName;
        this.underline = true;
    }
    reorderChildren(children) {
        const attributes = children.filter((x) => x.type === ObjectElementType.ObjectAttribute);
        const methods = children.filter((x) => x.type === ObjectElementType.ObjectMethod);
        return [...attributes.map((element) => element.id), ...methods.map((element) => element.id)];
    }
}
//# sourceMappingURL=uml-object-name.js.map