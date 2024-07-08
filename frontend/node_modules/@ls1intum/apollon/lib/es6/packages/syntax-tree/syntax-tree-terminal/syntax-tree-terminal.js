import { SyntaxTreeElementType } from '..';
import { UMLElement } from '../../../services/uml-element/uml-element';
import { calculateNameBounds } from '../../../utils/name-bounds';
export class SyntaxTreeTerminal extends UMLElement {
    constructor() {
        super(...arguments);
        this.type = SyntaxTreeElementType.SyntaxTreeTerminal;
    }
    render(canvas) {
        this.bounds = calculateNameBounds(this, canvas);
        return [this];
    }
}
//# sourceMappingURL=syntax-tree-terminal.js.map