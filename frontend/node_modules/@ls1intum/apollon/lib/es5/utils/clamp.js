"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clamp = void 0;
/**
 * Clamp a given value to an allowed range
 * @param value The value that should be clamped
 * @param min The minimum allowed value
 * @param max The maximum allowed value
 */
var clamp = function (value, min, max) {
    return Math.max(min, Math.min(value, max));
};
exports.clamp = clamp;
//# sourceMappingURL=clamp.js.map