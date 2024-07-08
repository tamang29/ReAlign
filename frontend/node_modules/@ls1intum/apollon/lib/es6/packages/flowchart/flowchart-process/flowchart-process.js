import { FlowchartElementType } from '..';
import { UMLElement } from '../../../services/uml-element/uml-element';
import { calculateNameBounds } from '../../../utils/name-bounds';
export class FlowchartProcess extends UMLElement {
    constructor() {
        super(...arguments);
        this.type = FlowchartElementType.FlowchartProcess;
    }
    render(canvas) {
        this.bounds = calculateNameBounds(this, canvas);
        return [this];
    }
}
//# sourceMappingURL=flowchart-process.js.map