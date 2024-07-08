import { UMLElements } from '../../packages/uml-elements';
import { Point } from '../../utils/geometry/point';
import { filterRoots, getChildren } from '../../utils/geometry/tree';
import { UMLContainer } from '../uml-container/uml-container';
import { UMLContainerRepository } from '../uml-container/uml-container-repository';
import { UMLElement } from './uml-element';
export const UMLElementCommonRepository = {
    /**
     * Creates new instances of `UMLElements`
     *
     * @param value - An array of new values for the instances to create.
     * @param [owner] - Specify the owner for the new elements.
     */
    create: (value, owner) => async (dispatch) => {
        const values = Array.isArray(value) ? value : [value];
        dispatch({
            type: "@@element/CREATE" /* UMLElementActionTypes.CREATE */,
            payload: { values },
            undoable: true,
        });
        const roots = values.filter((x) => !x.owner).map((x) => x.id);
        if (roots.length) {
            dispatch(UMLContainerRepository.append(roots, owner));
        }
    },
    /** Read an UMLElement */
    get: (element) => {
        if (!element) {
            return null;
        }
        if (UMLElement.isUMLElement(element)) {
            const Classifier = UMLElements[element.type];
            return new Classifier(element);
        }
        return null;
    },
    /** Read an UMLElement by id */
    getById: (id) => (dispatch, getState) => {
        const { elements } = getState();
        return UMLElementCommonRepository.get(elements[id]);
    },
    /** Update existing elements */
    update: (id, values) => ({
        type: "@@element/UPDATE" /* UMLElementActionTypes.UPDATE */,
        payload: { values: (Array.isArray(id) ? id : [id]).map((i) => ({ id: i, ...values })) },
        undoable: false,
    }),
    /** Delete existing elements */
    delete: (id) => (dispatch, getState) => {
        const { elements, selected } = getState();
        const ids = id ? (Array.isArray(id) ? id : [id]) : selected;
        const roots = filterRoots(ids, elements);
        if (!roots.length) {
            return;
        }
        dispatch(UMLContainerRepository.remove(roots));
        dispatch({
            type: "@@element/DELETE" /* UMLElementActionTypes.DELETE */,
            payload: { ids: getChildren(roots, elements) },
            undoable: false,
        });
    },
    /** Composes the absolute position of an element */
    getAbsolutePosition: (id) => (dispatch, getState) => {
        const { elements } = getState();
        // if the element is currently moving the position update is only done in moving redux state
        // thus take the elements from moving to calculate absolute position
        let element = elements[id];
        let position = new Point(element.bounds.x, element.bounds.y);
        while (element.owner) {
            element = elements[element.owner];
            position = position.add(element.bounds.x, element.bounds.y);
        }
        return position;
    },
    getChildren: (id) => (dispatch, getState) => {
        const { elements } = getState();
        const owner = elements[id];
        if (!owner) {
            return [];
        }
        if (UMLContainer.isUMLContainer(owner)) {
            return owner.ownedElements.reduce((acc, element) => [...acc, ...dispatch(UMLElementCommonRepository.getChildren(element))], [owner]);
        }
        return [owner];
    },
};
//# sourceMappingURL=uml-element-common-repository.js.map