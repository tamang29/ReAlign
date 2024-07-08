export const update = (target, source) => {
    let clone = { ...target };
    for (let [key, value] of Object.entries(source)) {
        if (value instanceof Object) {
            value = update(clone[key], value);
        }
        clone = { ...clone, [key]: value };
    }
    return clone;
};
//# sourceMappingURL=update.js.map