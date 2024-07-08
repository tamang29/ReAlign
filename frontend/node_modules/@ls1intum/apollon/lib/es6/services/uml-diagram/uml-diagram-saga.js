import { getContext, put, select, take, takeLatest } from 'redux-saga/effects';
import { run } from '../../utils/actions/sagas';
import { notEmpty } from '../../utils/not-empty';
import { ApollonMode } from '../editor/editor-types';
import { UMLElementRepository } from '../uml-element/uml-element-repository';
import { UMLRelationshipRepository } from '../uml-relationship/uml-relationship-repository';
import { UMLDiagramRepository } from './uml-diagram-repository';
export function* UMLDiagramSaga() {
    yield run([selectRelationship, resizeAfterConnectionChange]);
}
function* selectRelationship() {
    const action = yield take("@@element/selectable/SELECT" /* SelectableActionTypes.SELECT */);
    const { diagram, editor } = yield select();
    if (editor.readonly || editor.mode === ApollonMode.Assessment) {
        return;
    }
    const ids = action.payload.ids.filter((id) => diagram.ownedRelationships.includes(id));
    if (!ids.length) {
        return;
    }
    yield put({
        type: "@@element/diagram/APPEND" /* UMLDiagramActionTypes.APPEND */,
        payload: { ids },
        undoable: false,
    });
}
function* resizeAfterConnectionChange() {
    yield takeLatest(["@@element/connectable/END" /* ConnectableActionTypes.END */, "@@element/reconnectable/END" /* ReconnectableActionTypes.END */, "@@element/updatable/END" /* UpdatableActionTypes.END */], resize);
}
function* resize() {
    const layer = yield getContext('layer');
    const { elements, diagram } = yield select();
    const children = [
        ...diagram.ownedElements.map((id) => UMLElementRepository.get(elements[id])),
        ...diagram.ownedRelationships.map((id) => UMLRelationshipRepository.get(elements[id])),
    ].filter(notEmpty);
    const container = UMLDiagramRepository.get(diagram);
    if (!container) {
        return;
    }
    const [updates] = container.render(layer, children);
    const delta = {
        width: updates.bounds.width - diagram.bounds.width,
        height: updates.bounds.height - diagram.bounds.height,
    };
    yield put({
        type: "@@element/resizable/RESIZE" /* ResizingActionTypes.RESIZE */,
        payload: { ids: [diagram.id], delta },
        undoable: false,
    });
}
//# sourceMappingURL=uml-diagram-saga.js.map