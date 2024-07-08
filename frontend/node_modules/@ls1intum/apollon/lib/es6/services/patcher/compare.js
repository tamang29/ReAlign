import { compare as comparePatches } from 'fast-json-patch';
/**
 * Compares two objects and returns the difference
 * in the form of a [JSON patch](http://jsonpatch.com/)
 */
export function compare(a, b) {
    const patch = comparePatches(a, b).filter((op) => !op.path.startsWith('/size'));
    const relationshipIdsWithAffectedPaths = [];
    patch.forEach((op) => {
        const match = /\/relationships\/(?<id>[\w-]+)\/path/g.exec(op.path);
        if (match?.groups?.id && !relationshipIdsWithAffectedPaths.includes(match.groups.id)) {
            relationshipIdsWithAffectedPaths.push(match.groups.id);
        }
    });
    const cleanedPatch = patch.filter((op) => {
        const match = /\/relationships\/(?<id>[\w-]+)\//g.exec(op.path);
        return !match?.groups?.id || !relationshipIdsWithAffectedPaths.includes(match.groups.id);
    });
    relationshipIdsWithAffectedPaths.forEach((id) => {
        const brel = b.relationships[id];
        cleanedPatch.push({
            op: 'replace',
            path: `/relationships/${id}/isManuallyLayouted`,
            value: brel.isManuallyLayouted,
        });
        cleanedPatch.push({
            op: 'replace',
            path: `/relationships/${id}/path`,
            value: brel.path,
        });
        cleanedPatch.push({
            op: 'replace',
            path: `/relationships/${id}/bounds`,
            value: brel.bounds,
        });
    });
    return cleanedPatch;
}
//# sourceMappingURL=compare.js.map