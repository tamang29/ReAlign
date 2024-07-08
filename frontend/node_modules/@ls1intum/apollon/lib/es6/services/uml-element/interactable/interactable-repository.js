export const Interactable = {
    makeInteractive: (id) => ({
        type: "@@element/interactable/SELECT" /* InteractableActionTypes.SELECT */,
        payload: { ids: [id] },
        undoable: false,
    }),
    unmakeInteractive: (id) => ({
        type: "@@element/interactable/DESELECT" /* InteractableActionTypes.DESELECT */,
        payload: { ids: [id] },
        undoable: false,
    }),
};
//# sourceMappingURL=interactable-repository.js.map