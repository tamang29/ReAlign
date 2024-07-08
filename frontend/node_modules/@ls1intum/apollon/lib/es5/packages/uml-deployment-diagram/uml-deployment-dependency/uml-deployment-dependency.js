"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLDeploymentDependency = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_component_dependency_1 = require("../../common/uml-dependency/uml-component-dependency");
var UMLDeploymentDependency = /** @class */ (function (_super) {
    tslib_1.__extends(UMLDeploymentDependency, _super);
    function UMLDeploymentDependency() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.DeploymentRelationshipType.DeploymentDependency;
        return _this;
    }
    return UMLDeploymentDependency;
}(uml_component_dependency_1.UMLDependency));
exports.UMLDeploymentDependency = UMLDeploymentDependency;
//# sourceMappingURL=uml-deployment-dependency.js.map