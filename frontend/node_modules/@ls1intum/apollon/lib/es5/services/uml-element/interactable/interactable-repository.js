"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interactable = void 0;
exports.Interactable = {
    makeInteractive: function (id) { return ({
        type: "@@element/interactable/SELECT" /* InteractableActionTypes.SELECT */,
        payload: { ids: [id] },
        undoable: false,
    }); },
    unmakeInteractive: function (id) { return ({
        type: "@@element/interactable/DESELECT" /* InteractableActionTypes.DESELECT */,
        payload: { ids: [id] },
        undoable: false,
    }); },
};
//# sourceMappingURL=interactable-repository.js.map