import { composeSaga } from '../utils/actions/sagas';
import { Layouter } from './layouter/layouter';
import { UMLContainerSaga } from './uml-container/uml-container-saga';
import { UMLDiagramSaga } from './uml-diagram/uml-diagram-saga';
import { UMLElementSaga } from './uml-element/uml-element-saga';
import { UMLRelationshipSaga } from './uml-relationship/uml-relationship-saga';
import { PatchLayouter } from './patcher/patcher-saga';
export function* saga() {
    yield composeSaga([Layouter, UMLElementSaga, UMLContainerSaga, UMLRelationshipSaga, UMLDiagramSaga, PatchLayouter]);
}
//# sourceMappingURL=saga.js.map