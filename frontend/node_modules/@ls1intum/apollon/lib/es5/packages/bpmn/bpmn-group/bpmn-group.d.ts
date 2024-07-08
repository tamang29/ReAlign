import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { UMLPackage } from '../../common/uml-package/uml-package';
import { UMLElementType } from '../../uml-element-type';
import { UMLElementFeatures } from '../../../services/uml-element/uml-element-features';
export declare class BPMNGroup extends UMLPackage {
    static features: UMLElementFeatures;
    type: UMLElementType;
    render(canvas: ILayer, children?: ILayoutable[]): ILayoutable[];
}
