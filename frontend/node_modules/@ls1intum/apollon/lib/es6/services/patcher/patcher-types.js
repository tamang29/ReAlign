/**
 * Returns true if the action is discrete, i.e. if it is not in middle of
 * a user action.
 */
export const isDiscreteAction = (action) => {
    return (action.type.endsWith('END') ||
        action.type.endsWith('DELETE') ||
        action.type.endsWith('UNDO') ||
        action.type.endsWith('REDO'));
};
/**
 * Returns true if the action is a selection action.
 */
export const isSelectionAction = (action) => {
    return action.type === "@@element/selectable/SELECT" /* SelectableActionTypes.SELECT */ || action.type === "@@element/selectable/DESELECT" /* SelectableActionTypes.DESELECT */;
};
export const isContinuousAction = (action) => {
    return action.type === "@@element/movable/MOVE" /* MovingActionTypes.MOVE */ || action.type === "@@element/resizable/RESIZE" /* ResizingActionTypes.RESIZE */;
};
//# sourceMappingURL=patcher-types.js.map