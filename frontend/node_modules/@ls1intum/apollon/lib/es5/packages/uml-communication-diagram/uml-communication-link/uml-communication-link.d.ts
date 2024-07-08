import { DeepPartial } from 'redux';
import { IUMLRelationship, UMLRelationship } from '../../../services/uml-relationship/uml-relationship';
import * as Apollon from '../../../typings';
import { ICommunicationLinkMessage } from './uml-communiction-link-message';
import { IBoundary } from '../../../utils/geometry/boundary';
import { ILayer } from '../../../services/layouter/layer';
import { UMLElement } from '../../../services/uml-element/uml-element';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { Point } from '../../../utils/geometry/point';
import { Direction } from '../../../services/uml-element/uml-element-port';
export interface IUMLCommunicationLink extends IUMLRelationship {
    messages: ICommunicationLinkMessage[];
}
export declare class UMLCommunicationLink extends UMLRelationship implements IUMLCommunicationLink {
    type: "CommunicationLink";
    messages: ICommunicationLinkMessage[];
    constructor(values?: DeepPartial<IUMLCommunicationLink>);
    serialize(): Apollon.UMLCommunicationLink;
    deserialize<T extends Apollon.UMLModelElement>(values: T, children?: Apollon.UMLModelElement[]): void;
    render(canvas: ILayer, source?: UMLElement, target?: UMLElement): ILayoutable[];
    computeBoundingBoxForMessages(canvas: ILayer, messagePosition: Point, messages: ICommunicationLinkMessage[], arrowDirection: Direction): IBoundary;
}
