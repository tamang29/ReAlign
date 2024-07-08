"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setInteractiveRelationship = exports.isInteractiveRelationship = exports.setInteractiveElement = exports.isInteractiveElement = exports.addOrUpdateAssessment = exports.findAssessment = exports.addOrUpdateRelationship = exports.findRelationship = exports.addOrUpdateElement = exports.findElement = void 0;
var v2_1 = require("./v2");
/**
 *
 * Finds an element in the model by id
 *
 * @param {UMLModelCompat} model the model to search
 * @param {string} id the id of the element to find
 * @returns {UMLElement | undefined} the element or undefined if not found
 */
function findElement(model, id) {
    if ((0, v2_1.isV2)(model)) {
        return (0, v2_1.findElement)(model, id);
    }
    else {
        return model.elements[id];
    }
}
exports.findElement = findElement;
/**
 *
 * Adds given element to given model. If element with same id already exists, it will be replaced.
 *
 * @param {UMLModelCompat} model the model to update
 * @param {UMLElement} element the element to add or update
 */
function addOrUpdateElement(model, element) {
    if ((0, v2_1.isV2)(model)) {
        return (0, v2_1.addOrUpdateElement)(model, element);
    }
    else {
        model.elements[element.id] = element;
    }
}
exports.addOrUpdateElement = addOrUpdateElement;
/**
 *
 * Finds a relationship in the model by id
 *
 * @param {UMLModelCompat} model the model to search
 * @param {string} id the id of the relationship to find
 * @returns {UMLRelationship | undefined} the relationship or undefined if not found
 */
function findRelationship(model, id) {
    if ((0, v2_1.isV2)(model)) {
        return (0, v2_1.findRelationship)(model, id);
    }
    else {
        return model.relationships[id];
    }
}
exports.findRelationship = findRelationship;
/**
 *
 * Adds given relationship to given model. If relationship with same id already exists, it will be replaced.
 *
 * @param {UMLModelCompat} model the model to update
 * @param {UMLRelationship} relationship the relationship to add or update
 */
function addOrUpdateRelationship(model, relationship) {
    if ((0, v2_1.isV2)(model)) {
        return (0, v2_1.addOrUpdateRelationship)(model, relationship);
    }
    else {
        model.relationships[relationship.id] = relationship;
    }
}
exports.addOrUpdateRelationship = addOrUpdateRelationship;
/**
 *
 * Finds an assessment in the model by id
 *
 * @param {UMLModelCompat} model the model to search
 * @param {string} id the id of the assessment to find
 * @returns {Assessment | undefined} the assessment or undefined if not found
 */
function findAssessment(model, id) {
    if ((0, v2_1.isV2)(model)) {
        return (0, v2_1.findAssessment)(model, id);
    }
    else {
        return model.assessments[id];
    }
}
exports.findAssessment = findAssessment;
/**
 *
 * Adds given assessment to given model. If assessment with same id already exists, it will be replaced.
 *
 * @param {UMLModelCompat} model the model to update
 * @param {Assessment} assessment the assessment to add or update
 */
function addOrUpdateAssessment(model, assessment) {
    if ((0, v2_1.isV2)(model)) {
        return (0, v2_1.addOrUpdateAssessment)(model, assessment);
    }
    else {
        model.assessments[assessment.modelElementId] = assessment;
    }
}
exports.addOrUpdateAssessment = addOrUpdateAssessment;
/**
 * @returns true if the element is interactive, false otherwise.
 */
function isInteractiveElement(model, id) {
    if ((0, v2_1.isV2)(model)) {
        return (0, v2_1.isInteractiveElement)(model, id);
    }
    else {
        return !!model.interactive.elements[id];
    }
}
exports.isInteractiveElement = isInteractiveElement;
/**
 * Sets the interactive state of the element.
 *
 * @param {UMLModelCompat} model the model to update
 * @param {string} id the id of the element to set interactive state
 * @param {boolean} interactive the interactive state to set
 */
function setInteractiveElement(model, id, interactive) {
    if ((0, v2_1.isV2)(model)) {
        return (0, v2_1.setInteractiveElement)(model, id, interactive);
    }
    else {
        model.interactive.elements[id] = interactive;
    }
}
exports.setInteractiveElement = setInteractiveElement;
/**
 * @returns true if the relationship is interactive, false otherwise.
 */
function isInteractiveRelationship(model, id) {
    if ((0, v2_1.isV2)(model)) {
        return (0, v2_1.isInteractiveRelationship)(model, id);
    }
    else {
        return !!model.interactive.relationships[id];
    }
}
exports.isInteractiveRelationship = isInteractiveRelationship;
/**
 * Sets the interactive state of the relationship.
 *
 * @param {UMLModelCompat} model the model to update
 * @param {string} id the id of the relationship to set interactive state
 * @param {boolean} interactive the interactive state to set
 */
function setInteractiveRelationship(model, id, interactive) {
    if ((0, v2_1.isV2)(model)) {
        return (0, v2_1.setInteractiveRelationship)(model, id, interactive);
    }
    else {
        model.interactive.relationships[id] = interactive;
    }
}
exports.setInteractiveRelationship = setInteractiveRelationship;
//# sourceMappingURL=helpers.js.map