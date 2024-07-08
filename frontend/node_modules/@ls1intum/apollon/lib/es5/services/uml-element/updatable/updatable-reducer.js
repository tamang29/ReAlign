"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatableReducer = void 0;
var tslib_1 = require("tslib");
var UpdatableReducer = function (state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case "@@element/updatable/START" /* UpdatableActionTypes.START */: {
            var payload = action.payload;
            return tslib_1.__spreadArray([], tslib_1.__read(new Set(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(payload.ids), false), tslib_1.__read(state), false))), false);
        }
        case "@@element/DELETE" /* UMLElementActionTypes.DELETE */:
        case "@@element/updatable/END" /* UpdatableActionTypes.END */: {
            var payload_1 = action.payload;
            return state.filter(function (id) { return !payload_1.ids.includes(id); });
        }
        case "@@element/updatable/ENDALL" /* UpdatableActionTypes.ENDALL */:
            return [];
    }
    return state;
};
exports.UpdatableReducer = UpdatableReducer;
//# sourceMappingURL=updatable-reducer.js.map