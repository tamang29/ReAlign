import { AssessmentReducer } from './assessment/assessment-reducer';
import { EditorReducer } from './editor/editor-reducer';
import { UMLContainerReducer } from './uml-container/uml-container-reducer';
import { UMLDiagramReducer } from './uml-diagram/uml-diagram-reducer';
import { ConnectableReducer } from './uml-element/connectable/connectable-reducer';
import { HoverableReducer } from './uml-element/hoverable/hoverable-reducer';
import { InteractableReducer } from './uml-element/interactable/interactable-reducer';
import { MovableReducer } from './uml-element/movable/movable-reducer';
import { MovingReducer } from './uml-element/movable/moving-reducer';
import { ResizableReducer } from './uml-element/resizable/resizable-reducer';
import { ResizingReducer } from './uml-element/resizable/resizing-reducer';
import { SelectableReducer } from './uml-element/selectable/selectable-reducer';
import { UMLElementReducer } from './uml-element/uml-element-reducer';
import { UpdatableReducer } from './uml-element/updatable/updatable-reducer';
import { ReconnectableReducer } from './uml-relationship/reconnectable/reconnectable-reducer';
import { UMLRelationshipReducer } from './uml-relationship/uml-relationship-reducer';
import { CopyReducer } from './copypaste/copy-reducer';
import { LastActionReducer } from './last-action/last-action-reducer';
import { RemoteSelectionReducer } from './uml-element/remote-selectable/remote-selection-reducer';
const reduce = (intial, ...reducerList) => (state = intial, action) => reducerList.reduce((newState, reducer) => reducer(newState, action), state);
export const reducers = {
    editor: EditorReducer,
    diagram: UMLDiagramReducer,
    hovered: HoverableReducer,
    selected: SelectableReducer,
    moving: MovableReducer,
    resizing: ResizableReducer,
    connecting: ConnectableReducer,
    reconnecting: ReconnectableReducer,
    interactive: InteractableReducer,
    updating: UpdatableReducer,
    copy: CopyReducer,
    lastAction: LastActionReducer,
    remoteSelection: RemoteSelectionReducer,
    elements: reduce({}, UMLContainerReducer, UMLRelationshipReducer, UMLElementReducer, ResizingReducer, MovingReducer),
    assessments: AssessmentReducer,
};
//# sourceMappingURL=reducer.js.map