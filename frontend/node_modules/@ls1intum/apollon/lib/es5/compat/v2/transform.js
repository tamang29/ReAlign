"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v2ModeltoV3Model = exports.v3RelaionshipToV2Relationship = exports.v2RelationshipToV3Relationship = void 0;
var tslib_1 = require("tslib");
var typings_1 = require("./typings");
/**
 *
 * Converts a v2 relationshuip to a v3 relationship.
 *
 * @param {UMLRelationshipV2} relationship to convert
 * @returns {UMLRelationship} the converted relationship
 */
function v2RelationshipToV3Relationship(relationship) {
    if ((0, typings_1.isCommunicationLink)(relationship)) {
        return tslib_1.__assign(tslib_1.__assign({}, relationship), { messages: relationship.messages.reduce(function (acc, val) {
                var _a;
                return (tslib_1.__assign(tslib_1.__assign({}, acc), (_a = {}, _a[val.id] = val, _a)));
            }, {}) });
    }
    else {
        return relationship;
    }
}
exports.v2RelationshipToV3Relationship = v2RelationshipToV3Relationship;
/**
 *
 * Converts a v3 relationship to a v2 relationship.
 *
 * @param {UMLRelationship} relationship to convert
 * @returns {UMLRelationshipV2} the converted relationship
 */
function v3RelaionshipToV2Relationship(relationship) {
    if ((0, typings_1.isCommunicationLink)(relationship)) {
        return tslib_1.__assign(tslib_1.__assign({}, relationship), { messages: Object.values(relationship.messages) });
    }
    else {
        return relationship;
    }
}
exports.v3RelaionshipToV2Relationship = v3RelaionshipToV2Relationship;
/**
 *
 * Converts a v2 model to a v3 model.
 *
 * @param {UMLModelV2} model model to convert
 * @returns {UMLModel} the converted model
 *
 */
function v2ModeltoV3Model(model) {
    var elements = Array.isArray(model.elements) ? model.elements : [];
    var relationships = Array.isArray(model.relationships) ? model.relationships : [];
    var assessments = Array.isArray(model.assessments) ? model.assessments : [];
    var interactive = model.interactive || { elements: [], relationships: [] };
    return tslib_1.__assign(tslib_1.__assign({}, model), { version: '3.0.0', elements: elements.reduce(function (acc, val) {
            var _a;
            return (tslib_1.__assign(tslib_1.__assign({}, acc), (_a = {}, _a[val.id] = val, _a)));
        }, {}), relationships: relationships
            .map(v2RelationshipToV3Relationship)
            .reduce(function (acc, val) {
            var _a;
            return (tslib_1.__assign(tslib_1.__assign({}, acc), (_a = {}, _a[val.id] = val, _a)));
        }, {}), assessments: assessments.reduce(function (acc, val) {
            var _a;
            return (tslib_1.__assign(tslib_1.__assign({}, acc), (_a = {}, _a[val.modelElementId] = val, _a)));
        }, {}), interactive: {
            elements: interactive.elements.reduce(function (acc, val) {
                var _a;
                return (tslib_1.__assign(tslib_1.__assign({}, acc), (_a = {}, _a[val] = true, _a)));
            }, {}),
            relationships: interactive.relationships.reduce(function (acc, val) {
                var _a;
                return (tslib_1.__assign(tslib_1.__assign({}, acc), (_a = {}, _a[val] = true, _a)));
            }, {}),
        } });
}
exports.v2ModeltoV3Model = v2ModeltoV3Model;
//# sourceMappingURL=transform.js.map