import { Action } from '../../utils/actions/actions';
export declare const enum LayouterActionTypes {
    LAYOUT = "@@layouter/LAYOUT"
}
export type LayouterActions = LayoutAction;
export type LayoutAction = Action<LayouterActionTypes.LAYOUT>;
