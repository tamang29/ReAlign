import { UMLRelationshipType } from '../../packages/uml-relationship-type';
import { IPath } from '../../utils/geometry/path';
import { ILayer } from '../layouter/layer';
import { ILayoutable } from '../layouter/layoutable';
import { IUMLElement, UMLElement } from '../uml-element/uml-element';
import { IUMLElementPort } from '../uml-element/uml-element-port';
import { UMLRelationship } from './uml-relationship';
export interface IUMLRelationship extends IUMLElement {
    type: UMLRelationshipType;
    path: IPath;
    source: IUMLElementPort;
    target: IUMLElementPort;
}
export declare abstract class UMLRelationshipCenteredDescription extends UMLRelationship {
    render(canvas: ILayer, source?: UMLElement, target?: UMLElement): ILayoutable[];
}
