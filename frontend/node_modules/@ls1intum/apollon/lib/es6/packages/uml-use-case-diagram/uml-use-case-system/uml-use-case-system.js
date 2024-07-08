import { UseCaseElementType } from '..';
import { UMLContainer } from '../../../services/uml-container/uml-container';
import { UMLPackage } from '../../common/uml-package/uml-package';
export class UMLUseCaseSystem extends UMLPackage {
    constructor() {
        super(...arguments);
        this.type = UseCaseElementType.UseCaseSystem;
    }
}
UMLUseCaseSystem.features = { ...UMLContainer.features, connectable: false };
//# sourceMappingURL=uml-use-case-system.js.map