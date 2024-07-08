import { call, delay, getContext, put, select, take } from 'redux-saga/effects';
import { run } from '../../utils/actions/sagas';
import { diff } from '../../utils/fx/diff';
import { notEmpty } from '../../utils/not-empty';
import { UMLContainer } from '../uml-container/uml-container';
import { UMLContainerRepository } from '../uml-container/uml-container-repository';
import { UMLDiagramRepository } from '../uml-diagram/uml-diagram-repository';
import { UMLElement } from '../uml-element/uml-element';
import { UMLElementRepository } from '../uml-element/uml-element-repository';
import { UMLRelationship } from '../uml-relationship/uml-relationship';
import { UMLRelationshipRepository } from '../uml-relationship/uml-relationship-repository';
import { recalc } from '../uml-relationship/uml-relationship-saga';
export function* Layouter() {
    yield run([layout]);
}
function* layout() {
    const action = yield take("@@layouter/LAYOUT" /* LayouterActionTypes.LAYOUT */);
    const layer = yield getContext('layer');
    const { elements, diagram } = yield select();
    const ids = Object.values(elements)
        .filter((x) => !x.owner)
        .map((x) => x.id);
    if (!ids.length) {
        return;
    }
    yield put(UMLContainerRepository.append(ids));
    for (const id of Object.keys(elements)) {
        yield delay(0);
        if (UMLElement.isUMLElement(elements[id])) {
            yield call(render, id);
        }
        if (UMLRelationship.isUMLRelationship(elements[id]) && !elements[id].isManuallyLayouted) {
            yield call(recalc, id);
        }
    }
}
function* renderDiagram() {
    const { elements, diagram: original } = yield select();
    const canvas = yield getContext('layer');
    const diagram = UMLDiagramRepository.get(original);
    const children = [
        ...diagram.ownedElements.map((x) => UMLElementRepository.get(elements[x])),
        ...diagram.ownedRelationships.map((x) => UMLRelationshipRepository.get(elements[x])),
    ].filter(notEmpty);
    return diagram.render(canvas, children);
}
function* renderContainer(id) {
    const { elements } = yield select();
    const canvas = yield getContext('layer');
    const container = UMLContainerRepository.get(elements[id]);
    const children = container.ownedElements.map((x) => UMLElementRepository.get(elements[x])).filter(notEmpty);
    return container.render(canvas, children);
}
function* renderElement(id) {
    const { elements } = yield select();
    const canvas = yield getContext('layer');
    const element = UMLElementRepository.get(elements[id]);
    return element.render(canvas);
}
export function* render(id) {
    const { elements, diagram } = yield select();
    const state = { ...elements, [diagram.id]: diagram };
    let updates = [];
    if (UMLDiagramRepository.isUMLDiagram(state[id])) {
        updates = yield call(renderDiagram);
    }
    else if (UMLContainer.isUMLContainer(state[id])) {
        updates = yield call(renderContainer, id);
    }
    else if (UMLElement.isUMLElement(state[id])) {
        updates = yield call(renderElement, id);
    }
    if (!updates.length) {
        return;
    }
    for (const [index, update] of updates.entries()) {
        const original = state[update.id];
        const size = {
            width: update.bounds.width - original.bounds.width,
            height: update.bounds.height - original.bounds.height,
        };
        if (Object.values(size).some((x) => x !== 0)) {
            yield put({
                type: "@@element/resizable/RESIZE" /* ResizingActionTypes.RESIZE */,
                payload: {
                    ids: [update.id],
                    resizeFrom: update.resizeFrom,
                    delta: size,
                },
                undoable: false,
            });
        }
        if (UMLDiagramRepository.isUMLDiagram(update)) {
            continue;
        }
        const position = {
            x: update.bounds.x - original.bounds.x,
            y: update.bounds.y - original.bounds.y,
        };
        if (Object.values(position).some((x) => x !== 0)) {
            yield put({
                type: "@@element/movable/MOVE" /* MovingActionTypes.MOVE */,
                payload: { ids: [update.id], delta: position },
                undoable: false,
            });
        }
        if (index === 0) {
            // TODO: this is constantly causing problems, not sure what it is needed for, once we have more test cases we can try to remove it
            const { id: _, name, owner, type, bounds, ownedElements, ...difference } = diff(original, update);
            if (Object.keys(difference).length) {
                yield put(UMLElementRepository.update(update.id, { ...difference }));
            }
            yield call(render, update.owner || diagram.id);
        }
    }
}
//# sourceMappingURL=layouter.js.map