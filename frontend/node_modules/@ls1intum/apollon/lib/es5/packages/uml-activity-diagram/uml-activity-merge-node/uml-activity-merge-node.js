"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLActivityMergeNode = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_element_1 = require("../../../services/uml-element/uml-element");
var name_bounds_1 = require("../../../utils/name-bounds");
var UMLActivityMergeNode = /** @class */ (function (_super) {
    tslib_1.__extends(UMLActivityMergeNode, _super);
    function UMLActivityMergeNode() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.ActivityElementType.ActivityMergeNode;
        _this.bounds = tslib_1.__assign({}, _this.bounds);
        return _this;
    }
    UMLActivityMergeNode.prototype.render = function (canvas) {
        this.bounds = (0, name_bounds_1.calculateNameBounds)(this, canvas);
        return [this];
    };
    UMLActivityMergeNode.supportedRelationships = [__1.ActivityRelationshipType.ActivityControlFlow];
    return UMLActivityMergeNode;
}(uml_element_1.UMLElement));
exports.UMLActivityMergeNode = UMLActivityMergeNode;
//# sourceMappingURL=uml-activity-merge-node.js.map