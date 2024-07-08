"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLActivityForkNodeHorizontal = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_element_1 = require("../../../services/uml-element/uml-element");
var UMLActivityForkNodeHorizontal = /** @class */ (function (_super) {
    tslib_1.__extends(UMLActivityForkNodeHorizontal, _super);
    function UMLActivityForkNodeHorizontal(values) {
        var _this = _super.call(this, values) || this;
        _this.type = __1.ActivityElementType.ActivityForkNodeHorizontal;
        _this.bounds = tslib_1.__assign({}, _this.bounds);
        _this.bounds.width = (values && values.bounds && values.bounds.width) || UMLActivityForkNodeHorizontal.defaultWidth;
        _this.bounds.height = UMLActivityForkNodeHorizontal.defaultHeight;
        return _this;
    }
    UMLActivityForkNodeHorizontal.prototype.render = function (layer) {
        this.bounds.width = Math.max(this.bounds.width, UMLActivityForkNodeHorizontal.defaultWidth);
        return [this];
    };
    UMLActivityForkNodeHorizontal.supportedRelationships = [__1.ActivityRelationshipType.ActivityControlFlow];
    UMLActivityForkNodeHorizontal.features = tslib_1.__assign(tslib_1.__assign({}, uml_element_1.UMLElement.features), { updatable: false });
    UMLActivityForkNodeHorizontal.defaultWidth = 60;
    UMLActivityForkNodeHorizontal.defaultHeight = 20;
    return UMLActivityForkNodeHorizontal;
}(uml_element_1.UMLElement));
exports.UMLActivityForkNodeHorizontal = UMLActivityForkNodeHorizontal;
//# sourceMappingURL=uml-activity-fork-node-horizontal.js.map