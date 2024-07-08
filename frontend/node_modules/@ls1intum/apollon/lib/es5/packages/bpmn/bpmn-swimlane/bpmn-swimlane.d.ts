import { UMLElementType } from '../../uml-element-type';
import { UMLElementFeatures } from '../../../services/uml-element/uml-element-features';
import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { UMLContainer } from '../../../services/uml-container/uml-container';
export declare class BPMNSwimlane extends UMLContainer {
    static DEFAULT_HEIGHT: number;
    static MIN_HEIGHT: number;
    static features: UMLElementFeatures;
    type: UMLElementType;
    render(layer: ILayer, children?: ILayoutable[]): ILayoutable[];
}
