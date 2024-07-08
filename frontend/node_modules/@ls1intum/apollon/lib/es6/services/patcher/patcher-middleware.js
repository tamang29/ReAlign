const _DefaultOptions = {
    transform: (state) => state,
    selectDiscrete: () => true,
    selectContinuous: () => false,
};
/**
 * Creates a middleware that checks for changes to the state using
 * given patcher. The patcher in turn notifies subscribers of the changes it detects.
 * @param patcher The patcher to use.
 * @param options Options for the middleware.
 */
export function createPatcherMiddleware(patcher, options = _DefaultOptions) {
    const transform = options.transform || _DefaultOptions.transform;
    const selectDiscrete = options.selectDiscrete || _DefaultOptions.selectDiscrete;
    const selectContinuous = options.selectContinuous || _DefaultOptions.selectContinuous;
    return (store) => {
        patcher.initialize(transform(store.getState()));
        return (next) => (action) => {
            const res = next(action);
            if (selectDiscrete(action)) {
                patcher.check(transform(store.getState()));
            }
            else if (selectContinuous(action)) {
                patcher.checkContinuous(transform(store.getState()));
            }
            return res;
        };
    };
}
//# sourceMappingURL=patcher-middleware.js.map