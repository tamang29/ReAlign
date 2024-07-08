"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLObjectLink = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_relationship_1 = require("../../../services/uml-relationship/uml-relationship");
var UMLObjectLink = /** @class */ (function (_super) {
    tslib_1.__extends(UMLObjectLink, _super);
    function UMLObjectLink() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.ObjectRelationshipType.ObjectLink;
        return _this;
    }
    return UMLObjectLink;
}(uml_relationship_1.UMLRelationship));
exports.UMLObjectLink = UMLObjectLink;
//# sourceMappingURL=uml-object-link.js.map