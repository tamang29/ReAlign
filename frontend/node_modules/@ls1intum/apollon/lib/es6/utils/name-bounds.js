import { computeBoundingBoxForElements } from '../utils/geometry/boundary';
import { Text } from '../utils/svg/text';
export function calculateNameBounds(element, layer) {
    const radix = 10;
    const nameBounds = {
        x: element.bounds.x,
        y: element.bounds.y,
        width: Math.round((Text.size(layer, element.name, { fontWeight: 'bold' }).width + 20) / radix) * radix,
        height: Math.round((Text.size(layer, element.name, { fontWeight: 'bold' }).height + 20) / radix) * radix,
    };
    return computeBoundingBoxForElements([element, { bounds: nameBounds }]);
}
//# sourceMappingURL=name-bounds.js.map