"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = void 0;
var tslib_1 = require("tslib");
/**
 * Merges the old state with the new state. In particular, it maintains
 * all potential prototypes, and gracefully updates owned elements list in the
 * diagram. The boundaries of the diagram are NOT updated, which is to be done, if
 * necessary, by some subsequent side-effect.
 * @param oldState
 * @param newState
 * @returns The merged state.
 */
function merge(oldState, newState) {
    return tslib_1.__assign(tslib_1.__assign({}, oldState), { diagram: tslib_1.__assign(tslib_1.__assign({}, oldState.diagram), { ownedElements: Object.keys(newState.elements).filter(function (id) { return !newState.elements[id].owner; }), ownedRelationships: oldState.diagram.ownedRelationships.filter(function (id) { return !!newState.elements[id]; }) }), elements: Object.keys(newState.elements).reduce(function (acc, id) {
            var _a;
            return tslib_1.__assign(tslib_1.__assign({}, acc), (_a = {}, _a[id] = tslib_1.__assign(tslib_1.__assign({}, oldState.elements[id]), newState.elements[id]), _a));
        }, {}), interactive: newState.interactive, assessments: Object.keys(newState.assessments).reduce(function (acc, id) {
            var _a;
            return tslib_1.__assign(tslib_1.__assign({}, acc), (_a = {}, _a[id] = tslib_1.__assign(tslib_1.__assign({}, oldState.assessments[id]), newState.assessments[id]), _a));
        }, {}) });
}
exports.merge = merge;
//# sourceMappingURL=merge.js.map