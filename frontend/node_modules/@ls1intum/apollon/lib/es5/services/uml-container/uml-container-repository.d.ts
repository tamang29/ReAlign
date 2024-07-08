import { AsyncAction } from '../../utils/actions/actions';
import { IUMLElement } from '../uml-element/uml-element';
import { UMLContainer } from './uml-container';
import { RemoveAction } from './uml-container-types';
export declare const UMLContainerRepository: {
    get: (element?: IUMLElement) => UMLContainer | null;
    append: (id: string | string[], owner?: string) => AsyncAction;
    remove: (id: string | string[]) => RemoveAction;
};
