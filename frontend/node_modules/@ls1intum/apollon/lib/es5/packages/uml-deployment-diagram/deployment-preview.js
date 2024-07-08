"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeDeploymentPreview = void 0;
var tslib_1 = require("tslib");
var uml_deployment_artifact_1 = require("./uml-deployment-artifact/uml-deployment-artifact");
var uml_deployment_node_1 = require("./uml-deployment-node/uml-deployment-node");
var uml_component_interface_1 = require("./uml-deployment-interface/uml-component-interface");
var uml_component_1 = require("./uml-deployment-component/uml-component");
var composeDeploymentPreview = function (layer, translate) {
    var elements = [];
    // UML Deployment Node
    var umlDeploymentNode = new uml_deployment_node_1.UMLDeploymentNode({ name: translate('packages.DeploymentDiagram.DeploymentNode') });
    umlDeploymentNode.bounds = tslib_1.__assign(tslib_1.__assign({}, umlDeploymentNode.bounds), { width: umlDeploymentNode.bounds.width, height: umlDeploymentNode.bounds.height });
    elements.push(umlDeploymentNode);
    // UML Component
    var umlComponent = new uml_component_1.UMLDeploymentComponent({
        name: translate('packages.DeploymentDiagram.DeploymentComponent'),
    });
    umlComponent.bounds = tslib_1.__assign(tslib_1.__assign({}, umlComponent.bounds), { width: umlComponent.bounds.width, height: umlComponent.bounds.height });
    elements.push(umlComponent);
    // UML Deployment Artifact
    var umlDeploymentArtifact = new uml_deployment_artifact_1.UMLDeploymentArtifact({
        name: translate('packages.DeploymentDiagram.DeploymentArtifact'),
    });
    umlDeploymentArtifact.bounds = tslib_1.__assign(tslib_1.__assign({}, umlDeploymentArtifact.bounds), { width: umlDeploymentArtifact.bounds.width });
    elements.push(umlDeploymentArtifact);
    // UML Deployment Interface
    var umlDeploymentInterface = new uml_component_interface_1.UMLDeploymentInterface({
        name: translate('packages.DeploymentDiagram.DeploymentInterface'),
    });
    umlDeploymentInterface.bounds = tslib_1.__assign(tslib_1.__assign({}, umlDeploymentInterface.bounds), { width: umlDeploymentInterface.bounds.width, height: umlDeploymentInterface.bounds.height });
    elements.push(umlDeploymentInterface);
    return elements;
};
exports.composeDeploymentPreview = composeDeploymentPreview;
//# sourceMappingURL=deployment-preview.js.map