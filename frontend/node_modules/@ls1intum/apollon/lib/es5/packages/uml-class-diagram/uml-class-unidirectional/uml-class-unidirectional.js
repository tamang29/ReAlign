"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLClassUnidirectional = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_association_1 = require("../../common/uml-association/uml-association");
var UMLClassUnidirectional = /** @class */ (function (_super) {
    tslib_1.__extends(UMLClassUnidirectional, _super);
    function UMLClassUnidirectional() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.ClassRelationshipType.ClassUnidirectional;
        return _this;
    }
    return UMLClassUnidirectional;
}(uml_association_1.UMLAssociation));
exports.UMLClassUnidirectional = UMLClassUnidirectional;
//# sourceMappingURL=uml-class-unidirectional.js.map