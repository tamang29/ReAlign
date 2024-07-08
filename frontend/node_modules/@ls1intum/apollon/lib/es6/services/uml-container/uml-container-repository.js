import { UMLElements } from '../../packages/uml-elements';
import { UMLDiagramRepository } from '../uml-diagram/uml-diagram-repository';
import { UMLElement } from '../uml-element/uml-element';
import { UMLRelationship } from '../uml-relationship/uml-relationship';
import { UMLContainer } from './uml-container';
export const UMLContainerRepository = {
    get: (element) => {
        if (!element) {
            return null;
        }
        if (UMLDiagramRepository.isUMLDiagram(element)) {
            return UMLDiagramRepository.get(element);
        }
        if (UMLContainer.isUMLContainer(element)) {
            const Classifier = UMLElements[element.type];
            return new Classifier(element);
        }
        return null;
    },
    append: (id, owner) => (dispatch, getState) => {
        const ids = Array.isArray(id) ? id : [id];
        const { elements, diagram } = getState();
        const rels = ids.filter((x) => UMLRelationship.isUMLRelationship(elements[x]));
        if (rels.length) {
            dispatch({
                type: "@@element/diagram/APPEND" /* UMLDiagramActionTypes.APPEND */,
                payload: { ids: rels },
                undoable: false,
            });
        }
        const eles = ids.filter((x) => UMLElement.isUMLElement(elements[x]));
        if (eles.length) {
            dispatch({
                type: "@@element/container/APPEND" /* UMLContainerActionTypes.APPEND */,
                payload: { ids: eles, owner: owner || diagram.id },
                undoable: false,
            });
        }
    },
    remove: (id) => ({
        type: "@@element/container/REMOVE" /* UMLContainerActionTypes.REMOVE */,
        payload: { ids: Array.isArray(id) ? id : [id] },
        undoable: true,
    }),
};
//# sourceMappingURL=uml-container-repository.js.map