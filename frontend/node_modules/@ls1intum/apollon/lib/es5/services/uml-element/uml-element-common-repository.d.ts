import { AsyncAction } from '../../utils/actions/actions';
import { Point } from '../../utils/geometry/point';
import { IUMLElement, UMLElement } from './uml-element';
import { UpdateAction } from './uml-element-types';
export declare const UMLElementCommonRepository: {
    /**
     * Creates new instances of `UMLElements`
     *
     * @param value - An array of new values for the instances to create.
     * @param [owner] - Specify the owner for the new elements.
     */
    create: <T extends IUMLElement>(value: T | T[], owner?: string) => AsyncAction;
    /** Read an UMLElement */
    get: (element?: IUMLElement) => UMLElement | null;
    /** Read an UMLElement by id */
    getById: (id: string) => AsyncAction<UMLElement | null>;
    /** Update existing elements */
    update: <T_1 extends IUMLElement>(id: string | string[], values: Partial<T_1>) => UpdateAction<T_1>;
    /** Delete existing elements */
    delete: (id?: string | string[]) => AsyncAction;
    /** Composes the absolute position of an element */
    getAbsolutePosition: (id: string) => AsyncAction<Point>;
    getChildren: (id: string) => AsyncAction<IUMLElement[]>;
};
