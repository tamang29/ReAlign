import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { UMLElementType } from '../../uml-element-type';
import { UMLContainer } from '../../../services/uml-container/uml-container';
export declare class BPMNCallActivity extends UMLContainer {
    type: UMLElementType;
    render(canvas: ILayer): ILayoutable[];
}
