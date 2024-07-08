import { AsyncAction } from '../../utils/actions/actions';
import { IUMLElement } from '../uml-element/uml-element';
import { IUMLDiagram, UMLDiagram } from './uml-diagram';
export declare const UMLDiagramRepository: {
    isUMLDiagram: (element: IUMLElement) => element is IUMLDiagram;
    get: (element?: IUMLElement) => UMLDiagram | null;
    append: (id: string | string[]) => AsyncAction;
    bringToFront: (elementId: string | string[]) => AsyncAction;
};
