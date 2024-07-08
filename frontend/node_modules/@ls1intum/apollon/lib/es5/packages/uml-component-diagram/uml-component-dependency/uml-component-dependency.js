"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLComponentDependency = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_component_dependency_1 = require("../../common/uml-dependency/uml-component-dependency");
var UMLComponentDependency = /** @class */ (function (_super) {
    tslib_1.__extends(UMLComponentDependency, _super);
    function UMLComponentDependency() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.ComponentRelationshipType.ComponentDependency;
        return _this;
    }
    return UMLComponentDependency;
}(uml_component_dependency_1.UMLDependency));
exports.UMLComponentDependency = UMLComponentDependency;
//# sourceMappingURL=uml-component-dependency.js.map