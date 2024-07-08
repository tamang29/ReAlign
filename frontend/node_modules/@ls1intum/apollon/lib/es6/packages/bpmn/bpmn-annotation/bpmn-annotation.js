import { BPMNElementType } from '..';
import { UMLContainer } from '../../../services/uml-container/uml-container';
export class BPMNAnnotation extends UMLContainer {
    constructor() {
        super(...arguments);
        this.type = BPMNElementType.BPMNAnnotation;
    }
    render(canvas) {
        return [this];
    }
}
BPMNAnnotation.features = { ...UMLContainer.features };
//# sourceMappingURL=bpmn-annotation.js.map