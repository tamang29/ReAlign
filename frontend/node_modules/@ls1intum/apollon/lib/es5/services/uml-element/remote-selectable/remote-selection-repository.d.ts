import { UMLElementSelectorType } from '../../../packages/uml-element-selector-type';
import { RemoteSelectionChange, RemoteSelectionChangeAction, RemoteSelectionPruneSelectorsAction } from './remote-selectable-types';
export declare const RemoteSelectable: {
    remoteSelectionChange: (selector: UMLElementSelectorType, changes: RemoteSelectionChange[]) => RemoteSelectionChangeAction;
    remoteSelect: (selector: UMLElementSelectorType, ids: string[]) => RemoteSelectionChangeAction;
    remoteDeselect: (selector: UMLElementSelectorType, ids: string[]) => RemoteSelectionChangeAction;
    remoteSelectDeselect: (selector: UMLElementSelectorType, select: string[], deselect: string[]) => RemoteSelectionChangeAction;
    pruneRemoteSelectors: (allowedSelectors: UMLElementSelectorType[]) => RemoteSelectionPruneSelectorsAction;
};
