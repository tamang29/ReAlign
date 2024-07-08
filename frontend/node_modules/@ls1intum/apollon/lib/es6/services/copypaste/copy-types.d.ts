import { Action } from '../../utils/actions/actions';
export declare const enum CopyActionTypes {
    COPY = "@@copy/COPY",
    PASTE = "@@copy/PASTE"
}
export type CopyState = string[];
export type CopyActions = CopyAction | PasteAction;
export type CopyAction = Action<CopyActionTypes.COPY> & {
    payload: CopyState;
};
export type PasteAction = Action<CopyActionTypes.PASTE>;
