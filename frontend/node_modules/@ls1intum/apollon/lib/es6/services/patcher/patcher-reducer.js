const _DefaultOptions = {
    transform: (state) => state,
    transformInverse: (state) => state,
    merge: (oldState, newState) => ({ ...oldState, ...newState }),
};
/**
 * Creates a reducer that applies patches to the state using
 * given patcher.
 * @param patcher The patcher to use.
 * @param options Options for the reducer.
 */
export function createPatcherReducer(patcher, options = _DefaultOptions) {
    const transform = options.transform || _DefaultOptions.transform;
    const transformInverse = options.transformInverse || _DefaultOptions.transformInverse;
    const merge = options.merge || _DefaultOptions.merge;
    return (state, action) => {
        const { type, payload } = action;
        if (type === "@@patcher/PATCH" /* PatcherActionTypes.PATCH */) {
            const res = patcher.patch(payload, transformInverse(state));
            if (res.patched) {
                return merge((state ?? {}), transform(res.result));
            }
        }
        return state;
    };
}
//# sourceMappingURL=patcher-reducer.js.map