"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLUseCaseAssociation = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_relationship_1 = require("../../../services/uml-relationship/uml-relationship");
var UMLUseCaseAssociation = /** @class */ (function (_super) {
    tslib_1.__extends(UMLUseCaseAssociation, _super);
    function UMLUseCaseAssociation() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.UseCaseRelationshipType.UseCaseAssociation;
        return _this;
    }
    UMLUseCaseAssociation.features = tslib_1.__assign(tslib_1.__assign({}, uml_relationship_1.UMLRelationship.features), { straight: true });
    return UMLUseCaseAssociation;
}(uml_relationship_1.UMLRelationship));
exports.UMLUseCaseAssociation = UMLUseCaseAssociation;
//# sourceMappingURL=uml-use-case-association.js.map