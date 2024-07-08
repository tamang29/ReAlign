import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { UMLElement } from '../../../services/uml-element/uml-element';
import { UMLElementType } from '../../uml-element-type';
import * as Apollon from '../../../typings';
import { DeepPartial } from 'redux';
export declare class UMLReachabilityGraphMarking extends UMLElement {
    type: UMLElementType;
    isInitialMarking: boolean;
    constructor(values?: DeepPartial<UMLReachabilityGraphMarking>);
    serialize(children?: UMLElement[]): Apollon.UMLReachabilityGraphMarking;
    deserialize<T extends Apollon.UMLModelElement>(values: T, children?: Apollon.UMLModelElement[]): void;
    render(canvas: ILayer): ILayoutable[];
}
