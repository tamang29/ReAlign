"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.backwardsCompatibleModel = void 0;
var tslib_1 = require("tslib");
var v2_1 = require("./v2");
/**
 *
 * Converts a model to the latest version.
 *
 * @param {UMLModelCompat} model model to convert
 * @returns {UMLModel} the converted model
 *
 */
function backwardsCompatibleModel(model) {
    if ((0, v2_1.isV2)(model)) {
        return (0, v2_1.v2ModeltoV3Model)(model);
    }
    else {
        return model;
    }
}
exports.backwardsCompatibleModel = backwardsCompatibleModel;
tslib_1.__exportStar(require("./helpers"), exports);
//# sourceMappingURL=index.js.map