"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLActivityFinalNode = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_element_1 = require("../../../services/uml-element/uml-element");
var assign_1 = require("../../../utils/fx/assign");
var UMLActivityFinalNode = /** @class */ (function (_super) {
    tslib_1.__extends(UMLActivityFinalNode, _super);
    function UMLActivityFinalNode(values) {
        var _this = _super.call(this, values) || this;
        _this.type = __1.ActivityElementType.ActivityFinalNode;
        _this.bounds = tslib_1.__assign(tslib_1.__assign({}, _this.bounds), { width: 50, height: 50 });
        (0, assign_1.assign)(_this, values);
        return _this;
    }
    UMLActivityFinalNode.prototype.render = function (canvas) {
        return [this];
    };
    UMLActivityFinalNode.supportedRelationships = [__1.ActivityRelationshipType.ActivityControlFlow];
    UMLActivityFinalNode.features = tslib_1.__assign(tslib_1.__assign({}, uml_element_1.UMLElement.features), { resizable: false, updatable: false });
    return UMLActivityFinalNode;
}(uml_element_1.UMLElement));
exports.UMLActivityFinalNode = UMLActivityFinalNode;
//# sourceMappingURL=uml-activity-final-node.js.map