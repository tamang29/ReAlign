"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLObjectAttribute = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_classifier_attribute_1 = require("../../common/uml-classifier/uml-classifier-attribute");
var UMLObjectAttribute = /** @class */ (function (_super) {
    tslib_1.__extends(UMLObjectAttribute, _super);
    function UMLObjectAttribute() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.ObjectElementType.ObjectAttribute;
        return _this;
    }
    return UMLObjectAttribute;
}(uml_classifier_attribute_1.UMLClassifierAttribute));
exports.UMLObjectAttribute = UMLObjectAttribute;
//# sourceMappingURL=uml-object-attribute.js.map