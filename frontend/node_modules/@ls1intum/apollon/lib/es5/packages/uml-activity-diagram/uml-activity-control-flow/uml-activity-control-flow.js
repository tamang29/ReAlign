"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLActivityControlFlow = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_relationship_centered_description_1 = require("../../../services/uml-relationship/uml-relationship-centered-description");
var UMLActivityControlFlow = /** @class */ (function (_super) {
    tslib_1.__extends(UMLActivityControlFlow, _super);
    function UMLActivityControlFlow() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.ActivityRelationshipType.ActivityControlFlow;
        return _this;
    }
    return UMLActivityControlFlow;
}(uml_relationship_centered_description_1.UMLRelationshipCenteredDescription));
exports.UMLActivityControlFlow = UMLActivityControlFlow;
//# sourceMappingURL=uml-activity-control-flow.js.map