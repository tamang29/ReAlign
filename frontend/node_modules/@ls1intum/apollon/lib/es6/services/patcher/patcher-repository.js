export const PatcherRepository = {
    /**
     * Creates an action representing impoprting a patch.
     * @param patch The patch to import.
     */
    patch: (patch) => ({
        type: "@@patcher/PATCH" /* PatcherActionTypes.PATCH */,
        payload: patch,
        undoable: false,
    }),
};
//# sourceMappingURL=patcher-repository.js.map