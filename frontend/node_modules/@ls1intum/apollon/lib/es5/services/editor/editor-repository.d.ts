import { ApollonView, SetSelectionBoxAction, ChangeViewAction, SetZoomFactorAction } from './editor-types';
export declare class EditorRepository {
    static changeView: (view: ApollonView) => ChangeViewAction;
    static setZoomFactor: (zoomFactor: number) => SetZoomFactorAction;
    static setSelectionBoxActive: (selectionBoxActive: boolean) => SetSelectionBoxAction;
}
