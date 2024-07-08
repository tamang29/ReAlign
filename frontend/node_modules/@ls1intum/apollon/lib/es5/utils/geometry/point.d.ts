export interface IPoint {
    x: number;
    y: number;
}
export declare class Point implements IPoint {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    get length(): number;
    normalize(): Point;
    add(x: number, y: number): Point;
    add(x: Point): Point;
    subtract(x: number, y: number): Point;
    subtract(x: Point): Point;
    round(radix?: number): Point;
    scale(factor: number): Point;
    clone(): Point;
}
