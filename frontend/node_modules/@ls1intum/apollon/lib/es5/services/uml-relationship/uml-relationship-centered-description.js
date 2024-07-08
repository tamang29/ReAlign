"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLRelationshipCenteredDescription = void 0;
var tslib_1 = require("tslib");
var point_1 = require("../../utils/geometry/point");
var text_1 = require("../../utils/svg/text");
var boundary_1 = require("../../utils/geometry/boundary");
var uml_relationship_1 = require("./uml-relationship");
var uml_diagram_1 = require("../uml-diagram/uml-diagram");
// TODO: this is a ugly solution, which is needed, becasue we want to maintain backwards compatability of diagrams. It would be cleaner to add a general concept to relationships
// what is ugly about this? we calculate the bounding box of the whole relationship (relationship + description) here, but do not use it to display the message
// it is also calculated in the components which display the description on the relationship
// at some point, when the compatibility cannot be maintained anyway, we should change this
var UMLRelationshipCenteredDescription = /** @class */ (function (_super) {
    tslib_1.__extends(UMLRelationshipCenteredDescription, _super);
    function UMLRelationshipCenteredDescription() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UMLRelationshipCenteredDescription.prototype.render = function (canvas, source, target) {
        _super.prototype.render.call(this, canvas, source, target);
        if (this.name) {
            var pathBounds = this.bounds;
            var descriptionPosition = new point_1.Point(0, 0);
            var direction = 'v';
            var path = this.path.map(function (point) { return new point_1.Point(point.x, point.y); });
            var distance = path.reduce(function (length, point, i, points) {
                return i + 1 < points.length ? length + points[i + 1].subtract(point).length : length;
            }, 0) / 2;
            for (var index = 0; index < path.length - 1; index++) {
                var vector = path[index + 1].subtract(path[index]);
                if (vector.length > distance) {
                    var norm = vector.normalize();
                    direction = Math.abs(norm.x) > Math.abs(norm.y) ? 'h' : 'v';
                    descriptionPosition = path[index].add(norm.scale(distance));
                    break;
                }
                distance -= vector.length;
            }
            // add this to make the messagePosition absolute and not relative to path origin
            descriptionPosition = descriptionPosition.add(pathBounds.x, pathBounds.y);
            var descriptionSize = text_1.Text.size(canvas, this.name);
            // subtracting DIAGRAM_MARGIN from y only works, because we do not use these values to display the description
            var descriptionBoundingBox = {
                bounds: {
                    x: direction === 'v' ? descriptionPosition.x + 5 : descriptionPosition.x - descriptionSize.width / 2,
                    y: 'v' ? descriptionPosition.y - uml_diagram_1.DIAGRAM_MARGIN : descriptionPosition.y,
                    width: descriptionSize.width,
                    height: descriptionSize.height,
                },
            };
            this.bounds = (0, boundary_1.computeBoundingBoxForElements)([this, descriptionBoundingBox]);
            var horizontalTranslation_1 = pathBounds.x - this.bounds.x;
            var verticalTranslation_1 = pathBounds.y - this.bounds.y;
            // translation of path points, because they are relative to their own bounding box
            // the bounding may be different now -> translation to correct this
            this.path.forEach(function (point) {
                point.x += horizontalTranslation_1;
                point.y += verticalTranslation_1;
            });
        }
        return [this];
    };
    return UMLRelationshipCenteredDescription;
}(uml_relationship_1.UMLRelationship));
exports.UMLRelationshipCenteredDescription = UMLRelationshipCenteredDescription;
//# sourceMappingURL=uml-relationship-centered-description.js.map