export const Updatable = {
    updateStart: (id) => (dispatch, getState) => {
        if (getState().updating.length) {
            return null;
        }
        dispatch({
            type: "@@element/updatable/START" /* UpdatableActionTypes.START */,
            payload: { ids: Array.isArray(id) ? id : [id] },
            undoable: true,
        });
    },
    updateEnd: (id) => ({
        type: "@@element/updatable/END" /* UpdatableActionTypes.END */,
        payload: { ids: Array.isArray(id) ? id : [id] },
        undoable: false,
    }),
    updateEndAll: () => ({
        type: "@@element/updatable/ENDALL" /* UpdatableActionTypes.ENDALL */,
        payload: {},
        undoable: false,
    }),
};
//# sourceMappingURL=updatable-repository.js.map