import { isV2, v2ModeltoV3Model } from './v2';
/**
 *
 * Converts a model to the latest version.
 *
 * @param {UMLModelCompat} model model to convert
 * @returns {UMLModel} the converted model
 *
 */
export function backwardsCompatibleModel(model) {
    if (isV2(model)) {
        return v2ModeltoV3Model(model);
    }
    else {
        return model;
    }
}
export * from './helpers';
//# sourceMappingURL=index.js.map