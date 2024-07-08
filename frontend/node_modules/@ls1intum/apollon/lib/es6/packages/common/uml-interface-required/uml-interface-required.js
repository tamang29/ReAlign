import { UMLRelationship } from '../../../services/uml-relationship/uml-relationship';
import { DeploymentRelationshipType } from '../../uml-deployment-diagram';
import { ComponentRelationshipType } from '../../uml-component-diagram';
import { computeBoundingBoxForElements } from '../../../utils/geometry/boundary';
import { Point } from '../../../utils/geometry/point';
import { REQUIRED_INTERFACE_MARKER_SIZE } from './uml-interface-requires-constants';
export class UMLInterfaceRequired extends UMLRelationship {
    render(canvas, source, target) {
        super.render(canvas, source, target);
        const pathBounds = this.bounds;
        // calculate end of path
        const lastPathPoint = this.path[this.path.length - 1];
        const pathEnd = new Point(this.bounds.x, this.bounds.y).add(lastPathPoint.x, lastPathPoint.y);
        // calculate marker bounding box
        const markerBoundingBox = {
            bounds: {
                x: pathEnd.x - Math.floor(REQUIRED_INTERFACE_MARKER_SIZE / 2),
                y: pathEnd.y - Math.floor(REQUIRED_INTERFACE_MARKER_SIZE / 2),
                width: REQUIRED_INTERFACE_MARKER_SIZE,
                height: REQUIRED_INTERFACE_MARKER_SIZE,
            },
        };
        this.bounds = computeBoundingBoxForElements([this, markerBoundingBox]);
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
UMLInterfaceRequired.features = { ...UMLRelationship.features, variable: false };
UMLInterfaceRequired.isUMLInterfaceRequired = (element) => {
    return (UMLInterfaceRequired.isUMLRelationship(element) &&
        (element.type === DeploymentRelationshipType.DeploymentInterfaceRequired ||
            element.type === ComponentRelationshipType.ComponentInterfaceRequired));
};
//# sourceMappingURL=uml-interface-required.js.map