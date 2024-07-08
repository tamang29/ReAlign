import { BPMNElementType } from '..';
import { UMLContainer } from '../../../services/uml-container/uml-container';
export class BPMNTransaction extends UMLContainer {
    constructor() {
        super(...arguments);
        this.type = BPMNElementType.BPMNTransaction;
    }
    render(canvas) {
        return [this];
    }
}
//# sourceMappingURL=bpmn-transaction.js.map