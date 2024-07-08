"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovingReducer = void 0;
var tslib_1 = require("tslib");
var MovingReducer = function (state, action) {
    if (state === void 0) { state = {}; }
    switch (action.type) {
        case "@@element/movable/MOVE" /* MovingActionTypes.MOVE */: {
            var payload_1 = action.payload;
            return payload_1.ids.reduce(function (elements, id) {
                var _a;
                return (tslib_1.__assign(tslib_1.__assign({}, elements), (id in elements && (_a = {},
                    _a[id] = tslib_1.__assign(tslib_1.__assign({}, elements[id]), { bounds: tslib_1.__assign(tslib_1.__assign({}, elements[id].bounds), { x: elements[id].bounds.x + payload_1.delta.x, y: elements[id].bounds.y + payload_1.delta.y }) }),
                    _a))));
            }, state);
        }
    }
    return state;
};
exports.MovingReducer = MovingReducer;
//# sourceMappingURL=moving-reducer.js.map