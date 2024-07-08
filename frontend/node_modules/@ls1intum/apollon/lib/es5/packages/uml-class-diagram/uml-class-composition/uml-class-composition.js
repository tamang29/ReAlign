"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLClassComposition = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_association_1 = require("../../common/uml-association/uml-association");
var UMLClassComposition = /** @class */ (function (_super) {
    tslib_1.__extends(UMLClassComposition, _super);
    function UMLClassComposition() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.ClassRelationshipType.ClassComposition;
        return _this;
    }
    return UMLClassComposition;
}(uml_association_1.UMLAssociation));
exports.UMLClassComposition = UMLClassComposition;
//# sourceMappingURL=uml-class-composition.js.map