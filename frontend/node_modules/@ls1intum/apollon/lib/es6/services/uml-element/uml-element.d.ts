import { DeepPartial } from 'redux';
import { UMLDiagramType } from '../../packages/diagram-type';
import { UMLElementType } from '../../packages/uml-element-type';
import { UMLRelationshipType } from '../../packages/uml-relationship-type';
import * as Apollon from '../../typings';
import { IBoundary } from '../../utils/geometry/boundary';
import { Point } from '../../utils/geometry/point';
import { ILayer } from '../layouter/layer';
import { ILayoutable } from '../layouter/layoutable';
import { UMLElementFeatures } from './uml-element-features';
import { Direction } from './uml-element-port';
/** Interface of a `UMLElement` defining the properties persisted in the internal storage */
export interface IUMLElement {
    /** Unique Identifier of the `UMLElement` */
    id: string;
    /** Visual name of the `UMLElement` */
    name: string;
    /** Distinct type to recreate the `UMLElement` */
    type: UMLElementType | UMLRelationshipType | UMLDiagramType;
    /** Optional owner of the `UMLElement` */
    owner: string | null;
    /** Position and sizing of the `UMLElement` */
    bounds: IBoundary;
    /** Highlight the element with a specified color */
    highlight?: string;
    /** Colors of the element */
    fillColor?: string;
    strokeColor?: string;
    textColor?: string;
    /** Note to show for element's assessment */
    assessmentNote?: string;
    isManuallyLayouted?: boolean;
}
export declare const enum ResizeFrom {
    TOPLEFT = "topLeft",
    TOPRIGHT = "topRight",
    BOTTOMLEFT = "bottomLeft",
    BOTTOMRIGHT = "bottomRight"
}
export declare const getPortsForElement: (element: IUMLElement) => {
    Up: Point;
    Right: Point;
    Down: Point;
    Left: Point;
    Upright: Point;
    Upleft: Point;
    Downright: Point;
    Downleft: Point;
    Topright: Point;
    Topleft: Point;
    Bottomright: Point;
    Bottomleft: Point;
};
/** Class implementation of `IUMLElement` to use inheritance at runtime */
export declare abstract class UMLElement implements IUMLElement, ILayoutable {
    /** `UMLElement` type specific feature flags */
    static features: UMLElementFeatures;
    static supportedRelationships: UMLRelationshipType[];
    /** Checks whether an `IUMLElement` is of type `UMLElementType` */
    static isUMLElement: (element: IUMLElement) => element is IUMLElement & {
        type: UMLElementType;
    };
    id: string;
    name: string;
    abstract type: UMLElementType | UMLRelationshipType | UMLDiagramType;
    bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    owner: string | null;
    highlight?: string;
    fillColor?: string;
    strokeColor?: string;
    textColor?: string;
    assessmentNote?: string;
    resizeFrom: ResizeFrom;
    constructor(values?: DeepPartial<IUMLElement>);
    /**
     * Clones an instance of `UMLElement`
     *
     * @param override - Override existing properties.
     */
    clone<T extends UMLElement>(override?: DeepPartial<IUMLElement>): T;
    /** Serializes an `UMLElement` to an `Apollon.UMLElement` */
    serialize(children?: UMLElement[]): Apollon.UMLModelElement;
    /** Deserializes an `Apollon.UMLElement` to an `UMLElement` */
    deserialize<T extends Apollon.UMLModelElement>(values: T, children?: Apollon.UMLModelElement[]): void;
    abstract render(canvas: ILayer): ILayoutable[];
}
