import { UMLModel } from '../typings';
import { UMLModelCompat } from './typings';
/**
 *
 * Converts a model to the latest version.
 *
 * @param {UMLModelCompat} model model to convert
 * @returns {UMLModel} the converted model
 *
 */
export declare function backwardsCompatibleModel(model: UMLModelCompat): UMLModel;
export type { UMLModelCompat } from './typings';
export * from './helpers';
