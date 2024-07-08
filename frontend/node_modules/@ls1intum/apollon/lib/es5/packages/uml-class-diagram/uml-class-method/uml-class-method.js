"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLClassMethod = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_classifier_method_1 = require("../../common/uml-classifier/uml-classifier-method");
var UMLClassMethod = /** @class */ (function (_super) {
    tslib_1.__extends(UMLClassMethod, _super);
    function UMLClassMethod() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.ClassElementType.ClassMethod;
        return _this;
    }
    return UMLClassMethod;
}(uml_classifier_method_1.UMLClassifierMethod));
exports.UMLClassMethod = UMLClassMethod;
//# sourceMappingURL=uml-class-method.js.map