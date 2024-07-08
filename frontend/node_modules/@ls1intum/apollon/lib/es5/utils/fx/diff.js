"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diff = void 0;
var tslib_1 = require("tslib");
var diff = function (lhs, rhs) {
    var deletedValues = Object.keys(lhs).reduce(function (acc, key) {
        var _a;
        return rhs.hasOwnProperty(key) ? acc : tslib_1.__assign(tslib_1.__assign({}, acc), (_a = {}, _a[key] = undefined, _a));
    }, {});
    return Object.keys(rhs).reduce(function (acc, key) {
        var _a, _b, _c, _d;
        if (!lhs.hasOwnProperty(key))
            return tslib_1.__assign(tslib_1.__assign({}, acc), (_a = {}, _a[key] = rhs[key], _a));
        if (lhs[key] === rhs[key])
            return acc;
        if (Array.isArray(lhs[key])) {
            return tslib_1.__assign(tslib_1.__assign({}, acc), (_b = {}, _b[key] = rhs[key], _b));
        }
        if (typeof lhs[key] === 'object') {
            var difference = (0, exports.diff)(lhs[key], rhs[key]);
            if (Object.keys(difference).length) {
                return tslib_1.__assign(tslib_1.__assign({}, acc), (_c = {}, _c[key] = (0, exports.diff)(lhs[key], rhs[key]), _c));
            }
            else {
                return acc;
            }
        }
        return tslib_1.__assign(tslib_1.__assign({}, acc), (_d = {}, _d[key] = rhs[key], _d));
    }, deletedValues);
};
exports.diff = diff;
//# sourceMappingURL=diff.js.map