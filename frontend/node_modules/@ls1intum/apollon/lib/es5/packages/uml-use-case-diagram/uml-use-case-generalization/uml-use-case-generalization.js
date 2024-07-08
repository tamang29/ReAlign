"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLUseCaseGeneralization = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_relationship_1 = require("../../../services/uml-relationship/uml-relationship");
var UMLUseCaseGeneralization = /** @class */ (function (_super) {
    tslib_1.__extends(UMLUseCaseGeneralization, _super);
    function UMLUseCaseGeneralization() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.UseCaseRelationshipType.UseCaseGeneralization;
        return _this;
    }
    UMLUseCaseGeneralization.features = tslib_1.__assign(tslib_1.__assign({}, uml_relationship_1.UMLRelationship.features), { straight: true });
    return UMLUseCaseGeneralization;
}(uml_relationship_1.UMLRelationship));
exports.UMLUseCaseGeneralization = UMLUseCaseGeneralization;
//# sourceMappingURL=uml-use-case-generalization.js.map