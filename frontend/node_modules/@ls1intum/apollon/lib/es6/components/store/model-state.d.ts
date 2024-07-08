import { AssessmentState } from '../../services/assessment/assessment-types';
import { EditorState } from '../../services/editor/editor-types';
import { UMLDiagramState } from '../../services/uml-diagram/uml-diagram-types';
import { ConnectableState } from '../../services/uml-element/connectable/connectable-types';
import { HoverableState } from '../../services/uml-element/hoverable/hoverable-types';
import { InteractableState } from '../../services/uml-element/interactable/interactable-types';
import { MovableState } from '../../services/uml-element/movable/movable-types';
import { ResizableState } from '../../services/uml-element/resizable/resizable-types';
import { SelectableState } from '../../services/uml-element/selectable/selectable-types';
import { UMLElementState } from '../../services/uml-element/uml-element-types';
import { UpdatableState } from '../../services/uml-element/updatable/updatable-types';
import { ReconnectableState } from '../../services/uml-relationship/reconnectable/reconnectable-types';
import * as Apollon from '../../typings';
import { UMLModelCompat } from '../../compat';
import { CopyState } from '../../services/copypaste/copy-types';
import { LastActionState } from '../../services/last-action/last-action-types';
import { RemoteSelectionState } from '../../services/uml-element/remote-selectable/remote-selectable-types';
export type PartialModelState = Omit<Partial<ModelState>, 'editor'> & {
    editor?: Partial<EditorState>;
};
export interface ModelState {
    editor: EditorState;
    diagram: UMLDiagramState;
    hovered: HoverableState;
    selected: SelectableState;
    remoteSelection: RemoteSelectionState;
    moving: MovableState;
    resizing: ResizableState;
    connecting: ConnectableState;
    reconnecting: ReconnectableState;
    interactive: InteractableState;
    updating: UpdatableState;
    elements: UMLElementState;
    assessments: AssessmentState;
    copy: CopyState;
    lastAction: LastActionState;
}
export declare class ModelState {
    static fromModel(compatModel: UMLModelCompat): PartialModelState;
    static toModel(state: ModelState): Apollon.UMLModel;
}
