import { DeepPartial } from 'redux';
import { UMLRelationshipType } from '../../packages/uml-relationship-type';
import * as Apollon from '../../typings';
import { IPath } from '../../utils/geometry/path';
import { ILayer } from '../layouter/layer';
import { ILayoutable } from '../layouter/layoutable';
import { IUMLElement, UMLElement } from '../uml-element/uml-element';
import { IUMLElementPort } from '../uml-element/uml-element-port';
import { UMLRelationshipFeatures } from './uml-relationship-features';
export interface IUMLRelationship extends IUMLElement {
    type: UMLRelationshipType;
    path: IPath;
    source: IUMLElementPort;
    target: IUMLElementPort;
    isManuallyLayouted?: boolean;
}
export declare abstract class UMLRelationship extends UMLElement implements IUMLRelationship {
    static features: UMLRelationshipFeatures;
    static isUMLRelationship: (element: IUMLElement) => element is IUMLRelationship;
    abstract type: UMLRelationshipType;
    path: IPath;
    source: IUMLElementPort;
    target: IUMLElementPort;
    isManuallyLayouted?: boolean;
    constructor(values?: DeepPartial<IUMLRelationship>);
    serialize(): Apollon.UMLRelationship;
    deserialize<T extends Apollon.UMLModelElement>(values: T, children?: Apollon.UMLModelElement[]): void;
    render(canvas: ILayer, source?: UMLElement, target?: UMLElement): ILayoutable[];
    /**
     * Clones an instance of `UMLRelationship`
     *
     * @param override - Override existing properties.
     */
    cloneRelationship<T extends UMLRelationship>(override?: DeepPartial<IUMLRelationship>): T;
}
