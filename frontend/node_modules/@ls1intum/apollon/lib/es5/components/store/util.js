"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayToInclusionMap = exports.inclusionMapToArray = void 0;
var tslib_1 = require("tslib");
/**
 *
 * converts an inclusion map of strings to an array of strings.
 * inclusion maps emulate a set of strings (e.g. identifiers).
 *
 * @param {{[id: string]: boolean}} map - an inclusion map for strings
 * @returns {string[]} - an array of all included strings
 *
 */
function inclusionMapToArray(map) {
    return Object.entries(map)
        .filter(function (_a) {
        var _b = tslib_1.__read(_a, 2), value = _b[1];
        return value;
    })
        .map(function (_a) {
        var _b = tslib_1.__read(_a, 1), key = _b[0];
        return key;
    });
}
exports.inclusionMapToArray = inclusionMapToArray;
/**
 *
 * converts an array of strings to an inclusion map of strings.
 * inclusion maps emulate a set of strings (e.g. identifiers).
 *
 * @param {string[]} array - an array of strings
 * @returns {{[id: string]: boolean}} - an inclusion map for all strings in the array
 *
 */
function arrayToInclusionMap(array) {
    return array.reduce(function (acc, val) {
        var _a;
        return (tslib_1.__assign(tslib_1.__assign({}, acc), (_a = {}, _a[val] = true, _a)));
    }, {});
}
exports.arrayToInclusionMap = arrayToInclusionMap;
//# sourceMappingURL=util.js.map