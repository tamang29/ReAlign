import { BPMNElementType } from '..';
import { calculateNameBounds } from '../../../utils/name-bounds';
import { UMLContainer } from '../../../services/uml-container/uml-container';
export class BPMNSubprocess extends UMLContainer {
    constructor() {
        super(...arguments);
        this.type = BPMNElementType.BPMNSubprocess;
    }
    render(canvas) {
        this.bounds = calculateNameBounds(this, canvas);
        return [this];
    }
}
//# sourceMappingURL=bpmn-subprocess.js.map