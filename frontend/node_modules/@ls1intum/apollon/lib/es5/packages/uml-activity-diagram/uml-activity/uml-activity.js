"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLActivity = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_package_1 = require("../../common/uml-package/uml-package");
var UMLActivity = /** @class */ (function (_super) {
    tslib_1.__extends(UMLActivity, _super);
    function UMLActivity() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.ActivityElementType.Activity;
        return _this;
    }
    UMLActivity.supportedRelationships = [__1.ActivityRelationshipType.ActivityControlFlow];
    return UMLActivity;
}(uml_package_1.UMLPackage));
exports.UMLActivity = UMLActivity;
//# sourceMappingURL=uml-activity.js.map