import { UMLDiagramType } from '../../packages/diagram-type';
import { assign } from '../../utils/fx/assign';
import { UMLContainer } from '../uml-container/uml-container';
export const DIAGRAM_MARGIN = 40;
export class UMLDiagram extends UMLContainer {
    constructor(values) {
        super();
        this.type = UMLDiagramType.ClassDiagram;
        this.ownedRelationships = [];
        this.bounds = { ...this.bounds, width: 0, height: 0 };
        assign(this, values);
    }
    render(canvas, children = []) {
        // calculates the most distant svg point from diagram center
        const size = children.reduce((max, element) => ({
            width: Math.max(Math.abs(element.bounds.x), Math.abs(element.bounds.x + element.bounds.width), max.width),
            height: Math.max(Math.abs(element.bounds.y), Math.abs(element.bounds.y + element.bounds.height), max.height),
        }), { width: 0, height: 0 });
        // updates diagram bound
        // sets origin to new location
        // make size at least 2 times most distant point -> all points are inside the diagram
        this.bounds = {
            x: -size.width - DIAGRAM_MARGIN,
            y: -size.height - DIAGRAM_MARGIN,
            width: size.width * 2 + DIAGRAM_MARGIN,
            height: size.height * 2 + DIAGRAM_MARGIN,
        };
        return [this];
    }
}
//# sourceMappingURL=uml-diagram.js.map