import { UMLClassifier } from '../../common/uml-classifier/uml-classifier';
import { UMLElementType } from '../../uml-element-type';
import { IUMLElement } from '../../../services/uml-element/uml-element';
export declare class UMLClass extends UMLClassifier {
    type: UMLElementType;
    reorderChildren(children: IUMLElement[]): string[];
}
