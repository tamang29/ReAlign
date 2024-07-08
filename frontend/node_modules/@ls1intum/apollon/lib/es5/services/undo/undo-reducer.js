"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.undoable = void 0;
var sagas_1 = require("../../utils/actions/sagas");
var MAX_UNDO_STACK_SIZE = 25;
var undoable = function (reducer) {
    var past = new Stack(MAX_UNDO_STACK_SIZE);
    var future = new Stack(MAX_UNDO_STACK_SIZE);
    return function (state, action) {
        if (state === void 0) { state = {}; }
        switch (action.type) {
            case "@@undo/UNDO" /* UndoActionTypes.UNDO */: {
                var previous = past.pop();
                if (!previous)
                    return state;
                future.push([state, action]);
                return previous[0];
            }
            case "@@undo/REDO" /* UndoActionTypes.REDO */: {
                var next = future.pop();
                if (!next)
                    return state;
                past.push([state, action]);
                return next[0];
            }
            default:
                var ignore = (0, sagas_1.isInternal)(action) || !action.undoable;
                if (!ignore) {
                    future.clear();
                    past.push([state, action]);
                }
                return reducer(state, action);
        }
    };
};
exports.undoable = undoable;
var Stack = /** @class */ (function () {
    function Stack(maxSize) {
        this.maxSize = maxSize;
        this.items = [];
    }
    Object.defineProperty(Stack.prototype, "latest", {
        get: function () {
            return this.items.length ? this.items[this.items.length - 1] : null;
        },
        enumerable: false,
        configurable: true
    });
    Stack.prototype.push = function (item) {
        var newLength = this.items.push(item);
        if (newLength > this.maxSize) {
            this.items.shift();
        }
    };
    Stack.prototype.pop = function () {
        return this.items.pop();
    };
    Stack.prototype.clear = function () {
        this.items.length = 0;
    };
    return Stack;
}());
//# sourceMappingURL=undo-reducer.js.map