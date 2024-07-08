"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLAssociation = void 0;
var tslib_1 = require("tslib");
var uml_element_port_1 = require("../../../services/uml-element/uml-element-port");
var uml_relationship_1 = require("../../../services/uml-relationship/uml-relationship");
var assign_1 = require("../../../utils/fx/assign");
var boundary_1 = require("../../../utils/geometry/boundary");
var uml_association_component_1 = require("./uml-association-component");
var text_1 = require("../../../utils/svg/text");
var point_1 = require("../../../utils/geometry/point");
var textWithLayoutPropertiesToBounds = function (layer, anchor, text, layoutOptions) {
    var textSize = text_1.Text.size(layer, text, { textAnchor: layoutOptions.textAnchor });
    return {
        bounds: {
            x: anchor.x +
                (layoutOptions.textAnchor === 'end' ? -textSize.width : 0) +
                (layoutOptions.dx ? layoutOptions.dx : 0),
            y: anchor.y + (layoutOptions.dy ? layoutOptions.dy : 0),
            width: textSize.width,
            height: textSize.height,
        },
    };
};
var UMLAssociation = /** @class */ (function (_super) {
    tslib_1.__extends(UMLAssociation, _super);
    function UMLAssociation(values) {
        var _this = _super.call(this) || this;
        _this.source = {
            direction: uml_element_port_1.Direction.Up,
            element: '',
            multiplicity: '',
            role: '',
        };
        _this.target = {
            direction: uml_element_port_1.Direction.Up,
            element: '',
            multiplicity: '',
            role: '',
        };
        (0, assign_1.assign)(_this, values);
        return _this;
    }
    UMLAssociation.prototype.render = function (canvas, source, target) {
        _super.prototype.render.call(this, canvas, source, target);
        // TODO: hacky way of computing bounding box, should follow layoutable (make connection text layoutable)
        var pathBounds = this.bounds;
        // multiplicity
        var sourceMultiplicity = (0, uml_association_component_1.layoutTextForUMLAssociation)(this.source.direction, 'BOTTOM');
        var targetMultiplicity = (0, uml_association_component_1.layoutTextForUMLAssociation)(this.target.direction, 'BOTTOM');
        // roles
        var sourceRole = (0, uml_association_component_1.layoutTextForUMLAssociation)(this.source.direction, 'TOP');
        var targetRole = (0, uml_association_component_1.layoutTextForUMLAssociation)(this.target.direction, 'TOP');
        // calculate anchor points
        // anchor point = endOfPath + this.position
        var marker = (0, uml_association_component_1.getMarkerForTypeForUMLAssociation)(this.type);
        var path = this.path.map(function (point) { return new point_1.Point(point.x, point.y); });
        var sourceAnchor = (0, uml_association_component_1.computeTextPositionForUMLAssociation)(path).add(this.bounds.x, this.bounds.y);
        var targetAnchor = (0, uml_association_component_1.computeTextPositionForUMLAssociation)(path.reverse(), !!marker).add(this.bounds.x, this.bounds.y);
        var boundingElements = [
            textWithLayoutPropertiesToBounds(canvas, sourceAnchor, this.source.multiplicity, sourceMultiplicity),
            textWithLayoutPropertiesToBounds(canvas, targetAnchor, this.target.multiplicity, targetMultiplicity),
            textWithLayoutPropertiesToBounds(canvas, sourceAnchor, this.source.role, sourceRole),
            textWithLayoutPropertiesToBounds(canvas, targetAnchor, this.target.role, targetRole),
        ];
        this.bounds = (0, boundary_1.computeBoundingBoxForElements)(tslib_1.__spreadArray([this], tslib_1.__read(boundingElements), false));
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
    return UMLAssociation;
}(uml_relationship_1.UMLRelationship));
exports.UMLAssociation = UMLAssociation;
//# sourceMappingURL=uml-association.js.map