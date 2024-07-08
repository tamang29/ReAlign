"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLActivityForkNode = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_element_1 = require("../../../services/uml-element/uml-element");
var UMLActivityForkNode = /** @class */ (function (_super) {
    tslib_1.__extends(UMLActivityForkNode, _super);
    function UMLActivityForkNode(values) {
        var _this = _super.call(this, values) || this;
        _this.type = __1.ActivityElementType.ActivityForkNode;
        _this.bounds = tslib_1.__assign({}, _this.bounds);
        _this.bounds.height = (values && values.bounds && values.bounds.height) || UMLActivityForkNode.defaultHeight;
        _this.bounds.width = UMLActivityForkNode.defaultWidth;
        return _this;
    }
    UMLActivityForkNode.prototype.render = function (layer) {
        this.bounds.height = Math.max(this.bounds.height, UMLActivityForkNode.defaultHeight);
        return [this];
    };
    UMLActivityForkNode.supportedRelationships = [__1.ActivityRelationshipType.ActivityControlFlow];
    UMLActivityForkNode.features = tslib_1.__assign(tslib_1.__assign({}, uml_element_1.UMLElement.features), { updatable: false });
    UMLActivityForkNode.defaultWidth = 20;
    UMLActivityForkNode.defaultHeight = 60;
    return UMLActivityForkNode;
}(uml_element_1.UMLElement));
exports.UMLActivityForkNode = UMLActivityForkNode;
//# sourceMappingURL=uml-activity-fork-node.js.map