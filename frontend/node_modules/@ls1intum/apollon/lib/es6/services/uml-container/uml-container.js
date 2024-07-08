import { assign } from '../../utils/fx/assign';
import { UMLElement } from '../uml-element/uml-element';
export class UMLContainer extends UMLElement {
    constructor(values) {
        super();
        this.ownedElements = [];
        assign(this, values);
    }
    /**
     * reorders children -> default, do nothing
     */
    reorderChildren(children) {
        return children.map((child) => child.id);
    }
    /** Serializes an `UMLElement` to an `Apollon.UMLElement` */
    serialize(children) {
        return {
            ...super.serialize(children),
            type: this.type,
        };
    }
    deserialize(values, children = []) {
        super.deserialize(values);
        this.ownedElements = children.map((child) => child.id);
    }
}
UMLContainer.features = { ...UMLElement.features, droppable: true };
UMLContainer.isUMLContainer = (element) => 'ownedElements' in element;
//# sourceMappingURL=uml-container.js.map