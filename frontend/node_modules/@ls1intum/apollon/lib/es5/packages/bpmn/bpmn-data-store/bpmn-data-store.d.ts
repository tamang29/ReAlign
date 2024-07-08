import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { UMLElementType } from '../../uml-element-type';
import { UMLElementFeatures } from '../../../services/uml-element/uml-element-features';
import { UMLContainer } from '../../../services/uml-container/uml-container';
export declare class BPMNDataStore extends UMLContainer {
    static features: UMLElementFeatures;
    type: UMLElementType;
    render(canvas: ILayer): ILayoutable[];
}
