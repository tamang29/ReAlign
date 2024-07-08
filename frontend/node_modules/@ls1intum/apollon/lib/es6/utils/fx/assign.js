export const assign = (target, source) => {
    for (const key in source) {
        if (Array.isArray(source[key])) {
            if (key === 'selectedBy' && target[key] === undefined) {
                target[key] = [...assign({ ...target, selectedBy: [] }[key], source[key])];
            }
            else {
                target[key] = [...assign(target[key], source[key])];
            }
        }
        else if (typeof source[key] === 'object') {
            if (source[key] == null) {
                target[key] = null;
            }
            else {
                target[key] = { ...target[key], ...assign(target[key], source[key]) };
            }
        }
        else if (source[key] !== undefined) {
            if (target === undefined) {
                target = {};
            }
            target[key] = source[key];
        }
    }
    return target;
};
//# sourceMappingURL=assign.js.map