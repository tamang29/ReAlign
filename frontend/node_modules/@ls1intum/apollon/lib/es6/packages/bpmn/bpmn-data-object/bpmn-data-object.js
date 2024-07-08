import { BPMNElementType } from '..';
import { UMLContainer } from '../../../services/uml-container/uml-container';
export class BPMNDataObject extends UMLContainer {
    constructor() {
        super(...arguments);
        this.type = BPMNElementType.BPMNDataObject;
    }
    render(canvas) {
        return [this];
    }
}
BPMNDataObject.features = { ...UMLContainer.features, resizable: false };
//# sourceMappingURL=bpmn-data-object.js.map