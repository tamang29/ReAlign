/**
 * Clamp a given value to an allowed range
 * @param value The value that should be clamped
 * @param min The minimum allowed value
 * @param max The maximum allowed value
 */
export const clamp = (value, min, max) => {
    return Math.max(min, Math.min(value, max));
};
//# sourceMappingURL=clamp.js.map