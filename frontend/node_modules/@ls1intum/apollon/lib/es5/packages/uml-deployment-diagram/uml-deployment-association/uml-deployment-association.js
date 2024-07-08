"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLDeploymentAssociation = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_relationship_centered_description_1 = require("../../../services/uml-relationship/uml-relationship-centered-description");
var UMLDeploymentAssociation = /** @class */ (function (_super) {
    tslib_1.__extends(UMLDeploymentAssociation, _super);
    function UMLDeploymentAssociation() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.DeploymentRelationshipType.DeploymentAssociation;
        return _this;
    }
    return UMLDeploymentAssociation;
}(uml_relationship_centered_description_1.UMLRelationshipCenteredDescription));
exports.UMLDeploymentAssociation = UMLDeploymentAssociation;
//# sourceMappingURL=uml-deployment-association.js.map