"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPatcherMiddleware = void 0;
var _DefaultOptions = {
    transform: function (state) { return state; },
    selectDiscrete: function () { return true; },
    selectContinuous: function () { return false; },
};
/**
 * Creates a middleware that checks for changes to the state using
 * given patcher. The patcher in turn notifies subscribers of the changes it detects.
 * @param patcher The patcher to use.
 * @param options Options for the middleware.
 */
function createPatcherMiddleware(patcher, options) {
    if (options === void 0) { options = _DefaultOptions; }
    var transform = options.transform || _DefaultOptions.transform;
    var selectDiscrete = options.selectDiscrete || _DefaultOptions.selectDiscrete;
    var selectContinuous = options.selectContinuous || _DefaultOptions.selectContinuous;
    return function (store) {
        patcher.initialize(transform(store.getState()));
        return function (next) { return function (action) {
            var res = next(action);
            if (selectDiscrete(action)) {
                patcher.check(transform(store.getState()));
            }
            else if (selectContinuous(action)) {
                patcher.checkContinuous(transform(store.getState()));
            }
            return res;
        }; };
    };
}
exports.createPatcherMiddleware = createPatcherMiddleware;
//# sourceMappingURL=patcher-middleware.js.map