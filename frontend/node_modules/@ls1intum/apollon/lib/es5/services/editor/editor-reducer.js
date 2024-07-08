"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorReducer = void 0;
var tslib_1 = require("tslib");
var editor_types_1 = require("./editor-types");
var initialState = {
    readonly: false,
    colorEnabled: false,
    enablePopups: true,
    enableCopyPasteToClipboard: false,
    mode: editor_types_1.ApollonMode.Exporting,
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
var EditorReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case "@@element/CHANGE_VIEW" /* EditorActionTypes.CHANGE_VIEW */: {
            var payload = action.payload;
            return tslib_1.__assign(tslib_1.__assign({}, state), { view: payload.view });
        }
        case "@@element/SET_ZOOM_FACTOR" /* EditorActionTypes.SET_ZOOM_FACTOR */: {
            var payload = action.payload;
            return tslib_1.__assign(tslib_1.__assign({}, state), { zoomFactor: payload.zoomFactor });
        }
        case "@@element/SET_SELECTION_BOX_ACTIVE" /* EditorActionTypes.SET_SELECTION_BOX */: {
            var payload = action.payload;
            return tslib_1.__assign(tslib_1.__assign({}, state), { selectionBoxActive: payload.selectionBoxActive });
        }
    }
    return state;
};
exports.EditorReducer = EditorReducer;
//# sourceMappingURL=editor-reducer.js.map