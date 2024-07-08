"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLClassAggregation = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_association_1 = require("../../common/uml-association/uml-association");
var UMLClassAggregation = /** @class */ (function (_super) {
    tslib_1.__extends(UMLClassAggregation, _super);
    function UMLClassAggregation() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.ClassRelationshipType.ClassAggregation;
        return _this;
    }
    return UMLClassAggregation;
}(uml_association_1.UMLAssociation));
exports.UMLClassAggregation = UMLClassAggregation;
//# sourceMappingURL=uml-class-aggregation.js.map