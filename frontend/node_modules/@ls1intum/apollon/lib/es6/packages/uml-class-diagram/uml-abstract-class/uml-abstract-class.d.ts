import { UMLClassifier } from '../../common/uml-classifier/uml-classifier';
import { UMLElementType } from '../../uml-element-type';
import { IUMLElement } from '../../../services/uml-element/uml-element';
export declare class UMLAbstractClass extends UMLClassifier {
    type: UMLElementType;
    italic: boolean;
    stereotype: string | null;
    reorderChildren(children: IUMLElement[]): string[];
}
