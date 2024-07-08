import { UMLClassifier } from '../../common/uml-classifier/uml-classifier';
import { UMLElementType } from '../../uml-element-type';
import { IUMLElement } from '../../../services/uml-element/uml-element';
export declare class UMLInterface extends UMLClassifier {
    type: UMLElementType;
    stereotype: string | null;
    reorderChildren(children: IUMLElement[]): string[];
}
