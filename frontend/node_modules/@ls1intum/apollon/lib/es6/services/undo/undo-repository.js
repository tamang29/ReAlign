export class UndoRepository {
}
UndoRepository.undo = () => ({ type: "@@undo/UNDO" /* UndoActionTypes.UNDO */, payload: {}, undoable: false });
UndoRepository.redo = () => ({ type: "@@undo/REDO" /* UndoActionTypes.REDO */, payload: {}, undoable: false });
//# sourceMappingURL=undo-repository.js.map