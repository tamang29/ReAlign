"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLActivityInitialNode = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_element_1 = require("../../../services/uml-element/uml-element");
var assign_1 = require("../../../utils/fx/assign");
var UMLActivityInitialNode = /** @class */ (function (_super) {
    tslib_1.__extends(UMLActivityInitialNode, _super);
    function UMLActivityInitialNode(values) {
        var _this = _super.call(this, values) || this;
        _this.type = __1.ActivityElementType.ActivityInitialNode;
        _this.bounds = tslib_1.__assign(tslib_1.__assign({}, _this.bounds), { width: 50, height: 50 });
        (0, assign_1.assign)(_this, values);
        return _this;
    }
    UMLActivityInitialNode.prototype.render = function (canvas) {
        return [this];
    };
    UMLActivityInitialNode.supportedRelationships = [__1.ActivityRelationshipType.ActivityControlFlow];
    UMLActivityInitialNode.features = tslib_1.__assign(tslib_1.__assign({}, uml_element_1.UMLElement.features), { resizable: false, updatable: false });
    return UMLActivityInitialNode;
}(uml_element_1.UMLElement));
exports.UMLActivityInitialNode = UMLActivityInitialNode;
//# sourceMappingURL=uml-activity-initial-node.js.map