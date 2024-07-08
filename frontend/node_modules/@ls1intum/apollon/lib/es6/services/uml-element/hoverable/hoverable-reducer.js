export const HoverableReducer = (state = [], action) => {
    switch (action.type) {
        case "@@element/hoverable/HOVER" /* HoverableActionTypes.HOVER */: {
            const { payload } = action;
            return [...new Set([...payload.ids, ...state])];
        }
        case "@@element/DELETE" /* UMLElementActionTypes.DELETE */:
        case "@@element/hoverable/LEAVE" /* HoverableActionTypes.LEAVE */: {
            const { payload } = action;
            return state.filter((id) => !payload.ids.includes(id));
        }
    }
    return state;
};
//# sourceMappingURL=hoverable-reducer.js.map