import { UMLElement } from '../../../services/uml-element/uml-element';
import { PetriNetElementType } from '../index';
import { assign } from '../../../utils/fx/assign';
export class UMLPetriNetPlace extends UMLElement {
    constructor(values) {
        super(values);
        // currently we need to add this, because otherwise this will be recognized as update in layouter and for every update action on component, antoher update is triggerd
        this.highlight = undefined;
        this.type = PetriNetElementType.PetriNetPlace;
        this.bounds = { ...this.bounds, width: 60, height: 60 };
        assign(this, values);
        this.amountOfTokens = values?.amountOfTokens || values?.amountOfTokens === 0 ? values.amountOfTokens : 0;
        this.capacity = values?.capacity || values?.capacity === 0 ? values.capacity : UMLPetriNetPlace.defaultCapacity;
    }
    serialize(children) {
        return {
            ...super.serialize(),
            type: this.type,
            amountOfTokens: this.amountOfTokens,
            capacity: !isFinite(this.capacity) ? this.capacity.toString() : this.capacity,
        };
    }
    deserialize(values, children) {
        const assert = (v) => v.type === PetriNetElementType.PetriNetPlace;
        if (!assert(values)) {
            return;
        }
        super.deserialize(values, children);
        this.amountOfTokens = values.amountOfTokens;
        this.capacity =
            values.capacity === Number.POSITIVE_INFINITY.toString() ? Number.POSITIVE_INFINITY : values.capacity;
    }
    render(canvas) {
        return [this];
    }
}
UMLPetriNetPlace.features = { ...UMLElement.features, resizable: false };
UMLPetriNetPlace.defaultCapacity = Number.POSITIVE_INFINITY;
//# sourceMappingURL=uml-petri-net-place.js.map