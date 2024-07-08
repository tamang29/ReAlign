import { DeepPartial } from 'redux';
import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { IUMLElement, UMLElement } from '../../../services/uml-element/uml-element';
import { UMLElementFeatures } from '../../../services/uml-element/uml-element-features';
import { IBoundary } from '../../../utils/geometry/boundary';
import { UMLElementType } from '../../uml-element-type';
export declare class UMLActivityFinalNode extends UMLElement {
    static supportedRelationships: "ActivityControlFlow"[];
    static features: UMLElementFeatures;
    type: UMLElementType;
    bounds: IBoundary;
    constructor(values?: DeepPartial<IUMLElement>);
    render(canvas: ILayer): ILayoutable[];
}
