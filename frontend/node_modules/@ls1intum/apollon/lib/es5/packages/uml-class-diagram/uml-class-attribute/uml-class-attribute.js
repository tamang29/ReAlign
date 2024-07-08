"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLClassAttribute = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_classifier_attribute_1 = require("../../common/uml-classifier/uml-classifier-attribute");
var UMLClassAttribute = /** @class */ (function (_super) {
    tslib_1.__extends(UMLClassAttribute, _super);
    function UMLClassAttribute() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.ClassElementType.ClassAttribute;
        return _this;
    }
    return UMLClassAttribute;
}(uml_classifier_attribute_1.UMLClassifierAttribute));
exports.UMLClassAttribute = UMLClassAttribute;
//# sourceMappingURL=uml-class-attribute.js.map