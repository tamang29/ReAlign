export class EditorRepository {
}
EditorRepository.changeView = (view) => ({
    type: "@@element/CHANGE_VIEW" /* EditorActionTypes.CHANGE_VIEW */,
    payload: { view },
    undoable: false,
});
EditorRepository.setZoomFactor = (zoomFactor) => ({
    type: "@@element/SET_ZOOM_FACTOR" /* EditorActionTypes.SET_ZOOM_FACTOR */,
    payload: { zoomFactor },
    undoable: false,
});
EditorRepository.setSelectionBoxActive = (selectionBoxActive) => ({
    type: "@@element/SET_SELECTION_BOX_ACTIVE" /* EditorActionTypes.SET_SELECTION_BOX */,
    payload: { selectionBoxActive },
    undoable: false,
});
//# sourceMappingURL=editor-repository.js.map