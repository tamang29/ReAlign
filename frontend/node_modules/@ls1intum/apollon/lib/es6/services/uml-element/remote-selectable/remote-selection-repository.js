export const RemoteSelectable = {
    remoteSelectionChange: (selector, changes) => ({
        type: "@@element/remote-selection/CHANGE" /* RemoteSelectionActionTypes.SELECTION_CHANGE */,
        payload: {
            selector,
            changes,
        },
        undoable: false,
    }),
    remoteSelect: (selector, ids) => RemoteSelectable.remoteSelectionChange(selector, ids.map((id) => ({ type: "@@element/remote-selection/SELECT" /* RemoteSelectionChangeTypes.SELECT */, id }))),
    remoteDeselect: (selector, ids) => RemoteSelectable.remoteSelectionChange(selector, ids.map((id) => ({ type: "@@element/remote-selection/DESELECT" /* RemoteSelectionChangeTypes.DESELECT */, id }))),
    remoteSelectDeselect: (selector, select, deselect) => RemoteSelectable.remoteSelectionChange(selector, [
        ...select.map((id) => ({ type: "@@element/remote-selection/SELECT" /* RemoteSelectionChangeTypes.SELECT */, id })),
        ...deselect.map((id) => ({ type: "@@element/remote-selection/DESELECT" /* RemoteSelectionChangeTypes.DESELECT */, id })),
    ]),
    pruneRemoteSelectors: (allowedSelectors) => ({
        type: "@@element/remote-selection/PRUNE_SELECTORS" /* RemoteSelectionActionTypes.PRUNE_SELECTORS */,
        payload: {
            allowedSelectors,
        },
        undoable: false,
    }),
};
//# sourceMappingURL=remote-selection-repository.js.map