import { clone, filterRoots, getChildren } from '../../utils/geometry/tree';
import { notEmpty } from '../../utils/not-empty';
import { UMLElementRepository } from '../uml-element/uml-element-repository';
import { UMLElementsForDiagram } from '../../packages/uml-element-type';
import { UMLRelationshipRepository } from '../uml-relationship/uml-relationship-repository';
export class CopyRepository {
    static transformElementsForCopy(umlElements) {
        // roots in diagram Elements
        const roots = umlElements.filter((element) => !element.owner || umlElements.every((innerElement) => innerElement.id !== element.owner));
        const cloneMap = {};
        // flat map elements to copies
        const copies = roots.reduce((clonedElements, element) => {
            element.owner = null;
            element.bounds.x = element.bounds.x + 10 * CopyRepository.pasteCounter;
            element.bounds.y = element.bounds.y + 10 * CopyRepository.pasteCounter;
            const clones = clone(element, umlElements);
            cloneMap[element.id] = clones[0].id;
            return clonedElements.concat(...clones);
        }, []);
        // map elements to serializable elements
        return { copiedElements: copies.map((element) => ({ ...element })), cloneMap };
    }
    static transformRelationshipsForCopy(umlRelationships, cloneMap) {
        // roots in diagram Elements
        const roots = umlRelationships.filter((element) => !element.owner || umlRelationships.every((innerElement) => innerElement.id !== element.owner));
        // flat map elements to copies
        const copies = roots.reduce((clonedElements, element) => {
            element.owner = null;
            element.bounds.x = element.bounds.x + 10 * CopyRepository.pasteCounter;
            element.bounds.y = element.bounds.y + 10 * CopyRepository.pasteCounter;
            element.source.element = cloneMap[element.source.element];
            element.target.element = cloneMap[element.target.element];
            const newPath = element.path.map((pathPoint) => ({ x: pathPoint.x + 10, y: pathPoint.y + 10 }));
            element.path = [newPath[0], newPath[1], ...newPath.slice(2)];
            const clones = [element.cloneRelationship()];
            return clonedElements.concat(...clones);
        }, []);
        // map elements to serializable elements
        return copies.map((relationship) => ({ ...relationship }));
    }
}
/**
 * Counts how often paste commands are executed to set offset
 */
CopyRepository.pasteCounter = 0;
CopyRepository.copy = (id) => (dispatch, getState) => {
    CopyRepository.pasteCounter = 0;
    const { elements, selected } = getState();
    const ids = id ? (Array.isArray(id) ? id : [id]) : selected;
    // copy elements with all their child elements, because containers do not know their full children representation
    const idsToClone = getChildren(ids, getState().elements);
    const result = idsToClone
        .map((idToClone) => UMLElementRepository.get(elements[idToClone]))
        .filter(notEmpty);
    if (getState().editor.enableCopyPasteToClipboard) {
        navigator.clipboard.writeText(JSON.stringify(result));
        return;
    }
    else {
        return dispatch({
            type: "@@copy/COPY" /* CopyActionTypes.COPY */,
            payload: idsToClone,
            undoable: false,
        });
    }
};
CopyRepository.paste = () => (dispatch, getState) => {
    CopyRepository.pasteCounter++;
    if (getState().editor.enableCopyPasteToClipboard) {
        navigator.clipboard
            .readText()
            .then((value) => {
            const parsedElements = JSON.parse(value);
            const currentDiagramType = getState().diagram.type;
            // all elements must be supported Apollon elements and part of the current diagram type
            const diagramElements = parsedElements
                .map((x) => UMLElementRepository.get(x))
                .filter(notEmpty)
                .filter((element) => element.type in UMLElementsForDiagram[currentDiagramType]);
            return CopyRepository.transformElementsForCopy(diagramElements);
        })
            .then(({ copiedElements }) => {
            dispatch(UMLElementRepository.create(copiedElements));
            dispatch(UMLElementRepository.deselect());
            dispatch(UMLElementRepository.select(filterRoots(copiedElements.map((element) => element.id), getState().elements)));
        });
    }
    else {
        const { copy } = getState();
        dispatch({ type: "@@copy/PASTE" /* CopyActionTypes.PASTE */, payload: {}, undoable: false });
        const { elements } = getState();
        const elementsToCopy = copy
            .map((IdOfCopyElement) => UMLElementRepository.get(elements[IdOfCopyElement]))
            .filter(notEmpty);
        const relationshipsToCopy = copy
            .map((IdOfCopyElement) => UMLRelationshipRepository.get(elements[IdOfCopyElement]))
            .filter(notEmpty)
            .filter((relationship) => relationship.source &&
            relationship.target &&
            copy.includes(relationship.source.element) &&
            copy.includes(relationship.target.element));
        const { copiedElements, cloneMap } = CopyRepository.transformElementsForCopy(elementsToCopy);
        dispatch(UMLElementRepository.create(copiedElements));
        dispatch(UMLElementRepository.deselect());
        const copiedRelationships = CopyRepository.transformRelationshipsForCopy(relationshipsToCopy, cloneMap);
        dispatch(UMLElementRepository.create(copiedRelationships));
        dispatch(UMLElementRepository.select(filterRoots([...copiedElements, ...copiedRelationships].map((element) => element.id), getState().elements)));
    }
};
//# sourceMappingURL=copy-repository.js.map