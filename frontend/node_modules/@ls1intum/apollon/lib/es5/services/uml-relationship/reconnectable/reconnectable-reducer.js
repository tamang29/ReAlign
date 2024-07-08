"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReconnectableReducer = void 0;
var tslib_1 = require("tslib");
var ReconnectableReducer = function (state, action) {
    if (state === void 0) { state = {}; }
    switch (action.type) {
        case "@@element/reconnectable/START" /* ReconnectableActionTypes.START */: {
            var payload_1 = action.payload;
            return payload_1.ids.reduce(function (ids, id) {
                var _a;
                return (tslib_1.__assign(tslib_1.__assign({}, ids), (_a = {}, _a[id] = payload_1.endpoint, _a)));
            }, state);
        }
        case "@@element/DELETE" /* UMLElementActionTypes.DELETE */:
        case "@@element/reconnectable/END" /* ReconnectableActionTypes.END */: {
            var payload_2 = action.payload;
            return Object.keys(state).reduce(function (ids, id) {
                var _a;
                return (tslib_1.__assign(tslib_1.__assign({}, ids), (!payload_2.ids.includes(id) && (_a = {}, _a[id] = state[id], _a))));
            }, {});
        }
    }
    return state;
};
exports.ReconnectableReducer = ReconnectableReducer;
//# sourceMappingURL=reconnectable-reducer.js.map