import { UMLElementType } from '../../uml-element-type';
import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { UMLElementFeatures } from '../../../services/uml-element/uml-element-features';
import { UMLElement } from '../../../services/uml-element/uml-element';
import { UMLPackage } from '../../common/uml-package/uml-package';
export declare class BPMNPool extends UMLPackage {
    static MIN_WIDTH: number;
    static MIN_HEIGHT: number;
    static HEADER_WIDTH: number;
    static features: UMLElementFeatures;
    type: UMLElementType;
    hasSwimlanes: (children: ILayoutable[]) => boolean;
    render(layer: ILayer, children?: UMLElement[], calculateWithoutChildren?: boolean): UMLElement[];
}
