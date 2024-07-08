import { DeepPartial } from 'redux';
import { UMLDiagramType } from '../../packages/diagram-type';
import { UMLElementType } from '../../packages/uml-element-type';
import * as Apollon from '../../typings';
import { ILayer } from '../layouter/layer';
import { ILayoutable } from '../layouter/layoutable';
import { IUMLElement, UMLElement } from '../uml-element/uml-element';
import { UMLElementFeatures } from '../uml-element/uml-element-features';
export interface IUMLContainer extends IUMLElement {
    type: UMLElementType | UMLDiagramType;
    ownedElements: string[];
}
export declare abstract class UMLContainer extends UMLElement implements IUMLContainer {
    static features: UMLElementFeatures;
    static isUMLContainer: (element: IUMLElement) => element is IUMLContainer;
    abstract type: UMLElementType | UMLDiagramType;
    ownedElements: string[];
    constructor(values?: DeepPartial<IUMLContainer>);
    /**
     * reorders children -> default, do nothing
     */
    reorderChildren(children: IUMLElement[]): string[];
    /** Serializes an `UMLElement` to an `Apollon.UMLElement` */
    serialize(children?: UMLElement[]): Apollon.UMLModelElement;
    deserialize<T extends Apollon.UMLModelElement>(values: T, children?: Apollon.UMLModelElement[]): void;
    abstract render(canvas: ILayer, children?: ILayoutable[]): ILayoutable[];
}
