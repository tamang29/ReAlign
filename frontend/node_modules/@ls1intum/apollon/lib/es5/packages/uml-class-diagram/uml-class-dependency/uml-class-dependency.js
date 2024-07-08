"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLClassDependency = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_association_1 = require("../../common/uml-association/uml-association");
var UMLClassDependency = /** @class */ (function (_super) {
    tslib_1.__extends(UMLClassDependency, _super);
    function UMLClassDependency() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.ClassRelationshipType.ClassDependency;
        return _this;
    }
    return UMLClassDependency;
}(uml_association_1.UMLAssociation));
exports.UMLClassDependency = UMLClassDependency;
//# sourceMappingURL=uml-class-dependency.js.map