import { UMLElement } from '../../../services/uml-element/uml-element';
import { assign } from '../../../utils/fx/assign';
export class UMLInterface extends UMLElement {
    constructor(values) {
        super(values);
        this.bounds = { ...this.bounds, width: 20, height: 20 };
        assign(this, values);
    }
    render(layer) {
        return [this];
        // const radix = 10;
        // const bounds = Text.size(layer, this.name, { fontWeight: 'bold' });
        // this.bounds.width = Math.round((bounds.width + 20) / radix) * radix;
        // this.bounds.height = Math.round((bounds.height + 20) / radix) * radix;
        // return [this];
    }
}
UMLInterface.features = { ...UMLElement.features, resizable: false, alternativePortVisualization: true };
//# sourceMappingURL=uml-interface.js.map