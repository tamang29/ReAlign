import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { UMLElement } from '../../../services/uml-element/uml-element';
import { IBoundary } from '../../../utils/geometry/boundary';
import { UMLElementType } from '../../uml-element-type';
export declare class UMLActivityMergeNode extends UMLElement {
    static supportedRelationships: "ActivityControlFlow"[];
    type: UMLElementType;
    bounds: IBoundary;
    render(canvas: ILayer): ILayoutable[];
}
