import { DeepPartial } from 'redux';
import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { IUMLContainer, UMLContainer } from '../../../services/uml-container/uml-container';
import { IUMLElement, UMLElement } from '../../../services/uml-element/uml-element';
import { UMLElementFeatures } from '../../../services/uml-element/uml-element-features';
import * as Apollon from '../../../typings';
export interface IUMLClassifier extends IUMLContainer {
    italic: boolean;
    underline: boolean;
    stereotype: string | null;
    deviderPosition: number;
    hasAttributes: boolean;
    hasMethods: boolean;
}
export declare abstract class UMLClassifier extends UMLContainer implements IUMLClassifier {
    static features: UMLElementFeatures;
    static stereotypeHeaderHeight: number;
    static nonStereotypeHeaderHeight: number;
    italic: boolean;
    underline: boolean;
    stereotype: string | null;
    deviderPosition: number;
    hasAttributes: boolean;
    hasMethods: boolean;
    get headerHeight(): number;
    constructor(values?: DeepPartial<IUMLClassifier>);
    abstract reorderChildren(children: IUMLElement[]): string[];
    serialize(children?: UMLElement[]): Apollon.UMLClassifier;
    render(layer: ILayer, children?: ILayoutable[]): ILayoutable[];
}
