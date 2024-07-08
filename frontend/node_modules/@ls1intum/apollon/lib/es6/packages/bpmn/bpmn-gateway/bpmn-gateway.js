import { BPMNElementType } from '..';
import { assign } from '../../../utils/fx/assign';
import { UMLContainer } from '../../../services/uml-container/uml-container';
export class BPMNGateway extends UMLContainer {
    constructor(values) {
        super(values);
        this.type = BPMNElementType.BPMNGateway;
        this.bounds = { ...this.bounds, width: 40, height: 40 };
        assign(this, values);
        this.gatewayType = values?.gatewayType || BPMNGateway.defaultGatewayType;
    }
    serialize(children) {
        return {
            ...super.serialize(),
            type: this.type,
            gatewayType: this.gatewayType,
        };
    }
    deserialize(values, children) {
        super.deserialize(values, children);
        this.gatewayType = values.gatewayType || BPMNGateway.defaultGatewayType;
    }
    render(canvas) {
        return [this];
    }
}
BPMNGateway.features = { ...UMLContainer.features, resizable: false };
BPMNGateway.defaultGatewayType = 'exclusive';
//# sourceMappingURL=bpmn-gateway.js.map