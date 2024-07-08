import { call, put, select, take } from 'redux-saga/effects';
import { isInternal, run } from '../../utils/actions/sagas';
import { filterRoots } from '../../utils/geometry/tree';
import { render } from '../layouter/layouter';
export function* UMLElementSaga() {
    yield run([makeInteractable, renderAfterUpdate, renderWhileResize]);
}
function* makeInteractable() {
    yield take("@@element/interactable/SELECT" /* InteractableActionTypes.SELECT */);
    const { interactive, elements } = yield select();
    const roots = filterRoots(interactive, elements);
    const difference = interactive.filter((x) => !roots.includes(x));
    yield put({
        type: "@@element/interactable/DESELECT" /* InteractableActionTypes.DESELECT */,
        payload: { ids: difference },
        undoable: false,
    });
}
function* renderAfterUpdate() {
    const action = yield take("@@element/UPDATE" /* UMLElementActionTypes.UPDATE */);
    if (isInternal(action)) {
        return;
    }
    for (const value of action.payload.values) {
        yield call(render, value.id);
    }
}
function* renderWhileResize() {
    const action = yield take("@@element/resizable/RESIZE" /* ResizingActionTypes.RESIZE */);
    if (isInternal(action)) {
        return;
    }
    for (const id of action.payload.ids) {
        yield call(render, id);
    }
}
//# sourceMappingURL=uml-element-saga.js.map