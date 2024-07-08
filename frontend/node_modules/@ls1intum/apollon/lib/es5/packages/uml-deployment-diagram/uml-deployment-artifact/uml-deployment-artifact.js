"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLDeploymentArtifact = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_element_1 = require("../../../services/uml-element/uml-element");
var assign_1 = require("../../../utils/fx/assign");
var name_bounds_1 = require("../../../utils/name-bounds");
var UMLDeploymentArtifact = /** @class */ (function (_super) {
    tslib_1.__extends(UMLDeploymentArtifact, _super);
    function UMLDeploymentArtifact(values) {
        var _this = _super.call(this) || this;
        _this.type = __1.DeploymentElementType.DeploymentArtifact;
        _this.bounds = tslib_1.__assign(tslib_1.__assign({}, _this.bounds), { height: 40 });
        (0, assign_1.assign)(_this, values);
        _this.bounds.height = (values && values.bounds && values.bounds.height) || 40;
        return _this;
    }
    UMLDeploymentArtifact.prototype.render = function (layer) {
        this.bounds.height = Math.max(this.bounds.height, 40);
        this.bounds = (0, name_bounds_1.calculateNameBounds)(this, layer);
        return [this];
    };
    UMLDeploymentArtifact.supportedRelationships = [
        __1.DeploymentRelationshipType.DeploymentAssociation,
        __1.DeploymentRelationshipType.DeploymentDependency,
        __1.DeploymentRelationshipType.DeploymentInterfaceProvided,
        __1.DeploymentRelationshipType.DeploymentInterfaceRequired,
    ];
    return UMLDeploymentArtifact;
}(uml_element_1.UMLElement));
exports.UMLDeploymentArtifact = UMLDeploymentArtifact;
//# sourceMappingURL=uml-deployment-artifact.js.map