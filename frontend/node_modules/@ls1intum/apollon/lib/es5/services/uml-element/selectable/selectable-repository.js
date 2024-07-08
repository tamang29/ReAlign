"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Selectable = void 0;
exports.Selectable = {
    select: function (id, overwrite) {
        return function (dispatch, getState) {
            var ids = id ? (Array.isArray(id) ? id : [id]) : Object.keys(getState().elements);
            if (!ids.length) {
                dispatch({
                    type: "@@element/SET_SELECTION_BOX_ACTIVE" /* EditorActionTypes.SET_SELECTION_BOX */,
                    payload: {
                        selectionBoxActive: false,
                    },
                    undoable: false,
                });
            }
            return dispatch({
                type: "@@element/selectable/SELECT" /* SelectableActionTypes.SELECT */,
                payload: {
                    ids: ids,
                    overwrite: overwrite,
                },
                undoable: false,
            });
        };
    },
    deselect: function (id) {
        return function (dispatch, getState) {
            var ids = id ? (Array.isArray(id) ? id : [id]) : getState().selected;
            if (!ids.length) {
                return;
            }
            return dispatch({
                type: "@@element/selectable/DESELECT" /* SelectableActionTypes.DESELECT */,
                payload: { ids: ids },
                undoable: false,
            });
        };
    },
};
//# sourceMappingURL=selectable-repository.js.map