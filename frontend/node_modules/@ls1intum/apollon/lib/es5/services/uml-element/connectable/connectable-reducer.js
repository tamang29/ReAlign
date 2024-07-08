"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectableReducer = void 0;
var tslib_1 = require("tslib");
var ConnectableReducer = function (state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case "@@element/connectable/START" /* ConnectableActionTypes.START */: {
            var payload = action.payload;
            return tslib_1.__spreadArray([], tslib_1.__read(new Set(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(payload.ports), false), tslib_1.__read(state), false))), false);
        }
        case "@@element/connectable/END" /* ConnectableActionTypes.END */: {
            var payload_1 = action.payload;
            return state.filter(function (port) { return !payload_1.ports.includes(port); });
        }
        case "@@element/DELETE" /* UMLElementActionTypes.DELETE */: {
            var payload_2 = action.payload;
            return state.reduce(function (ports, port) { return (tslib_1.__assign(tslib_1.__assign({}, ports), (!payload_2.ids.includes(port.element) && port))); }, []);
        }
    }
    return state;
};
exports.ConnectableReducer = ConnectableReducer;
//# sourceMappingURL=connectable-reducer.js.map