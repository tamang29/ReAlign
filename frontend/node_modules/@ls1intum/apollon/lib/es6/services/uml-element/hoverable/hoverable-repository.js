export const Hoverable = {
    /** Hover elements */
    hover: (id) => ({
        type: "@@element/hoverable/HOVER" /* HoverableActionTypes.HOVER */,
        payload: {
            ids: Array.isArray(id) ? id : [id],
        },
        undoable: false,
    }),
    /** Leave elements */
    leave: (id) => ({
        type: "@@element/hoverable/LEAVE" /* HoverableActionTypes.LEAVE */,
        payload: {
            ids: Array.isArray(id) ? id : [id],
        },
        undoable: false,
    }),
};
//# sourceMappingURL=hoverable-repository.js.map