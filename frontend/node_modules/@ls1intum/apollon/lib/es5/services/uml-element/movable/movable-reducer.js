"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovableReducer = void 0;
var tslib_1 = require("tslib");
var MovableReducer = function (state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case "@@element/movable/START" /* MovableActionTypes.START */: {
            var payload = action.payload;
            return tslib_1.__spreadArray([], tslib_1.__read(new Set(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(payload.ids), false), tslib_1.__read(state), false))), false);
        }
        case "@@element/DELETE" /* UMLElementActionTypes.DELETE */:
        case "@@element/movable/END" /* MovableActionTypes.END */: {
            var payload_1 = action.payload;
            return state.filter(function (id) { return !payload_1.ids.includes(id); });
        }
    }
    return state;
};
exports.MovableReducer = MovableReducer;
//# sourceMappingURL=movable-reducer.js.map