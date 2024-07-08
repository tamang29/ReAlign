import { DeepPartial } from 'redux';
import { UMLDiagramType } from '../../packages/diagram-type';
import { IBoundary } from '../../utils/geometry/boundary';
import { ILayer } from '../layouter/layer';
import { ILayoutable } from '../layouter/layoutable';
import { IUMLContainer, UMLContainer } from '../uml-container/uml-container';
export declare const DIAGRAM_MARGIN = 40;
export interface IUMLDiagram extends IUMLContainer {
    type: UMLDiagramType;
    ownedRelationships: string[];
}
export declare class UMLDiagram extends UMLContainer implements IUMLDiagram {
    type: UMLDiagramType;
    ownedRelationships: string[];
    bounds: IBoundary;
    constructor(values?: DeepPartial<IUMLDiagram>);
    render(canvas: ILayer, children?: ILayoutable[]): ILayoutable[];
}
