"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = void 0;
var fast_json_patch_1 = require("fast-json-patch");
/**
 * Compares two objects and returns the difference
 * in the form of a [JSON patch](http://jsonpatch.com/)
 */
function compare(a, b) {
    var patch = (0, fast_json_patch_1.compare)(a, b).filter(function (op) { return !op.path.startsWith('/size'); });
    var relationshipIdsWithAffectedPaths = [];
    patch.forEach(function (op) {
        var _a;
        var match = /\/relationships\/(?<id>[\w-]+)\/path/g.exec(op.path);
        if (((_a = match === null || match === void 0 ? void 0 : match.groups) === null || _a === void 0 ? void 0 : _a.id) && !relationshipIdsWithAffectedPaths.includes(match.groups.id)) {
            relationshipIdsWithAffectedPaths.push(match.groups.id);
        }
    });
    var cleanedPatch = patch.filter(function (op) {
        var _a;
        var match = /\/relationships\/(?<id>[\w-]+)\//g.exec(op.path);
        return !((_a = match === null || match === void 0 ? void 0 : match.groups) === null || _a === void 0 ? void 0 : _a.id) || !relationshipIdsWithAffectedPaths.includes(match.groups.id);
    });
    relationshipIdsWithAffectedPaths.forEach(function (id) {
        var brel = b.relationships[id];
        cleanedPatch.push({
            op: 'replace',
            path: "/relationships/".concat(id, "/isManuallyLayouted"),
            value: brel.isManuallyLayouted,
        });
        cleanedPatch.push({
            op: 'replace',
            path: "/relationships/".concat(id, "/path"),
            value: brel.path,
        });
        cleanedPatch.push({
            op: 'replace',
            path: "/relationships/".concat(id, "/bounds"),
            value: brel.bounds,
        });
    });
    return cleanedPatch;
}
exports.compare = compare;
//# sourceMappingURL=compare.js.map