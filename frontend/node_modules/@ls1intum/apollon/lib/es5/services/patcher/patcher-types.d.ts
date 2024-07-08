import { Operation } from 'fast-json-patch';
import { Actions } from '../actions';
import { Action } from '../../utils/actions/actions';
/**
 * Returns true if the action is discrete, i.e. if it is not in middle of
 * a user action.
 */
export declare const isDiscreteAction: (action: Actions) => boolean;
/**
 * Returns true if the action is a selection action.
 */
export declare const isSelectionAction: (action: Actions) => boolean;
export declare const isContinuousAction: (action: Actions) => boolean;
/**
 * A patch is a list of operations that can be applied to an object
 * to change them in some desired manner. See [JSON patch](http://jsonpatch.com/) for more info.
 */
export type Patch = Operation[];
export type PatchListener = (patch: Patch) => void;
export declare const enum PatcherActionTypes {
    PATCH = "@@patcher/PATCH"
}
export type PatcherActions = PatchAction;
export type PatchAction = Action<PatcherActionTypes.PATCH>;
