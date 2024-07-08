"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateNameBounds = void 0;
var boundary_1 = require("../utils/geometry/boundary");
var text_1 = require("../utils/svg/text");
function calculateNameBounds(element, layer) {
    var radix = 10;
    var nameBounds = {
        x: element.bounds.x,
        y: element.bounds.y,
        width: Math.round((text_1.Text.size(layer, element.name, { fontWeight: 'bold' }).width + 20) / radix) * radix,
        height: Math.round((text_1.Text.size(layer, element.name, { fontWeight: 'bold' }).height + 20) / radix) * radix,
    };
    return (0, boundary_1.computeBoundingBoxForElements)([element, { bounds: nameBounds }]);
}
exports.calculateNameBounds = calculateNameBounds;
//# sourceMappingURL=name-bounds.js.map