import { ColorLegendElementType } from '.';
import { UMLElement } from '../../../services/uml-element/uml-element';
export class ColorLegend extends UMLElement {
    constructor(values) {
        super(values && !values.bounds ? { ...values, bounds: { x: 0, y: 0, width: 160, height: 50 } } : values);
        this.type = ColorLegendElementType.ColorLegend;
    }
    render(canvas) {
        return [this];
    }
}
//# sourceMappingURL=color-legend.js.map