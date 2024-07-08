import { DeepPartial } from 'redux';
import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { UMLElement } from '../../../services/uml-element/uml-element';
import { IUMLElementPort } from '../../../services/uml-element/uml-element-port';
import { IUMLRelationship, UMLRelationship } from '../../../services/uml-relationship/uml-relationship';
export interface IUMLAssociation extends IUMLRelationship {
    source: IUMLElementPort & {
        multiplicity: string;
        role: string;
    };
    target: IUMLElementPort & {
        multiplicity: string;
        role: string;
    };
}
export declare abstract class UMLAssociation extends UMLRelationship implements IUMLAssociation {
    source: IUMLAssociation['source'];
    target: IUMLAssociation['target'];
    constructor(values?: DeepPartial<IUMLAssociation>);
    render(canvas: ILayer, source?: UMLElement, target?: UMLElement): ILayoutable[];
}
