"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UndoRepository = void 0;
var UndoRepository = /** @class */ (function () {
    function UndoRepository() {
    }
    UndoRepository.undo = function () { return ({ type: "@@undo/UNDO" /* UndoActionTypes.UNDO */, payload: {}, undoable: false }); };
    UndoRepository.redo = function () { return ({ type: "@@undo/REDO" /* UndoActionTypes.REDO */, payload: {}, undoable: false }); };
    return UndoRepository;
}());
exports.UndoRepository = UndoRepository;
//# sourceMappingURL=undo-repository.js.map