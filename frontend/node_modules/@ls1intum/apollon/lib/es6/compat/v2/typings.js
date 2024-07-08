import { UMLRelationshipType } from '../../typings';
/**
 *
 * Returns whether the given model is a V2 model.
 *
 * @param {UMLModelCompat} model model to check
 * @returns {boolean} `true` if the model is a V2 model, `false` otherwise
 *
 */
export function isV2(model) {
    return model.version.startsWith('2.');
}
/**
 *
 * Returns whether given relationship is a communication link in v2 schema.
 *
 * @param {UMLRelationship} rel relationship to check
 * @returns {boolean} `true` if the relationship is a communication link, `false` otherwise.
 *
 */
export function isCommunicationLink(rel) {
    return rel.type === UMLRelationshipType.CommunicationLink;
}
//# sourceMappingURL=typings.js.map