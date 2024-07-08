import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { IUMLElement, UMLElement } from '../../../services/uml-element/uml-element';
import { UMLElementFeatures } from '../../../services/uml-element/uml-element-features';
import { IBoundary } from '../../../utils/geometry/boundary';
import { UMLElementType } from '../../uml-element-type';
import { DeepPartial } from 'redux';
export declare class UMLActivityForkNode extends UMLElement {
    static supportedRelationships: "ActivityControlFlow"[];
    static features: UMLElementFeatures;
    static defaultWidth: number;
    static defaultHeight: number;
    type: UMLElementType;
    bounds: IBoundary;
    constructor(values?: DeepPartial<IUMLElement>);
    render(layer: ILayer): ILayoutable[];
}
