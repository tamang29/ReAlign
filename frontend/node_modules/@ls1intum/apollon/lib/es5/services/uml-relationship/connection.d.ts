import { IPoint } from '../../utils/geometry/point';
import { UMLElement } from '../uml-element/uml-element';
import { Direction, IUMLElementPort } from '../uml-element/uml-element-port';
export interface Connection {
    source: IUMLElementPort;
    target: IUMLElementPort;
}
interface Endpoint {
    element: UMLElement;
    direction: Direction;
}
export declare class Connection {
    static computePath(source: Endpoint, target: Endpoint, options: {
        isStraight: boolean;
        isVariable: boolean;
    }): IPoint[];
    private static tryFindStraightPath;
}
export {};
