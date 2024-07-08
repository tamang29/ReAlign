"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLActivityActionNode = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_element_1 = require("../../../services/uml-element/uml-element");
var name_bounds_1 = require("../../../utils/name-bounds");
var UMLActivityActionNode = /** @class */ (function (_super) {
    tslib_1.__extends(UMLActivityActionNode, _super);
    function UMLActivityActionNode() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.ActivityElementType.ActivityActionNode;
        return _this;
    }
    UMLActivityActionNode.prototype.render = function (canvas) {
        this.bounds = (0, name_bounds_1.calculateNameBounds)(this, canvas);
        return [this];
    };
    UMLActivityActionNode.supportedRelationships = [__1.ActivityRelationshipType.ActivityControlFlow];
    return UMLActivityActionNode;
}(uml_element_1.UMLElement));
exports.UMLActivityActionNode = UMLActivityActionNode;
//# sourceMappingURL=uml-activity-action-node.js.map