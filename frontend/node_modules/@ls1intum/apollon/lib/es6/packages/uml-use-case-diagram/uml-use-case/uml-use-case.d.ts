import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { UMLElement } from '../../../services/uml-element/uml-element';
import { UMLElementType } from '../../uml-element-type';
export declare class UMLUseCase extends UMLElement {
    type: UMLElementType;
    render(canvas: ILayer): ILayoutable[];
}
