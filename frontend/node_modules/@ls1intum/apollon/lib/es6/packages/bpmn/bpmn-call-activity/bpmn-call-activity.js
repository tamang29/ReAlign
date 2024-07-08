import { BPMNElementType } from '..';
import { UMLContainer } from '../../../services/uml-container/uml-container';
export class BPMNCallActivity extends UMLContainer {
    constructor() {
        super(...arguments);
        this.type = BPMNElementType.BPMNCallActivity;
    }
    render(canvas) {
        return [this];
    }
}
//# sourceMappingURL=bpmn-call-activity.js.map