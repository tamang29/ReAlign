import { BPMNElementType } from '..';
import { UMLElement } from '../../../services/uml-element/uml-element';
import { UMLContainer } from '../../../services/uml-container/uml-container';
export class BPMNSwimlane extends UMLContainer {
    constructor() {
        super(...arguments);
        this.type = BPMNElementType.BPMNSwimlane;
    }
    render(layer, children = []) {
        if (this.bounds.height < BPMNSwimlane.MIN_HEIGHT) {
            this.bounds.height = BPMNSwimlane.MIN_HEIGHT;
        }
        return [this, ...children];
    }
}
BPMNSwimlane.DEFAULT_HEIGHT = 80;
BPMNSwimlane.MIN_HEIGHT = 80;
BPMNSwimlane.features = {
    ...UMLElement.features,
    droppable: true,
    movable: false,
    connectable: false,
    updatable: false,
    resizable: 'HEIGHT',
};
//# sourceMappingURL=bpmn-swimlane.js.map