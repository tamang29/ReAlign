import { ClassElementType } from '..';
import { UMLPackage } from '../../common/uml-package/uml-package';
export class UMLClassPackage extends UMLPackage {
    constructor() {
        super(...arguments);
        this.type = ClassElementType.Package;
    }
}
//# sourceMappingURL=uml-class-package.js.map