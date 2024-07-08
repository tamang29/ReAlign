import { UseCaseElementType } from '..';
import { UMLElement } from '../../../services/uml-element/uml-element';
import { calculateNameBounds } from '../../../utils/name-bounds';
export class UMLUseCase extends UMLElement {
    constructor() {
        super(...arguments);
        this.type = UseCaseElementType.UseCase;
    }
    render(canvas) {
        this.bounds = calculateNameBounds(this, canvas);
        return [this];
    }
}
//# sourceMappingURL=uml-use-case.js.map