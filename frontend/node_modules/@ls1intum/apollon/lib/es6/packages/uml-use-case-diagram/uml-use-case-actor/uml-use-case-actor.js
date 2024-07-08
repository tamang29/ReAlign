import { UseCaseElementType } from '..';
import { UMLElement } from '../../../services/uml-element/uml-element';
import { assign } from '../../../utils/fx/assign';
export class UMLUseCaseActor extends UMLElement {
    constructor(values) {
        super(values);
        this.type = UseCaseElementType.UseCaseActor;
        this.bounds = { ...this.bounds, width: 90, height: 140 };
        assign(this, values);
    }
    render(canvas) {
        return [this];
    }
}
//# sourceMappingURL=uml-use-case-actor.js.map