"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLDeploymentInterfaceRequired = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_interface_required_1 = require("../../common/uml-interface-required/uml-interface-required");
var UMLDeploymentInterfaceRequired = /** @class */ (function (_super) {
    tslib_1.__extends(UMLDeploymentInterfaceRequired, _super);
    function UMLDeploymentInterfaceRequired() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.DeploymentRelationshipType.DeploymentInterfaceRequired;
        return _this;
    }
    return UMLDeploymentInterfaceRequired;
}(uml_interface_required_1.UMLInterfaceRequired));
exports.UMLDeploymentInterfaceRequired = UMLDeploymentInterfaceRequired;
//# sourceMappingURL=uml-deployment-interface-required.js.map