"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hoverable = void 0;
exports.Hoverable = {
    /** Hover elements */
    hover: function (id) { return ({
        type: "@@element/hoverable/HOVER" /* HoverableActionTypes.HOVER */,
        payload: {
            ids: Array.isArray(id) ? id : [id],
        },
        undoable: false,
    }); },
    /** Leave elements */
    leave: function (id) { return ({
        type: "@@element/hoverable/LEAVE" /* HoverableActionTypes.LEAVE */,
        payload: {
            ids: Array.isArray(id) ? id : [id],
        },
        undoable: false,
    }); },
};
//# sourceMappingURL=hoverable-repository.js.map