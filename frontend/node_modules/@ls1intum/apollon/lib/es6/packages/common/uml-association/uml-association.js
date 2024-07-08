import { Direction } from '../../../services/uml-element/uml-element-port';
import { UMLRelationship } from '../../../services/uml-relationship/uml-relationship';
import { assign } from '../../../utils/fx/assign';
import { computeBoundingBoxForElements } from '../../../utils/geometry/boundary';
import { computeTextPositionForUMLAssociation, getMarkerForTypeForUMLAssociation, layoutTextForUMLAssociation, } from './uml-association-component';
import { Text } from '../../../utils/svg/text';
import { Point } from '../../../utils/geometry/point';
const textWithLayoutPropertiesToBounds = (layer, anchor, text, layoutOptions) => {
    const textSize = Text.size(layer, text, { textAnchor: layoutOptions.textAnchor });
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
export class UMLAssociation extends UMLRelationship {
    constructor(values) {
        super();
        this.source = {
            direction: Direction.Up,
            element: '',
            multiplicity: '',
            role: '',
        };
        this.target = {
            direction: Direction.Up,
            element: '',
            multiplicity: '',
            role: '',
        };
        assign(this, values);
    }
    render(canvas, source, target) {
        super.render(canvas, source, target);
        // TODO: hacky way of computing bounding box, should follow layoutable (make connection text layoutable)
        const pathBounds = this.bounds;
        // multiplicity
        const sourceMultiplicity = layoutTextForUMLAssociation(this.source.direction, 'BOTTOM');
        const targetMultiplicity = layoutTextForUMLAssociation(this.target.direction, 'BOTTOM');
        // roles
        const sourceRole = layoutTextForUMLAssociation(this.source.direction, 'TOP');
        const targetRole = layoutTextForUMLAssociation(this.target.direction, 'TOP');
        // calculate anchor points
        // anchor point = endOfPath + this.position
        const marker = getMarkerForTypeForUMLAssociation(this.type);
        const path = this.path.map((point) => new Point(point.x, point.y));
        const sourceAnchor = computeTextPositionForUMLAssociation(path).add(this.bounds.x, this.bounds.y);
        const targetAnchor = computeTextPositionForUMLAssociation(path.reverse(), !!marker).add(this.bounds.x, this.bounds.y);
        const boundingElements = [
            textWithLayoutPropertiesToBounds(canvas, sourceAnchor, this.source.multiplicity, sourceMultiplicity),
            textWithLayoutPropertiesToBounds(canvas, targetAnchor, this.target.multiplicity, targetMultiplicity),
            textWithLayoutPropertiesToBounds(canvas, sourceAnchor, this.source.role, sourceRole),
            textWithLayoutPropertiesToBounds(canvas, targetAnchor, this.target.role, targetRole),
        ];
        this.bounds = computeBoundingBoxForElements([this, ...boundingElements]);
        const horizontalTranslation = pathBounds.x - this.bounds.x;
        const verticalTranslation = pathBounds.y - this.bounds.y;
        // translation of path points, because they are relative to their own bounding box
        // the bounding may be different now -> translation to correct this
        this.path.forEach((point) => {
            point.x += horizontalTranslation;
            point.y += verticalTranslation;
        });
        return [this];
    }
}
//# sourceMappingURL=uml-association.js.map