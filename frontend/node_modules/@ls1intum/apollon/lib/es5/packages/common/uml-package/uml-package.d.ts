import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { UMLContainer } from '../../../services/uml-container/uml-container';
export declare abstract class UMLPackage extends UMLContainer {
    render(layer: ILayer, children?: ILayoutable[], calculateWithoutChildren?: boolean): ILayoutable[];
}
