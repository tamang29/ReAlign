import { UMLRelationshipType } from '../../packages/uml-relationship-type';
import { assign } from '../../utils/fx/assign';
import { UMLElement } from '../uml-element/uml-element';
import { Direction } from '../uml-element/uml-element-port';
import { Connection } from './connection';
import { uuid } from '../../utils/uuid';
export class UMLRelationship extends UMLElement {
    constructor(values) {
        super();
        this.path = [
            { x: 0, y: 0 },
            { x: 200, y: 100 },
        ];
        this.source = {
            direction: Direction.Up,
            element: '',
        };
        this.target = {
            direction: Direction.Up,
            element: '',
        };
        assign(this, values);
    }
    serialize() {
        return {
            ...super.serialize(),
            type: this.type,
            path: this.path,
            source: this.source,
            target: this.target,
            isManuallyLayouted: this.isManuallyLayouted,
        };
    }
    deserialize(values, children) {
        const assert = (v) => v.type in UMLRelationshipType;
        if (!assert(values)) {
            return;
        }
        super.deserialize(values);
        this.type = values.type;
        this.path = values.path;
        this.source = values.source;
        this.target = values.target;
        this.isManuallyLayouted = values.isManuallyLayouted;
    }
    render(canvas, source, target) {
        if (!source || !target) {
            return [this];
        }
        const { straight, variable } = this.constructor.features;
        const path = Connection.computePath({ element: source, direction: this.source.direction }, { element: target, direction: this.target.direction }, { isStraight: straight, isVariable: variable });
        const x = Math.min(...path.map((point) => point.x));
        const y = Math.min(...path.map((point) => point.y));
        const width = Math.max(Math.max(...path.map((point) => point.x)) - x, 1);
        const height = Math.max(Math.max(...path.map((point) => point.y)) - y, 1);
        this.bounds = { x, y, width, height };
        this.path = path.map((point) => ({ x: point.x - x, y: point.y - y }));
        return [this];
    }
    /**
     * Clones an instance of `UMLRelationship`
     *
     * @param override - Override existing properties.
     */
    cloneRelationship(override) {
        const Constructor = this.constructor;
        const values = { ...this, ...override, id: uuid() };
        return new Constructor(values);
    }
}
UMLRelationship.features = {
    connectable: false,
    droppable: false,
    hoverable: true,
    movable: false,
    reconnectable: true,
    resizable: false,
    selectable: true,
    updatable: true,
    straight: false,
    variable: true,
    alternativePortVisualization: false,
};
UMLRelationship.isUMLRelationship = (element) => {
    return element.type in UMLRelationshipType;
};
//# sourceMappingURL=uml-relationship.js.map