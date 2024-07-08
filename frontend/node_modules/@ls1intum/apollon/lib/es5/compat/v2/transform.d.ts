import { UMLModel, UMLRelationship } from '../../typings';
import { UMLModelV2, UMLRelationshipV2 } from './typings';
/**
 *
 * Converts a v2 relationshuip to a v3 relationship.
 *
 * @param {UMLRelationshipV2} relationship to convert
 * @returns {UMLRelationship} the converted relationship
 */
export declare function v2RelationshipToV3Relationship(relationship: UMLRelationshipV2): UMLRelationship;
/**
 *
 * Converts a v3 relationship to a v2 relationship.
 *
 * @param {UMLRelationship} relationship to convert
 * @returns {UMLRelationshipV2} the converted relationship
 */
export declare function v3RelaionshipToV2Relationship(relationship: UMLRelationship): UMLRelationshipV2;
/**
 *
 * Converts a v2 model to a v3 model.
 *
 * @param {UMLModelV2} model model to convert
 * @returns {UMLModel} the converted model
 *
 */
export declare function v2ModeltoV3Model(model: UMLModelV2): UMLModel;
