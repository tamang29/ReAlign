"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNGateway = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var assign_1 = require("../../../utils/fx/assign");
var uml_container_1 = require("../../../services/uml-container/uml-container");
var BPMNGateway = /** @class */ (function (_super) {
    tslib_1.__extends(BPMNGateway, _super);
    function BPMNGateway(values) {
        var _this = _super.call(this, values) || this;
        _this.type = __1.BPMNElementType.BPMNGateway;
        _this.bounds = tslib_1.__assign(tslib_1.__assign({}, _this.bounds), { width: 40, height: 40 });
        (0, assign_1.assign)(_this, values);
        _this.gatewayType = (values === null || values === void 0 ? void 0 : values.gatewayType) || BPMNGateway.defaultGatewayType;
        return _this;
    }
    BPMNGateway.prototype.serialize = function (children) {
        return tslib_1.__assign(tslib_1.__assign({}, _super.prototype.serialize.call(this)), { type: this.type, gatewayType: this.gatewayType });
    };
    BPMNGateway.prototype.deserialize = function (values, children) {
        _super.prototype.deserialize.call(this, values, children);
        this.gatewayType = values.gatewayType || BPMNGateway.defaultGatewayType;
    };
    BPMNGateway.prototype.render = function (canvas) {
        return [this];
    };
    BPMNGateway.features = tslib_1.__assign(tslib_1.__assign({}, uml_container_1.UMLContainer.features), { resizable: false });
    BPMNGateway.defaultGatewayType = 'exclusive';
    return BPMNGateway;
}(uml_container_1.UMLContainer));
exports.BPMNGateway = BPMNGateway;
//# sourceMappingURL=bpmn-gateway.js.map