export const InteractableReducer = (state = [], action) => {
    switch (action.type) {
        case "@@element/interactable/SELECT" /* InteractableActionTypes.SELECT */: {
            const { payload } = action;
            return [...new Set([...payload.ids, ...state])];
        }
        case "@@element/DELETE" /* UMLElementActionTypes.DELETE */:
        case "@@element/interactable/DESELECT" /* InteractableActionTypes.DESELECT */: {
            const { payload } = action;
            return state.filter((id) => !payload.ids.includes(id));
        }
    }
    return state;
};
//# sourceMappingURL=interactable-reducer.js.map