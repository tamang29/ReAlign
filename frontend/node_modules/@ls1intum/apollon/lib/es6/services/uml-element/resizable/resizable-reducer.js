export const ResizableReducer = (state = [], action) => {
    switch (action.type) {
        case "@@element/resizable/START" /* ResizableActionTypes.START */: {
            const { payload } = action;
            return [...new Set([...payload.ids, ...state])];
        }
        case "@@element/DELETE" /* UMLElementActionTypes.DELETE */:
        case "@@element/resizable/END" /* ResizableActionTypes.END */: {
            const { payload } = action;
            return state.filter((id) => !payload.ids.includes(id));
        }
    }
    return state;
};
//# sourceMappingURL=resizable-reducer.js.map