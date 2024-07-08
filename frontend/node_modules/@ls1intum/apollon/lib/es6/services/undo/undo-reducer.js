import { isInternal } from '../../utils/actions/sagas';
const MAX_UNDO_STACK_SIZE = 25;
export const undoable = (reducer) => {
    const past = new Stack(MAX_UNDO_STACK_SIZE);
    const future = new Stack(MAX_UNDO_STACK_SIZE);
    return (state = {}, action) => {
        switch (action.type) {
            case "@@undo/UNDO" /* UndoActionTypes.UNDO */: {
                const previous = past.pop();
                if (!previous)
                    return state;
                future.push([state, action]);
                return previous[0];
            }
            case "@@undo/REDO" /* UndoActionTypes.REDO */: {
                const next = future.pop();
                if (!next)
                    return state;
                past.push([state, action]);
                return next[0];
            }
            default:
                const ignore = isInternal(action) || !action.undoable;
                if (!ignore) {
                    future.clear();
                    past.push([state, action]);
                }
                return reducer(state, action);
        }
    };
};
class Stack {
    constructor(maxSize) {
        this.maxSize = maxSize;
        this.items = [];
    }
    get latest() {
        return this.items.length ? this.items[this.items.length - 1] : null;
    }
    push(item) {
        const newLength = this.items.push(item);
        if (newLength > this.maxSize) {
            this.items.shift();
        }
    }
    pop() {
        return this.items.pop();
    }
    clear() {
        this.items.length = 0;
    }
}
//# sourceMappingURL=undo-reducer.js.map