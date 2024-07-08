import { ApollonMode } from './editor-types';
const initialState = {
    readonly: false,
    colorEnabled: false,
    enablePopups: true,
    enableCopyPasteToClipboard: false,
    mode: ApollonMode.Exporting,
    view: "Modelling" /* ApollonView.Modelling */,
    zoomFactor: 1.0,
    selectionBoxActive: false,
    features: {
        hoverable: true,
        selectable: true,
        movable: true,
        resizable: true,
        connectable: true,
        updatable: true,
        droppable: true,
        alternativePortVisualization: false,
    },
};
export const EditorReducer = (state = initialState, action) => {
    switch (action.type) {
        case "@@element/CHANGE_VIEW" /* EditorActionTypes.CHANGE_VIEW */: {
            const { payload } = action;
            return {
                ...state,
                view: payload.view,
            };
        }
        case "@@element/SET_ZOOM_FACTOR" /* EditorActionTypes.SET_ZOOM_FACTOR */: {
            const { payload } = action;
            return {
                ...state,
                zoomFactor: payload.zoomFactor,
            };
        }
        case "@@element/SET_SELECTION_BOX_ACTIVE" /* EditorActionTypes.SET_SELECTION_BOX */: {
            const { payload } = action;
            return {
                ...state,
                selectionBoxActive: payload.selectionBoxActive,
            };
        }
    }
    return state;
};
//# sourceMappingURL=editor-reducer.js.map