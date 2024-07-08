"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.areBoundsIntersecting = exports.computeDimension = exports.computeBoundingBoxForElements = exports.computeBoundingBox = void 0;
var tslib_1 = require("tslib");
/**
 * Compute a bounding box for a set of points
 * @param points The points that should be contained within the bounding box
 */
function computeBoundingBox(points) {
    var e_1, _a;
    if (points.length === 0) {
        return { x: 0, y: 0, width: 0, height: 0 };
    }
    var firstPoint = points[0];
    var minX = firstPoint.x;
    var minY = firstPoint.y;
    var maxX = firstPoint.x;
    var maxY = firstPoint.y;
    try {
        for (var points_1 = tslib_1.__values(points), points_1_1 = points_1.next(); !points_1_1.done; points_1_1 = points_1.next()) {
            var p = points_1_1.value;
            if (p.x < minX)
                minX = p.x;
            if (p.y < minY)
                minY = p.y;
            if (p.x > maxX)
                maxX = p.x;
            if (p.y > maxY)
                maxY = p.y;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (points_1_1 && !points_1_1.done && (_a = points_1.return)) _a.call(points_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
    };
}
exports.computeBoundingBox = computeBoundingBox;
/**
 * Calculate the bounding box for a set of elements
 * @param elements The elements for which a common bounding box should be calculated
 */
function computeBoundingBoxForElements(elements) {
    if (!elements.length) {
        return { x: 0, y: 0, width: 0, height: 0 };
    }
    var boundaries = elements.map(function (element) { return (tslib_1.__assign({}, element.bounds)); });
    var x = Math.min.apply(Math, tslib_1.__spreadArray([], tslib_1.__read(boundaries.map(function (bounds) { return bounds.x; })), false));
    var y = Math.min.apply(Math, tslib_1.__spreadArray([], tslib_1.__read(boundaries.map(function (bounds) { return bounds.y; })), false));
    var width = Math.max.apply(Math, tslib_1.__spreadArray([], tslib_1.__read(boundaries.map(function (bounds) { return bounds.x + bounds.width; })), false)) - x;
    var height = Math.max.apply(Math, tslib_1.__spreadArray([], tslib_1.__read(boundaries.map(function (bounds) { return bounds.y + bounds.height; })), false)) - y;
    return { x: x, y: y, width: width, height: height };
}
exports.computeBoundingBoxForElements = computeBoundingBoxForElements;
function computeDimension(scale, value, isCircle) {
    if (isCircle && scale === 1) {
        return value * scale;
    }
    else {
        return Math.round((value * scale) / 10) * 10;
    }
}
exports.computeDimension = computeDimension;
/**
 * Check whether a given element is intersected by a boundary. This method is used for checking if an element is
 * intersected.
 *
 * @param bounds The bounds for which intersection by the intersecting boundaries is determined
 * @param intersectingBounds The potentially intersecting bounds
 */
var areBoundsIntersecting = function (bounds, intersectingBounds) {
    var cornerPoints = [
        { x: bounds.x, y: bounds.y },
        { x: bounds.x + bounds.width, y: bounds.y },
        { x: bounds.x + bounds.width, y: bounds.y + bounds.height },
        { x: bounds.x, y: bounds.y + bounds.height },
    ];
    var intersectingBoundsStartX = Math.min(intersectingBounds.x, intersectingBounds.x + intersectingBounds.width);
    var intersectingBoundsEndX = Math.max(intersectingBounds.x, intersectingBounds.x + intersectingBounds.width);
    var intersectingBoundsStartY = Math.min(intersectingBounds.y, intersectingBounds.y + intersectingBounds.height);
    var intersectingBoundsEndY = Math.max(intersectingBounds.y, intersectingBounds.y + intersectingBounds.height);
    // Determine if the given bounds are at least partially contained within the intersecting bounds
    return cornerPoints.some(function (point) {
        return intersectingBoundsStartX <= point.x &&
            point.x <= intersectingBoundsEndX &&
            intersectingBoundsStartY <= point.y &&
            point.y <= intersectingBoundsEndY;
    });
};
exports.areBoundsIntersecting = areBoundsIntersecting;
//# sourceMappingURL=boundary.js.map