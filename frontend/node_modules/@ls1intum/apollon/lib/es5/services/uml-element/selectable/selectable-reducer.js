"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectableReducer = void 0;
var tslib_1 = require("tslib");
var SelectableReducer = function (state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case "@@element/selectable/SELECT" /* SelectableActionTypes.SELECT */: {
            var payload = action.payload;
            return tslib_1.__spreadArray([], tslib_1.__read(new Set(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(payload.ids), false), tslib_1.__read((payload.overwrite ? [] : state)), false))), false);
        }
        case "@@element/DELETE" /* UMLElementActionTypes.DELETE */:
        case "@@element/selectable/DESELECT" /* SelectableActionTypes.DESELECT */: {
            var payload_1 = action.payload;
            return state.filter(function (id) { return !payload_1.ids.includes(id); });
        }
    }
    return state;
};
exports.SelectableReducer = SelectableReducer;
//# sourceMappingURL=selectable-reducer.js.map