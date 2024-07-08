"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatcherRepository = void 0;
exports.PatcherRepository = {
    /**
     * Creates an action representing impoprting a patch.
     * @param patch The patch to import.
     */
    patch: function (patch) { return ({
        type: "@@patcher/PATCH" /* PatcherActionTypes.PATCH */,
        payload: patch,
        undoable: false,
    }); },
};
//# sourceMappingURL=patcher-repository.js.map