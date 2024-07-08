import { PetriNetElementType } from '..';
import { UMLElement } from '../../../services/uml-element/uml-element';
export class UMLPetriNetTransition extends UMLElement {
    constructor(values) {
        super(values);
        this.type = PetriNetElementType.PetriNetTransition;
        this.bounds = {
            ...this.bounds,
        };
        this.bounds.height = (values && values.bounds && values.bounds.height) || UMLPetriNetTransition.defaultHeight;
        this.bounds.width = (values && values.bounds && values.bounds.width) || UMLPetriNetTransition.defaultWidth;
    }
    render(layer) {
        this.bounds.height = Math.max(this.bounds.height, UMLPetriNetTransition.defaultHeight);
        this.bounds.width = Math.max(this.bounds.width, UMLPetriNetTransition.defaultWidth);
        return [this];
    }
}
UMLPetriNetTransition.features = { ...UMLElement.features };
UMLPetriNetTransition.defaultWidth = 20;
UMLPetriNetTransition.defaultHeight = 60;
//# sourceMappingURL=uml-petri-net-transition.js.map