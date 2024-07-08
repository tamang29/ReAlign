"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorRepository = void 0;
var EditorRepository = /** @class */ (function () {
    function EditorRepository() {
    }
    EditorRepository.changeView = function (view) { return ({
        type: "@@element/CHANGE_VIEW" /* EditorActionTypes.CHANGE_VIEW */,
        payload: { view: view },
        undoable: false,
    }); };
    EditorRepository.setZoomFactor = function (zoomFactor) { return ({
        type: "@@element/SET_ZOOM_FACTOR" /* EditorActionTypes.SET_ZOOM_FACTOR */,
        payload: { zoomFactor: zoomFactor },
        undoable: false,
    }); };
    EditorRepository.setSelectionBoxActive = function (selectionBoxActive) { return ({
        type: "@@element/SET_SELECTION_BOX_ACTIVE" /* EditorActionTypes.SET_SELECTION_BOX */,
        payload: { selectionBoxActive: selectionBoxActive },
        undoable: false,
    }); };
    return EditorRepository;
}());
exports.EditorRepository = EditorRepository;
//# sourceMappingURL=editor-repository.js.map