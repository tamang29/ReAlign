import { Action } from '../../utils/actions/actions';
import { UMLElementFeatures } from '../uml-element/uml-element-features';
export declare enum Locale {
    en = "en",
    de = "de"
}
export declare enum ApollonMode {
    Modelling = "Modelling",
    Exporting = "Exporting",
    Assessment = "Assessment"
}
export declare const enum ApollonView {
    Modelling = "Modelling",
    Exporting = "Exporting",
    Highlight = "Highlight"
}
export declare const enum EditorActionTypes {
    CHANGE_VIEW = "@@element/CHANGE_VIEW",
    SET_ZOOM_FACTOR = "@@element/SET_ZOOM_FACTOR",
    SET_SELECTION_BOX = "@@element/SET_SELECTION_BOX_ACTIVE"
}
export type EditorState = {
    readonly mode: ApollonMode;
    readonly readonly: boolean;
    readonly enablePopups: boolean;
    readonly enableCopyPasteToClipboard: boolean;
    readonly view: ApollonView;
    readonly features: UMLElementFeatures;
    readonly colorEnabled: boolean;
    readonly zoomFactor: number;
    readonly selectionBoxActive: boolean;
};
export type EditorActions = ChangeViewAction | SetZoomFactorAction | SetSelectionBoxAction;
export type ChangeViewAction = Action<EditorActionTypes.CHANGE_VIEW> & {
    payload: {
        view: ApollonView;
    };
};
export type SetZoomFactorAction = Action<EditorActionTypes.SET_ZOOM_FACTOR> & {
    payload: {
        zoomFactor: number;
    };
};
export type SetSelectionBoxAction = Action<EditorActionTypes.SET_SELECTION_BOX> & {
    payload: {
        selectionBoxActive: boolean;
    };
};
