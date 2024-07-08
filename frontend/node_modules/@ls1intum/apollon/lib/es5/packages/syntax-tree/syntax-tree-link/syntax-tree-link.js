"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyntaxTreeLink = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_relationship_1 = require("../../../services/uml-relationship/uml-relationship");
var SyntaxTreeLink = /** @class */ (function (_super) {
    tslib_1.__extends(SyntaxTreeLink, _super);
    function SyntaxTreeLink() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.SyntaxTreeRelationshipType.SyntaxTreeLink;
        return _this;
    }
    SyntaxTreeLink.features = tslib_1.__assign(tslib_1.__assign({}, uml_relationship_1.UMLRelationship.features), { straight: true });
    return SyntaxTreeLink;
}(uml_relationship_1.UMLRelationship));
exports.SyntaxTreeLink = SyntaxTreeLink;
//# sourceMappingURL=syntax-tree-link.js.map