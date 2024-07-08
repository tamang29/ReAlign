"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLUseCaseExtend = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_relationship_1 = require("../../../services/uml-relationship/uml-relationship");
var UMLUseCaseExtend = /** @class */ (function (_super) {
    tslib_1.__extends(UMLUseCaseExtend, _super);
    function UMLUseCaseExtend() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.UseCaseRelationshipType.UseCaseExtend;
        return _this;
    }
    UMLUseCaseExtend.features = tslib_1.__assign(tslib_1.__assign({}, uml_relationship_1.UMLRelationship.features), { straight: true });
    return UMLUseCaseExtend;
}(uml_relationship_1.UMLRelationship));
exports.UMLUseCaseExtend = UMLUseCaseExtend;
//# sourceMappingURL=uml-use-case-extend.js.map