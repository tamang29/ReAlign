"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Updatable = void 0;
exports.Updatable = {
    updateStart: function (id) {
        return function (dispatch, getState) {
            if (getState().updating.length) {
                return null;
            }
            dispatch({
                type: "@@element/updatable/START" /* UpdatableActionTypes.START */,
                payload: { ids: Array.isArray(id) ? id : [id] },
                undoable: true,
            });
        };
    },
    updateEnd: function (id) { return ({
        type: "@@element/updatable/END" /* UpdatableActionTypes.END */,
        payload: { ids: Array.isArray(id) ? id : [id] },
        undoable: false,
    }); },
    updateEndAll: function () { return ({
        type: "@@element/updatable/ENDALL" /* UpdatableActionTypes.ENDALL */,
        payload: {},
        undoable: false,
    }); },
};
//# sourceMappingURL=updatable-repository.js.map