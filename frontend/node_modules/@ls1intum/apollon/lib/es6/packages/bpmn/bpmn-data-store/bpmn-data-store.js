import { BPMNElementType } from '..';
import { UMLContainer } from '../../../services/uml-container/uml-container';
export class BPMNDataStore extends UMLContainer {
    constructor() {
        super(...arguments);
        this.type = BPMNElementType.BPMNDataStore;
    }
    render(canvas) {
        return [this];
    }
}
BPMNDataStore.features = { ...UMLContainer.features, resizable: false };
//# sourceMappingURL=bpmn-data-store.js.map