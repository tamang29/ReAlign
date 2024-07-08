"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNFlow = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_relationship_1 = require("../../../services/uml-relationship/uml-relationship");
var uml_relationship_centered_description_1 = require("../../../services/uml-relationship/uml-relationship-centered-description");
var BPMNFlow = /** @class */ (function (_super) {
    tslib_1.__extends(BPMNFlow, _super);
    function BPMNFlow(values) {
        var _this = _super.call(this, values) || this;
        _this.type = __1.BPMNRelationshipType.BPMNFlow;
        _this.name = '';
        _this.name = (values === null || values === void 0 ? void 0 : values.name) || _this.name;
        _this.flowType = (values === null || values === void 0 ? void 0 : values.flowType) || BPMNFlow.defaultFlowType;
        return _this;
    }
    BPMNFlow.prototype.serialize = function (children) {
        return tslib_1.__assign(tslib_1.__assign({}, _super.prototype.serialize.call(this)), { type: this.type, flowType: this.flowType });
    };
    BPMNFlow.prototype.deserialize = function (values, children) {
        _super.prototype.deserialize.call(this, values, children);
        this.flowType = values.flowType || BPMNFlow.defaultFlowType;
    };
    BPMNFlow.features = tslib_1.__assign({}, uml_relationship_1.UMLRelationship.features);
    BPMNFlow.defaultFlowType = 'sequence';
    return BPMNFlow;
}(uml_relationship_centered_description_1.UMLRelationshipCenteredDescription));
exports.BPMNFlow = BPMNFlow;
//# sourceMappingURL=bpmn-flow.js.map