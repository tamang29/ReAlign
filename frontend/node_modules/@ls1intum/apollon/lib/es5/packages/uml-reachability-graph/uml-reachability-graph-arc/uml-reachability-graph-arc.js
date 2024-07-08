"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLReachabilityGraphArc = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_relationship_1 = require("../../../services/uml-relationship/uml-relationship");
var uml_relationship_centered_description_1 = require("../../../services/uml-relationship/uml-relationship-centered-description");
var UMLReachabilityGraphArc = /** @class */ (function (_super) {
    tslib_1.__extends(UMLReachabilityGraphArc, _super);
    function UMLReachabilityGraphArc(values) {
        var _this = _super.call(this, values) || this;
        _this.type = __1.ReachabilityGraphRelationshipType.ReachabilityGraphArc;
        _this.name = UMLReachabilityGraphArc.transition;
        _this.name = (values && values.name) || _this.name;
        return _this;
    }
    UMLReachabilityGraphArc.features = tslib_1.__assign({}, uml_relationship_1.UMLRelationship.features);
    UMLReachabilityGraphArc.transition = 't';
    return UMLReachabilityGraphArc;
}(uml_relationship_centered_description_1.UMLRelationshipCenteredDescription));
exports.UMLReachabilityGraphArc = UMLReachabilityGraphArc;
//# sourceMappingURL=uml-reachability-graph-arc.js.map