"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setInteractiveRelationship = exports.isInteractiveRelationship = exports.setInteractiveElement = exports.isInteractiveElement = exports.addOrUpdateAssessment = exports.findAssessment = exports.addOrUpdateRelationship = exports.findRelationship = exports.addOrUpdateElement = exports.findElement = void 0;
var transform_1 = require("./transform");
/**
 *
 * Finds an element in the model by id
 *
 * @param {UMLModelV2} model the model to search
 * @param {string} id the id of the element to find
 * @returns {UMLElement | undefined} the element or undefined if not found
 */
function findElement(model, id) {
    return model.elements.find(function (element) { return element.id === id; });
}
exports.findElement = findElement;
/**
 *
 * Adds given element to given model. If element with same id already exists, it will be replaced.
 *
 * @param {UMLModelV2} model the model to update
 * @param {UMLElement} element the element to add or update
 */
function addOrUpdateElement(model, element) {
    var priorIndex = model.elements.findIndex(function (e) { return e.id === element.id; });
    if (priorIndex >= 0) {
        model.elements[priorIndex] = element;
    }
    else {
        model.elements.push(element);
    }
}
exports.addOrUpdateElement = addOrUpdateElement;
/**
 *
 * Finds a relationship in the model by id
 *
 * @param {UMLModelV2} model the model to search
 * @param {string} id the id of the relationship to find
 * @returns {UMLRelationship | undefined} the relationship or undefined if not found
 */
function findRelationship(model, id) {
    var candidate = model.relationships.find(function (relationship) { return relationship.id === id; });
    return candidate && (0, transform_1.v2RelationshipToV3Relationship)(candidate);
}
exports.findRelationship = findRelationship;
/**
 *
 * Adds given relationship to given model. If relationship with same id already exists, it will be replaced.
 *
 * @param {UMLModelV2} model the model to update
 * @param {UMLRelationship} relationship the relationship to add or update
 */
function addOrUpdateRelationship(model, relationship) {
    var v2rel = (0, transform_1.v3RelaionshipToV2Relationship)(relationship);
    var priorIndex = model.relationships.findIndex(function (r) { return r.id === relationship.id; });
    if (priorIndex >= 0) {
        model.relationships[priorIndex] = v2rel;
    }
    else {
        model.relationships.push(v2rel);
    }
}
exports.addOrUpdateRelationship = addOrUpdateRelationship;
/**
 *
 * Finds an assessment in the model by id
 *
 * @param {UMLModelV2} model the model to search
 * @param {string} id the id of the assessment to find
 * @returns {Assessment | undefined} the assessment or undefined if not found
 */
function findAssessment(model, id) {
    return model.assessments.find(function (assessment) { return assessment.modelElementId === id; });
}
exports.findAssessment = findAssessment;
/**
 *
 * Adds given assessment to given model. If assessment with same id already exists, it will be replaced.
 *
 * @param {UMLModelV2} model the model to update
 * @param {Assessment} assessment the assessment to add or update
 */
function addOrUpdateAssessment(model, assessment) {
    var priorIndex = model.assessments.findIndex(function (a) { return a.modelElementId === assessment.modelElementId; });
    if (priorIndex >= 0) {
        model.assessments[priorIndex] = assessment;
    }
    else {
        model.assessments.push(assessment);
    }
}
exports.addOrUpdateAssessment = addOrUpdateAssessment;
/**
 * @returns true if given element is interactive, false otherwise
 */
function isInteractiveElement(model, id) {
    return model.interactive.elements.includes(id);
}
exports.isInteractiveElement = isInteractiveElement;
/**
 *
 * Sets given element interactive state to given value.
 *
 * @param {UMLModelV2} model the model to update
 * @param {string} id the id of the element to update
 * @param {boolean} interactive the interactive state to set
 */
function setInteractiveElement(model, id, interactive) {
    if (interactive) {
        if (!isInteractiveElement(model, id)) {
            model.interactive.elements.push(id);
        }
    }
    else {
        var index = model.interactive.elements.indexOf(id);
        if (index >= 0) {
            model.interactive.elements.splice(index, 1);
        }
    }
}
exports.setInteractiveElement = setInteractiveElement;
/**
 * @returns true if given relationship is interactive, false otherwise
 */
function isInteractiveRelationship(model, id) {
    return model.interactive.relationships.includes(id);
}
exports.isInteractiveRelationship = isInteractiveRelationship;
/**
 *
 * Sets given relationship interactive state to given value.
 *
 * @param {UMLModelV2} model the model to update
 * @param {string} id the id of the relationship to update
 * @param {boolean} interactive the interactive state to set
 */
function setInteractiveRelationship(model, id, interactive) {
    if (interactive) {
        if (!isInteractiveRelationship(model, id)) {
            model.interactive.relationships.push(id);
        }
    }
    else {
        var index = model.interactive.relationships.indexOf(id);
        if (index >= 0) {
            model.interactive.relationships.splice(index, 1);
        }
    }
}
exports.setInteractiveRelationship = setInteractiveRelationship;
//# sourceMappingURL=helpers.js.map