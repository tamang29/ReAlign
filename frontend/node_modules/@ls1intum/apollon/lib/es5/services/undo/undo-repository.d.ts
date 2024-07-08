import { RedoAction, UndoAction } from './undo-types';
export declare class UndoRepository {
    static undo: () => UndoAction;
    static redo: () => RedoAction;
}
