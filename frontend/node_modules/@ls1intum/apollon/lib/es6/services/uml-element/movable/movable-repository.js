import { UMLElements } from '../../../packages/uml-elements';
import { UMLRelationships } from '../../../packages/uml-relationships';
import { filterRoots } from '../../../utils/geometry/tree';
import { UMLDiagramRepository } from '../../uml-diagram/uml-diagram-repository';
// when moving an element, it is copied from the elements of the redux state and handled in the moving state separately
// we do this, because it enables us to not do a full shallow copy of all elements in the state, when a pointer move event is triggered
// but just update the position of elements which are actually moved
// that is why there is the the separation of movable and moving reducer
export const Movable = {
    startMoving: (id) => (dispatch, getState) => {
        const { elements, selected } = getState();
        const ids = id ? (Array.isArray(id) ? id : [id]) : filterRoots(selected, elements);
        const movables = [];
        const constructors = { ...UMLElements, ...UMLRelationships };
        for (const i of ids) {
            const feature = constructors[elements[i].type].features;
            if (feature.movable) {
                movables.push(i);
            }
        }
        if (!movables.length) {
            return;
        }
        dispatch(UMLDiagramRepository.bringToFront(ids));
        dispatch({
            type: "@@element/movable/START" /* MovableActionTypes.START */,
            payload: { ids: movables },
            undoable: true,
        });
    },
    move: (delta, id) => (dispatch, getState) => {
        const ids = id ? (Array.isArray(id) ? id : [id]) : getState().moving;
        if (!ids.length) {
            return;
        }
        dispatch({
            type: "@@element/movable/MOVE" /* MovingActionTypes.MOVE */,
            payload: { ids, delta },
            undoable: false,
        });
    },
    endMoving: (id, keyboard = false) => (dispatch, getState) => {
        const ids = id ? (Array.isArray(id) ? id : [id]) : getState().moving;
        if (!ids.length) {
            return;
        }
        dispatch({
            type: "@@element/movable/END" /* MovableActionTypes.END */,
            payload: { ids, keyboard },
            undoable: false,
        });
    },
};
//# sourceMappingURL=movable-repository.js.map