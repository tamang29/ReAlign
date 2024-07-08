import { FlowchartElementType } from '..';
import { UMLElement } from '../../../services/uml-element/uml-element';
import { calculateNameBounds } from '../../../utils/name-bounds';
export class FlowchartInputOutput extends UMLElement {
    constructor() {
        super(...arguments);
        this.type = FlowchartElementType.FlowchartInputOutput;
    }
    render(canvas) {
        this.bounds = calculateNameBounds(this, canvas);
        return [this];
    }
}
//# sourceMappingURL=flowchart-input-output.js.map