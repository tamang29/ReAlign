import { FlowchartElementType } from '..';
import { UMLElement } from '../../../services/uml-element/uml-element';
import { calculateNameBounds } from '../../../utils/name-bounds';
export class FlowchartDecision extends UMLElement {
    constructor() {
        super(...arguments);
        this.type = FlowchartElementType.FlowchartDecision;
    }
    render(canvas) {
        this.bounds = calculateNameBounds(this, canvas);
        return [this];
    }
}
//# sourceMappingURL=flowchart-decision.js.map