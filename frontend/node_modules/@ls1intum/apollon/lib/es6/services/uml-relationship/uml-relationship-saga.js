import { all, call, getContext, put, select, take } from 'redux-saga/effects';
import { run } from '../../utils/actions/sagas';
import { diff } from '../../utils/fx/diff';
import { UMLElementRepository } from '../uml-element/uml-element-repository';
import { UMLRelationship } from './uml-relationship';
import { UMLRelationshipRepository } from './uml-relationship-repository';
import { UMLRelationshipType } from '../../packages/uml-relationship-type';
import { UMLDiagramRepository } from '../uml-diagram/uml-diagram-repository';
import { notEmpty } from '../../utils/not-empty';
export function* UMLRelationshipSaga() {
    yield run([create, reconnect, update, layoutElement, layoutRelationship, deleteElement]);
}
function* create() {
    const action = yield take("@@element/CREATE" /* UMLElementActionTypes.CREATE */);
    for (const value of action.payload.values) {
        yield call(recalc, value.id);
    }
}
function* reconnect() {
    const action = yield take("@@element/reconnectable/RECONNECT" /* ReconnectableActionTypes.RECONNECT */);
    for (const connection of action.payload.connections) {
        yield call(recalc, connection.id);
    }
}
function* layoutRelationship() {
    const action = yield take("@@relationship/waypoints/END" /* UMLRelationshipActionTypes.ENDWAYPOINTSLAYOUT */);
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
function* update() {
    const action = yield take("@@element/UPDATE" /* UMLElementActionTypes.UPDATE */);
    const { elements } = yield select();
    for (const value of action.payload.values) {
        if (!UMLRelationship.isUMLRelationship(elements[value.id])) {
            continue;
        }
        yield call(recalc, value.id);
    }
}
function* layoutElement() {
    const action = yield take(["@@element/movable/MOVE" /* MovingActionTypes.MOVE */, "@@element/resizable/RESIZE" /* ResizingActionTypes.RESIZE */]);
    const { elements } = yield select();
    const relationships = Object.values(elements).filter((x) => UMLRelationship.isUMLRelationship(x));
    const updates = [];
    loop: for (const relationship of relationships) {
        let source = relationship.source.element;
        while (source) {
            if (action.payload.ids.includes(source)) {
                updates.push(relationship.id);
                continue loop;
            }
            source = elements[source].owner;
        }
        let target = relationship.target.element;
        while (target) {
            if (action.payload.ids.includes(target)) {
                updates.push(relationship.id);
                continue loop;
            }
            target = elements[target].owner;
        }
    }
    for (const id of [...new Set([...updates])]) {
        yield call(recalc, id);
    }
}
function* deleteElement() {
    const action = yield take("@@element/DELETE" /* UMLElementActionTypes.DELETE */);
    const { elements } = yield select();
    const relationships = Object.values(elements)
        .filter((x) => UMLRelationship.isUMLRelationship(x))
        .filter((relationship) => action.payload.ids.includes(relationship.source.element) ||
        action.payload.ids.includes(relationship.target.element))
        .map((relationship) => relationship.id);
    yield all([
        put({
            type: "@@element/container/REMOVE" /* UMLContainerActionTypes.REMOVE */,
            payload: { ids: relationships },
            undoable: false,
        }),
        put({
            type: "@@element/DELETE" /* UMLElementActionTypes.DELETE */,
            payload: { ids: relationships },
            undoable: false,
        }),
    ]);
}
export function* recalc(id) {
    const { elements, selected, editor } = yield select();
    const layer = yield getContext('layer');
    const relationship = UMLRelationshipRepository.get(elements[id]);
    if (!relationship) {
        return;
    }
    const source = UMLElementRepository.get(elements[relationship.source.element]);
    const target = UMLElementRepository.get(elements[relationship.target.element]);
    if (!source || !target) {
        return;
    }
    const sourcePosition = yield put(UMLElementRepository.getAbsolutePosition(relationship.source.element));
    source.bounds = { ...source.bounds, ...sourcePosition };
    const targetPosition = yield put(UMLElementRepository.getAbsolutePosition(relationship.target.element));
    target.bounds = { ...target.bounds, ...targetPosition };
    const original = elements[id];
    const [updates] = relationship.render(layer, source, target);
    const { path, bounds } = diff(original, updates);
    if (path) {
        if (relationship.isManuallyLayouted && shouldPreserveLayout(source.id, target.id, selected, editor.readonly)) {
            yield put(UMLRelationshipRepository.layoutWaypoints(updates.id, original.path, { ...original.bounds, ...bounds }));
        }
        else {
            yield put(UMLRelationshipRepository.layout(updates.id, path, { ...original.bounds, ...bounds }));
        }
    }
    // layout messages of CommunicationLink
    if (updates.type === UMLRelationshipType.CommunicationLink) {
        yield put(UMLElementRepository.update(updates.id, updates));
    }
}
const shouldPreserveLayout = (sourceId, targetId, selected, isEditorReadOnly) => {
    return (selected.includes(sourceId) && selected.includes(targetId)) || isEditorReadOnly ? true : false;
};
//# sourceMappingURL=uml-relationship-saga.js.map