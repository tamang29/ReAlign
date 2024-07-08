import { UMLElement } from '../../../services/uml-element/uml-element';
import { ReachabilityGraphElementType } from '..';
import { calculateNameBounds } from '../../../utils/name-bounds';
export class UMLReachabilityGraphMarking extends UMLElement {
    constructor(values) {
        super(values);
        this.type = ReachabilityGraphElementType.ReachabilityGraphMarking;
        this.isInitialMarking = values?.isInitialMarking || false;
    }
    serialize(children) {
        return {
            ...super.serialize(),
            type: this.type,
            isInitialMarking: this.isInitialMarking,
        };
    }
    deserialize(values, children) {
        const assert = (v) => v.type === ReachabilityGraphElementType.ReachabilityGraphMarking;
        if (!assert(values)) {
            return;
        }
        super.deserialize(values, children);
        this.isInitialMarking = values.isInitialMarking;
    }
    render(canvas) {
        this.bounds = calculateNameBounds(this, canvas);
        return [this];
    }
}
//# sourceMappingURL=uml-reachability-graph-marking.js.map