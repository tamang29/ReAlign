"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLClassPackage = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_package_1 = require("../../common/uml-package/uml-package");
var UMLClassPackage = /** @class */ (function (_super) {
    tslib_1.__extends(UMLClassPackage, _super);
    function UMLClassPackage() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.ClassElementType.Package;
        return _this;
    }
    return UMLClassPackage;
}(uml_package_1.UMLPackage));
exports.UMLClassPackage = UMLClassPackage;
//# sourceMappingURL=uml-class-package.js.map