import { DeepPartial } from 'redux';
import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { IUMLElement, UMLElement } from '../../../services/uml-element/uml-element';
import { UMLElementFeatures } from '../../../services/uml-element/uml-element-features';
import { IBoundary } from '../../../utils/geometry/boundary';
export declare abstract class UMLClassifierMember extends UMLElement {
    static features: UMLElementFeatures;
    bounds: IBoundary;
    constructor(values?: DeepPartial<IUMLElement>);
    render(layer: ILayer): ILayoutable[];
}
