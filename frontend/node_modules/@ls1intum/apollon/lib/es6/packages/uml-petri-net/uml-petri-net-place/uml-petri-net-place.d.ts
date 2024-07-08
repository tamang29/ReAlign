import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { UMLElement } from '../../../services/uml-element/uml-element';
import { UMLElementFeatures } from '../../../services/uml-element/uml-element-features';
import { IBoundary } from '../../../utils/geometry/boundary';
import { UMLElementType } from '../../uml-element-type';
import { DeepPartial } from 'redux';
import * as Apollon from '../../../typings';
export declare class UMLPetriNetPlace extends UMLElement {
    static features: UMLElementFeatures;
    static defaultCapacity: number;
    highlight: string | undefined;
    type: UMLElementType;
    bounds: IBoundary;
    amountOfTokens: number;
    capacity: number;
    constructor(values?: DeepPartial<UMLPetriNetPlace>);
    serialize(children?: UMLElement[]): Apollon.UMLPetriNetPlace;
    deserialize<T extends Apollon.UMLModelElement>(values: T, children?: Apollon.UMLModelElement[]): void;
    render(canvas: ILayer): ILayoutable[];
}
