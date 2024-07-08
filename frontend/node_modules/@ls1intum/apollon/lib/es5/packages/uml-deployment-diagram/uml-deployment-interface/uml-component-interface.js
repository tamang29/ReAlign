"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLDeploymentInterface = void 0;
var tslib_1 = require("tslib");
var index_1 = require("../index");
var uml_interface_1 = require("../../common/uml-interface/uml-interface");
var UMLDeploymentInterface = /** @class */ (function (_super) {
    tslib_1.__extends(UMLDeploymentInterface, _super);
    function UMLDeploymentInterface() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = index_1.DeploymentElementType.DeploymentInterface;
        return _this;
    }
    UMLDeploymentInterface.supportedRelationships = [
        index_1.DeploymentRelationshipType.DeploymentInterfaceProvided,
        index_1.DeploymentRelationshipType.DeploymentInterfaceRequired,
    ];
    return UMLDeploymentInterface;
}(uml_interface_1.UMLInterface));
exports.UMLDeploymentInterface = UMLDeploymentInterface;
//# sourceMappingURL=uml-component-interface.js.map