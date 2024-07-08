import { Assessment, UMLElement, UMLRelationship } from '../../typings';
import { UMLModelV2 } from './typings';
/**
 *
 * Finds an element in the model by id
 *
 * @param {UMLModelV2} model the model to search
 * @param {string} id the id of the element to find
 * @returns {UMLElement | undefined} the element or undefined if not found
 */
export declare function findElement(model: UMLModelV2, id: string): UMLElement | undefined;
/**
 *
 * Adds given element to given model. If element with same id already exists, it will be replaced.
 *
 * @param {UMLModelV2} model the model to update
 * @param {UMLElement} element the element to add or update
 */
export declare function addOrUpdateElement(model: UMLModelV2, element: UMLElement): void;
/**
 *
 * Finds a relationship in the model by id
 *
 * @param {UMLModelV2} model the model to search
 * @param {string} id the id of the relationship to find
 * @returns {UMLRelationship | undefined} the relationship or undefined if not found
 */
export declare function findRelationship(model: UMLModelV2, id: string): UMLRelationship | undefined;
/**
 *
 * Adds given relationship to given model. If relationship with same id already exists, it will be replaced.
 *
 * @param {UMLModelV2} model the model to update
 * @param {UMLRelationship} relationship the relationship to add or update
 */
export declare function addOrUpdateRelationship(model: UMLModelV2, relationship: UMLRelationship): void;
/**
 *
 * Finds an assessment in the model by id
 *
 * @param {UMLModelV2} model the model to search
 * @param {string} id the id of the assessment to find
 * @returns {Assessment | undefined} the assessment or undefined if not found
 */
export declare function findAssessment(model: UMLModelV2, id: string): Assessment | undefined;
/**
 *
 * Adds given assessment to given model. If assessment with same id already exists, it will be replaced.
 *
 * @param {UMLModelV2} model the model to update
 * @param {Assessment} assessment the assessment to add or update
 */
export declare function addOrUpdateAssessment(model: UMLModelV2, assessment: Assessment): void;
/**
 * @returns true if given element is interactive, false otherwise
 */
export declare function isInteractiveElement(model: UMLModelV2, id: string): boolean;
/**
 *
 * Sets given element interactive state to given value.
 *
 * @param {UMLModelV2} model the model to update
 * @param {string} id the id of the element to update
 * @param {boolean} interactive the interactive state to set
 */
export declare function setInteractiveElement(model: UMLModelV2, id: string, interactive: boolean): void;
/**
 * @returns true if given relationship is interactive, false otherwise
 */
export declare function isInteractiveRelationship(model: UMLModelV2, id: string): boolean;
/**
 *
 * Sets given relationship interactive state to given value.
 *
 * @param {UMLModelV2} model the model to update
 * @param {string} id the id of the relationship to update
 * @param {boolean} interactive the interactive state to set
 */
export declare function setInteractiveRelationship(model: UMLModelV2, id: string, interactive: boolean): void;
