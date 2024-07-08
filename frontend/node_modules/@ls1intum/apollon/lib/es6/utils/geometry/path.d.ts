import { IPoint, Point } from './point';
export type IPath = [IPoint, IPoint, ...IPoint[]];
export declare class Path {
    path: IPath;
    constructor(path?: IPath);
    get length(): number;
    position(distance?: number): Point;
}
