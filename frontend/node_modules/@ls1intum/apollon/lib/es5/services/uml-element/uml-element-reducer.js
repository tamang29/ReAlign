"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLElementReducer = void 0;
var tslib_1 = require("tslib");
var UMLElementReducer = function (state, action) {
    if (state === void 0) { state = {}; }
    switch (action.type) {
        case "@@element/CREATE" /* UMLElementActionTypes.CREATE */: {
            var payload = action.payload;
            return payload.values.reduce(function (elements, values) {
                var _a;
                return (tslib_1.__assign(tslib_1.__assign({}, elements), (_a = {}, _a[values.id] = values, _a)));
            }, state);
        }
        case "@@element/UPDATE" /* UMLElementActionTypes.UPDATE */: {
            var payload = action.payload;
            return payload.values.reduce(function (elements, values) {
                var _a;
                return (tslib_1.__assign(tslib_1.__assign({}, elements), (_a = {}, _a[values.id] = tslib_1.__assign(tslib_1.__assign({}, elements[values.id]), values), _a)));
            }, state);
        }
        case "@@element/DELETE" /* UMLElementActionTypes.DELETE */: {
            var payload_1 = action.payload;
            return Object.keys(state).reduce(function (elements, id) {
                var _a;
                return (tslib_1.__assign(tslib_1.__assign({}, elements), (!payload_1.ids.includes(id) && (_a = {}, _a[id] = state[id], _a))));
            }, {});
        }
    }
    return state;
};
exports.UMLElementReducer = UMLElementReducer;
//# sourceMappingURL=uml-element-reducer.js.map