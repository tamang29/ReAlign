"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLInterfaceRequired = void 0;
var tslib_1 = require("tslib");
var uml_relationship_1 = require("../../../services/uml-relationship/uml-relationship");
var uml_deployment_diagram_1 = require("../../uml-deployment-diagram");
var uml_component_diagram_1 = require("../../uml-component-diagram");
var boundary_1 = require("../../../utils/geometry/boundary");
var point_1 = require("../../../utils/geometry/point");
var uml_interface_requires_constants_1 = require("./uml-interface-requires-constants");
var UMLInterfaceRequired = /** @class */ (function (_super) {
    tslib_1.__extends(UMLInterfaceRequired, _super);
    function UMLInterfaceRequired() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UMLInterfaceRequired.prototype.render = function (canvas, source, target) {
        _super.prototype.render.call(this, canvas, source, target);
        var pathBounds = this.bounds;
        // calculate end of path
        var lastPathPoint = this.path[this.path.length - 1];
        var pathEnd = new point_1.Point(this.bounds.x, this.bounds.y).add(lastPathPoint.x, lastPathPoint.y);
        // calculate marker bounding box
        var markerBoundingBox = {
            bounds: {
                x: pathEnd.x - Math.floor(uml_interface_requires_constants_1.REQUIRED_INTERFACE_MARKER_SIZE / 2),
                y: pathEnd.y - Math.floor(uml_interface_requires_constants_1.REQUIRED_INTERFACE_MARKER_SIZE / 2),
                width: uml_interface_requires_constants_1.REQUIRED_INTERFACE_MARKER_SIZE,
                height: uml_interface_requires_constants_1.REQUIRED_INTERFACE_MARKER_SIZE,
            },
        };
        this.bounds = (0, boundary_1.computeBoundingBoxForElements)([this, markerBoundingBox]);
        var horizontalTranslation = pathBounds.x - this.bounds.x;
        var verticalTranslation = pathBounds.y - this.bounds.y;
        // translation of path points, because they are relative to their own bounding box
        // the bounding may be different now -> translation to correct this
        this.path.forEach(function (point) {
            point.x += horizontalTranslation;
            point.y += verticalTranslation;
        });
        return [this];
    };
    UMLInterfaceRequired.features = tslib_1.__assign(tslib_1.__assign({}, uml_relationship_1.UMLRelationship.features), { variable: false });
    UMLInterfaceRequired.isUMLInterfaceRequired = function (element) {
        return (UMLInterfaceRequired.isUMLRelationship(element) &&
            (element.type === uml_deployment_diagram_1.DeploymentRelationshipType.DeploymentInterfaceRequired ||
                element.type === uml_component_diagram_1.ComponentRelationshipType.ComponentInterfaceRequired));
    };
    return UMLInterfaceRequired;
}(uml_relationship_1.UMLRelationship));
exports.UMLInterfaceRequired = UMLInterfaceRequired;
//# sourceMappingURL=uml-interface-required.js.map