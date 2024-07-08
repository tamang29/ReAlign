"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLActivityObjectNode = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_element_1 = require("../../../services/uml-element/uml-element");
var name_bounds_1 = require("../../../utils/name-bounds");
var UMLActivityObjectNode = /** @class */ (function (_super) {
    tslib_1.__extends(UMLActivityObjectNode, _super);
    function UMLActivityObjectNode() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.ActivityElementType.ActivityObjectNode;
        return _this;
    }
    UMLActivityObjectNode.prototype.render = function (canvas) {
        this.bounds = (0, name_bounds_1.calculateNameBounds)(this, canvas);
        return [this];
    };
    UMLActivityObjectNode.supportedRelationships = [__1.ActivityRelationshipType.ActivityControlFlow];
    return UMLActivityObjectNode;
}(uml_element_1.UMLElement));
exports.UMLActivityObjectNode = UMLActivityObjectNode;
//# sourceMappingURL=uml-activity-object-node.js.map