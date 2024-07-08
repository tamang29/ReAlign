"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPatcherReducer = void 0;
var tslib_1 = require("tslib");
var _DefaultOptions = {
    transform: function (state) { return state; },
    transformInverse: function (state) { return state; },
    merge: function (oldState, newState) { return (tslib_1.__assign(tslib_1.__assign({}, oldState), newState)); },
};
/**
 * Creates a reducer that applies patches to the state using
 * given patcher.
 * @param patcher The patcher to use.
 * @param options Options for the reducer.
 */
function createPatcherReducer(patcher, options) {
    if (options === void 0) { options = _DefaultOptions; }
    var transform = options.transform || _DefaultOptions.transform;
    var transformInverse = options.transformInverse || _DefaultOptions.transformInverse;
    var merge = options.merge || _DefaultOptions.merge;
    return function (state, action) {
        var type = action.type, payload = action.payload;
        if (type === "@@patcher/PATCH" /* PatcherActionTypes.PATCH */) {
            var res = patcher.patch(payload, transformInverse(state));
            if (res.patched) {
                return merge((state !== null && state !== void 0 ? state : {}), transform(res.result));
            }
        }
        return state;
    };
}
exports.createPatcherReducer = createPatcherReducer;
//# sourceMappingURL=patcher-reducer.js.map