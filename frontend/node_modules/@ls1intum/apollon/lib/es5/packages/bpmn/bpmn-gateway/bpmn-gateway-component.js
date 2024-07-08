"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNGatewayComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var bpmn_event_based_gateway_component_1 = require("./gateways-components/bpmn-event-based-gateway-component");
var bpmn_exclusive_gateway_component_1 = require("./gateways-components/bpmn-exclusive-gateway-component");
var bpmn_inclusive_gateway_component_1 = require("./gateways-components/bpmn-inclusive-gateway-component");
var bpmn_parallel_gateway_component_1 = require("./gateways-components/bpmn-parallel-gateway-component");
var bpmn_complex_gateway_component_1 = require("./gateways-components/bpmn-complex-gateway-component");
var BPMNGatewayComponent = function (props) {
    var GatewayComponent = bpmn_exclusive_gateway_component_1.BPMNExclusiveGatewayComponent;
    switch (props.element.gatewayType) {
        case 'complex':
            GatewayComponent = bpmn_complex_gateway_component_1.BPMNComplexGatewayComponent;
            break;
        case 'event-based':
            GatewayComponent = bpmn_event_based_gateway_component_1.BPMNEventBasedGatewayComponent;
            break;
        case 'exclusive':
            GatewayComponent = bpmn_exclusive_gateway_component_1.BPMNExclusiveGatewayComponent;
            break;
        case 'inclusive':
            GatewayComponent = bpmn_inclusive_gateway_component_1.BPMNInclusiveGatewayComponent;
            break;
        case 'parallel':
            GatewayComponent = bpmn_parallel_gateway_component_1.BPMNParallelGatewayComponent;
            break;
    }
    return (react_1.default.createElement("g", null,
        react_1.default.createElement(GatewayComponent, tslib_1.__assign({}, props))));
};
exports.BPMNGatewayComponent = BPMNGatewayComponent;
//# sourceMappingURL=bpmn-gateway-component.js.map