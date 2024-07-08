import { DeepPartial } from 'redux';
import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { IUMLElement, UMLElement } from '../../../services/uml-element/uml-element';
import { UMLElementType } from '../../uml-element-type';
export declare class ColorLegend extends UMLElement {
    type: UMLElementType;
    constructor(values?: DeepPartial<IUMLElement>);
    render(canvas: ILayer): ILayoutable[];
}
