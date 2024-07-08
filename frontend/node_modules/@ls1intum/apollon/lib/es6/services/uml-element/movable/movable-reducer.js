export const MovableReducer = (state = [], action) => {
    switch (action.type) {
        case "@@element/movable/START" /* MovableActionTypes.START */: {
            const { payload } = action;
            return [...new Set([...payload.ids, ...state])];
        }
        case "@@element/DELETE" /* UMLElementActionTypes.DELETE */:
        case "@@element/movable/END" /* MovableActionTypes.END */: {
            const { payload } = action;
            return state.filter((id) => !payload.ids.includes(id));
        }
    }
    return state;
};
//# sourceMappingURL=movable-reducer.js.map