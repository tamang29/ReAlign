"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCommunicationLink = exports.isV2 = void 0;
var typings_1 = require("../../typings");
/**
 *
 * Returns whether the given model is a V2 model.
 *
 * @param {UMLModelCompat} model model to check
 * @returns {boolean} `true` if the model is a V2 model, `false` otherwise
 *
 */
function isV2(model) {
    return model.version.startsWith('2.');
}
exports.isV2 = isV2;
/**
 *
 * Returns whether given relationship is a communication link in v2 schema.
 *
 * @param {UMLRelationship} rel relationship to check
 * @returns {boolean} `true` if the relationship is a communication link, `false` otherwise.
 *
 */
function isCommunicationLink(rel) {
    return rel.type === typings_1.UMLRelationshipType.CommunicationLink;
}
exports.isCommunicationLink = isCommunicationLink;
//# sourceMappingURL=typings.js.map