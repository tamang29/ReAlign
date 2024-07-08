"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResizingReducer = void 0;
var tslib_1 = require("tslib");
var ResizingReducer = function (state, action) {
    if (state === void 0) { state = {}; }
    var obj = { x: 0, y: 0 };
    var getUpdatedPosition = function (elem, payload, resizeFrom) {
        switch (resizeFrom) {
            case "topLeft" /* ResizeFrom.TOPLEFT */:
                obj.x = Math.min(elem.x - payload.delta.width, elem.x + elem.width);
                obj.y = Math.min(elem.y - payload.delta.height, elem.y + elem.height);
                break;
            case "topRight" /* ResizeFrom.TOPRIGHT */:
                obj.x = elem.x;
                obj.y = Math.min(elem.y - payload.delta.height, elem.y + elem.height);
                break;
            case "bottomLeft" /* ResizeFrom.BOTTOMLEFT */:
                obj.x = Math.min(elem.x - payload.delta.width, elem.x + elem.width);
                obj.y = elem.y;
                break;
            case "bottomRight" /* ResizeFrom.BOTTOMRIGHT */:
                obj.x = elem.x;
                obj.y = elem.y;
                break;
            default:
                obj.x = elem.x;
                obj.y = elem.y;
                break;
        }
        return obj;
    };
    switch (action.type) {
        case "@@element/resizable/RESIZE" /* ResizingActionTypes.RESIZE */: {
            var payload_1 = action.payload;
            return payload_1.ids.reduce(function (elements, id) {
                var _a;
                return (tslib_1.__assign(tslib_1.__assign({}, elements), (id in elements && (_a = {},
                    _a[id] = tslib_1.__assign(tslib_1.__assign({}, elements[id]), { bounds: tslib_1.__assign(tslib_1.__assign({}, elements[id].bounds), { x: getUpdatedPosition(elements[id].bounds, payload_1, payload_1.resizeFrom).x, y: getUpdatedPosition(elements[id].bounds, payload_1, payload_1.resizeFrom).y, width: Math.max(elements[id].bounds.width + payload_1.delta.width, 0), height: Math.max(elements[id].bounds.height + payload_1.delta.height, 0) }), resizeFrom: payload_1.resizeFrom }),
                    _a))));
            }, state);
        }
    }
    return state;
};
exports.ResizingReducer = ResizingReducer;
//# sourceMappingURL=resizing-reducer.js.map