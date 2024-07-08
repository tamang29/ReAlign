import { Point } from './point';
export interface IBoundary {
    x: number;
    y: number;
    width: number;
    height: number;
}
/**
 * Compute a bounding box for a set of points
 * @param points The points that should be contained within the bounding box
 */
export declare function computeBoundingBox(points: Point[]): IBoundary;
/**
 * Calculate the bounding box for a set of elements
 * @param elements The elements for which a common bounding box should be calculated
 */
export declare function computeBoundingBoxForElements(elements: {
    bounds: IBoundary;
}[]): IBoundary;
export declare function computeDimension(scale: number, value: number, isCircle?: boolean): number;
/**
 * Check whether a given element is intersected by a boundary. This method is used for checking if an element is
 * intersected.
 *
 * @param bounds The bounds for which intersection by the intersecting boundaries is determined
 * @param intersectingBounds The potentially intersecting bounds
 */
export declare const areBoundsIntersecting: (bounds: IBoundary, intersectingBounds: IBoundary) => boolean;
