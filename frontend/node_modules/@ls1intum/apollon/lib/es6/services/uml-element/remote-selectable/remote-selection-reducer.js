const sameSelector = (a, b) => {
    return a && b && a.name === b.name && a.color === b.color;
};
export const RemoteSelectionReducer = (state = {}, action) => {
    switch (action.type) {
        case "@@element/remote-selection/CHANGE" /* RemoteSelectionActionTypes.SELECTION_CHANGE */:
            const { payload } = action;
            const { selector, changes } = payload;
            return changes.reduce((selection, change) => {
                const { id } = change;
                const selectors = [...(selection[id] ?? [])];
                if (change.type === "@@element/remote-selection/SELECT" /* RemoteSelectionChangeTypes.SELECT */ && !selectors.some((s) => sameSelector(s, selector))) {
                    selectors.push(selector);
                }
                else if (change.type === "@@element/remote-selection/DESELECT" /* RemoteSelectionChangeTypes.DESELECT */) {
                    const index = selectors.findIndex((s) => sameSelector(s, selector));
                    if (index >= 0) {
                        selectors.splice(index, 1);
                    }
                }
                return {
                    ...selection,
                    [id]: selectors,
                };
            }, state);
        case "@@element/remote-selection/PRUNE_SELECTORS" /* RemoteSelectionActionTypes.PRUNE_SELECTORS */:
            const { allowedSelectors } = action.payload;
            return Object.fromEntries(Object.entries(state).map(([id, selectors]) => {
                return [id, selectors.filter((s) => allowedSelectors.some((selector) => sameSelector(s, selector)))];
            }));
    }
    return state;
};
//# sourceMappingURL=remote-selection-reducer.js.map