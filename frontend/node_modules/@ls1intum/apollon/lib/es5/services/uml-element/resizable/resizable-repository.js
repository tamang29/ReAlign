"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resizable = void 0;
exports.Resizable = {
    startResizing: function (id) {
        return function (dispatch, getState) {
            var ids = id ? (Array.isArray(id) ? id : [id]) : [];
            if (!ids.length) {
                return;
            }
            dispatch({
                type: "@@element/resizable/START" /* ResizableActionTypes.START */,
                payload: { ids: ids },
                undoable: true,
            });
        };
    },
    resize: function (delta, resizeFrom, id) {
        return function (dispatch, getState) {
            var ids = id ? (Array.isArray(id) ? id : [id]) : [];
            if (!ids.length) {
                return;
            }
            dispatch({
                type: "@@element/resizable/RESIZE" /* ResizingActionTypes.RESIZE */,
                payload: { ids: ids, delta: delta, resizeFrom: resizeFrom },
                undoable: false,
            });
        };
    },
    endResizing: function (id) {
        return function (dispatch, getState) {
            var ids = id ? (Array.isArray(id) ? id : [id]) : [];
            if (!ids.length) {
                return;
            }
            dispatch({
                type: "@@element/resizable/END" /* ResizableActionTypes.END */,
                payload: { ids: ids },
                undoable: false,
            });
        };
    },
};
//# sourceMappingURL=resizable-repository.js.map