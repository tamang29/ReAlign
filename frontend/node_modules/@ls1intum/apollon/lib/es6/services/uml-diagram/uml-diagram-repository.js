import { UMLDiagramType } from '../../packages/diagram-type';
import { UMLDiagram } from './uml-diagram';
export const UMLDiagramRepository = {
    isUMLDiagram: (element) => element.type in UMLDiagramType,
    get: (element) => {
        if (!element || !UMLDiagramRepository.isUMLDiagram(element)) {
            return null;
        }
        return new UMLDiagram(element);
    },
    append: (id) => (dispatch, getState) => {
        dispatch({
            type: "@@element/diagram/APPEND" /* UMLDiagramActionTypes.APPEND */,
            payload: { ids: Array.isArray(id) ? id : [id] },
            undoable: false,
        });
    },
    bringToFront: (elementId) => (dispatch, getState) => {
        const ids = (Array.isArray(elementId) ? elementId : [elementId]).filter((id) => getState().diagram.ownedElements.includes(id));
        dispatch({
            type: "@@element/diagram/BRING_TO_FRONT" /* UMLDiagramActionTypes.BRING_TO_FRONT */,
            payload: { ids },
            undoable: false,
        });
    },
};
//# sourceMappingURL=uml-diagram-repository.js.map