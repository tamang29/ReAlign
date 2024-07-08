import { UMLContainer } from '../../services/uml-container/uml-container';
export function filterRoots(ids, elements) {
    const getSelection = (root) => {
        if (ids.includes(root.id))
            return [root.id];
        if (UMLContainer.isUMLContainer(root)) {
            return root.ownedElements.reduce((selection, id) => [...selection, ...getSelection(elements[id])], []);
        }
        return [];
    };
    return Object.values(elements)
        .filter((element) => !element.owner)
        .reduce((selection, element) => [...selection, ...getSelection(element)], []);
}
/**
 * returns the ids of all elements in the hierarchy above the element with the specified id
 * @param id element id which parents should be found
 * @param elements elements in state
 */
export function getAllParents(id, elements) {
    const getParents = (element) => {
        // reached top
        if (element.owner === null)
            return [];
        return [element.owner, ...getParents(elements[element.owner])];
    };
    return getParents(elements[id]);
}
export function getChildren(ids, elements) {
    const result = [];
    for (const id of ids) {
        const owner = elements[id];
        if (!owner)
            continue;
        if (UMLContainer.isUMLContainer(owner)) {
            result.push(...getChildren(owner.ownedElements, elements));
        }
        result.push(owner.id);
    }
    return result;
}
export function clone(element, elements) {
    if (!UMLContainer.isUMLContainer(element)) {
        return [element.clone()];
    }
    const result = [];
    const cloned = element.clone();
    const { ownedElements } = element;
    for (const id of ownedElements) {
        const child = elements.find((prev) => prev.id === id);
        if (!child) {
            continue;
        }
        const [clonedChild, ...clonedChildren] = clone(child, elements);
        clonedChild.owner = cloned.id;
        const index = cloned.ownedElements.findIndex((x) => x === id);
        cloned.ownedElements[index] = clonedChild.id;
        result.push(clonedChild, ...clonedChildren);
    }
    return [cloned, ...result];
}
//# sourceMappingURL=tree.js.map