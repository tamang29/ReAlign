"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLClassRealization = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_association_1 = require("../../common/uml-association/uml-association");
var UMLClassRealization = /** @class */ (function (_super) {
    tslib_1.__extends(UMLClassRealization, _super);
    function UMLClassRealization() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.ClassRelationshipType.ClassRealization;
        return _this;
    }
    return UMLClassRealization;
}(uml_association_1.UMLAssociation));
exports.UMLClassRealization = UMLClassRealization;
//# sourceMappingURL=uml-class-realization.js.map