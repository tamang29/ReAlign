import { call, delay, getContext, put, race, select, take } from 'redux-saga/effects';
import { UMLElements } from '../../packages/uml-elements';
import { run } from '../../utils/actions/sagas';
import { render } from '../layouter/layouter';
import { UMLContainer } from './uml-container';
import { UMLContainerRepository } from './uml-container-repository';
export function* UMLContainerSaga() {
    yield run([append, remove, appendAfterMove, renderAfterMove]);
}
function* append() {
    const action = yield take("@@element/container/APPEND" /* UMLContainerActionTypes.APPEND */);
    const { elements, diagram } = yield select();
    const state = { ...elements, [diagram.id]: diagram };
    const container = UMLContainerRepository.get(state[action.payload.owner]);
    if (!container) {
        return;
    }
    yield call(render, container.id);
}
function* remove() {
    const action = yield take("@@element/container/REMOVE" /* UMLContainerActionTypes.REMOVE */);
    const layer = yield getContext('layer');
    const { elements, diagram } = yield select();
    const state = { ...elements, [diagram.id]: diagram };
    const owners = [
        ...new Set(action.payload.ids.filter((id) => id in state).map((id) => state[id].owner || diagram.id)),
    ];
    for (const owner of owners) {
        yield call(render, owner);
    }
}
function* appendAfterMove() {
    const action = yield take("@@element/movable/END" /* MovableActionTypes.END */);
    const { elements, hovered } = yield select();
    let containerID = null;
    if (hovered.length) {
        const container = elements[hovered[0]];
        if (!container ||
            !UMLContainer.isUMLContainer(container) ||
            !UMLElements[container.type].features.droppable) {
            return;
        }
        containerID = container.id;
    }
    const movedElements = action.payload.ids.filter((id) => elements[id].owner !== containerID && id !== containerID);
    if (!movedElements.length || action.payload.keyboard) {
        return;
    }
    yield put(UMLContainerRepository.remove(movedElements));
    yield put(UMLContainerRepository.append(movedElements, containerID || undefined));
}
function* renderAfterMove() {
    const action = yield take("@@element/movable/END" /* MovableActionTypes.END */);
    const { elements, diagram } = yield select();
    const state = { ...elements, [diagram.id]: diagram };
    yield race({
        append: take("@@element/container/APPEND" /* UMLContainerActionTypes.APPEND */),
        resize: call(function* () {
            yield delay(0);
            const owners = [...new Set(action.payload.ids.map((id) => state[id].owner || diagram.id))];
            for (const owner of owners) {
                yield call(render, owner);
            }
        }),
    });
}
//# sourceMappingURL=uml-container-saga.js.map