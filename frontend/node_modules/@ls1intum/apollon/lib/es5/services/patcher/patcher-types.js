"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isContinuousAction = exports.isSelectionAction = exports.isDiscreteAction = void 0;
/**
 * Returns true if the action is discrete, i.e. if it is not in middle of
 * a user action.
 */
var isDiscreteAction = function (action) {
    return (action.type.endsWith('END') ||
        action.type.endsWith('DELETE') ||
        action.type.endsWith('UNDO') ||
        action.type.endsWith('REDO'));
};
exports.isDiscreteAction = isDiscreteAction;
/**
 * Returns true if the action is a selection action.
 */
var isSelectionAction = function (action) {
    return action.type === "@@element/selectable/SELECT" /* SelectableActionTypes.SELECT */ || action.type === "@@element/selectable/DESELECT" /* SelectableActionTypes.DESELECT */;
};
exports.isSelectionAction = isSelectionAction;
var isContinuousAction = function (action) {
    return action.type === "@@element/movable/MOVE" /* MovingActionTypes.MOVE */ || action.type === "@@element/resizable/RESIZE" /* ResizingActionTypes.RESIZE */;
};
exports.isContinuousAction = isContinuousAction;
//# sourceMappingURL=patcher-types.js.map