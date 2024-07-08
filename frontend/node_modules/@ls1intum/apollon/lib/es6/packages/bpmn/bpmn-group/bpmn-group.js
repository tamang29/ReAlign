import { BPMNElementType } from '..';
import { UMLPackage } from '../../common/uml-package/uml-package';
export class BPMNGroup extends UMLPackage {
    constructor() {
        super(...arguments);
        this.type = BPMNElementType.BPMNGroup;
    }
    render(canvas, children = []) {
        return [this, ...children];
    }
}
BPMNGroup.features = {
    ...UMLPackage.features,
    connectable: false,
};
//# sourceMappingURL=bpmn-group.js.map