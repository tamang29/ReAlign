export const Resizable = {
    startResizing: (id) => (dispatch, getState) => {
        const ids = id ? (Array.isArray(id) ? id : [id]) : [];
        if (!ids.length) {
            return;
        }
        dispatch({
            type: "@@element/resizable/START" /* ResizableActionTypes.START */,
            payload: { ids },
            undoable: true,
        });
    },
    resize: (delta, resizeFrom, id) => (dispatch, getState) => {
        const ids = id ? (Array.isArray(id) ? id : [id]) : [];
        if (!ids.length) {
            return;
        }
        dispatch({
            type: "@@element/resizable/RESIZE" /* ResizingActionTypes.RESIZE */,
            payload: { ids, delta, resizeFrom },
            undoable: false,
        });
    },
    endResizing: (id) => (dispatch, getState) => {
        const ids = id ? (Array.isArray(id) ? id : [id]) : [];
        if (!ids.length) {
            return;
        }
        dispatch({
            type: "@@element/resizable/END" /* ResizableActionTypes.END */,
            payload: { ids },
            undoable: false,
        });
    },
};
//# sourceMappingURL=resizable-repository.js.map