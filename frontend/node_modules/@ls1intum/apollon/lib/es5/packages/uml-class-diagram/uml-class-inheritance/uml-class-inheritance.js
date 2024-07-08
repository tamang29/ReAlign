"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLClassInheritance = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_association_1 = require("../../common/uml-association/uml-association");
var UMLClassInheritance = /** @class */ (function (_super) {
    tslib_1.__extends(UMLClassInheritance, _super);
    function UMLClassInheritance() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.ClassRelationshipType.ClassInheritance;
        return _this;
    }
    return UMLClassInheritance;
}(uml_association_1.UMLAssociation));
exports.UMLClassInheritance = UMLClassInheritance;
//# sourceMappingURL=uml-class-inheritance.js.map