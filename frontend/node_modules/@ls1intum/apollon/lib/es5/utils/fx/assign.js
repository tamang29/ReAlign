"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assign = void 0;
var tslib_1 = require("tslib");
var assign = function (target, source) {
    for (var key in source) {
        if (Array.isArray(source[key])) {
            if (key === 'selectedBy' && target[key] === undefined) {
                target[key] = tslib_1.__spreadArray([], tslib_1.__read((0, exports.assign)(tslib_1.__assign(tslib_1.__assign({}, target), { selectedBy: [] })[key], source[key])), false);
            }
            else {
                target[key] = tslib_1.__spreadArray([], tslib_1.__read((0, exports.assign)(target[key], source[key])), false);
            }
        }
        else if (typeof source[key] === 'object') {
            if (source[key] == null) {
                target[key] = null;
            }
            else {
                target[key] = tslib_1.__assign(tslib_1.__assign({}, target[key]), (0, exports.assign)(target[key], source[key]));
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
exports.assign = assign;
//# sourceMappingURL=assign.js.map