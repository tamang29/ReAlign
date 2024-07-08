export const SelectableReducer = (state = [], action) => {
    switch (action.type) {
        case "@@element/selectable/SELECT" /* SelectableActionTypes.SELECT */: {
            const { payload } = action;
            return [...new Set([...payload.ids, ...(payload.overwrite ? [] : state)])];
        }
        case "@@element/DELETE" /* UMLElementActionTypes.DELETE */:
        case "@@element/selectable/DESELECT" /* SelectableActionTypes.DESELECT */: {
            const { payload } = action;
            return state.filter((id) => !payload.ids.includes(id));
        }
    }
    return state;
};
//# sourceMappingURL=selectable-reducer.js.map