"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLClassBidirectional = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_association_1 = require("../../common/uml-association/uml-association");
var UMLClassBidirectional = /** @class */ (function (_super) {
    tslib_1.__extends(UMLClassBidirectional, _super);
    function UMLClassBidirectional() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.ClassRelationshipType.ClassBidirectional;
        return _this;
    }
    return UMLClassBidirectional;
}(uml_association_1.UMLAssociation));
exports.UMLClassBidirectional = UMLClassBidirectional;
//# sourceMappingURL=uml-class-bidirectional.js.map