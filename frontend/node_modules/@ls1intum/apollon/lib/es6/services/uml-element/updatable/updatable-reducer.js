export const UpdatableReducer = (state = [], action) => {
    switch (action.type) {
        case "@@element/updatable/START" /* UpdatableActionTypes.START */: {
            const { payload } = action;
            return [...new Set([...payload.ids, ...state])];
        }
        case "@@element/DELETE" /* UMLElementActionTypes.DELETE */:
        case "@@element/updatable/END" /* UpdatableActionTypes.END */: {
            const { payload } = action;
            return state.filter((id) => !payload.ids.includes(id));
        }
        case "@@element/updatable/ENDALL" /* UpdatableActionTypes.ENDALL */:
            return [];
    }
    return state;
};
//# sourceMappingURL=updatable-reducer.js.map