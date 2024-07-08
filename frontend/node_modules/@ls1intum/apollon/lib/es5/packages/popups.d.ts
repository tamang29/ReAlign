import { ComponentType } from 'react';
import { UMLElementType } from './uml-element-type';
import { UMLRelationshipType } from './uml-relationship-type';
export type Popups = {
    [key in UMLElementType | UMLRelationshipType]: ComponentType<{
        element: any;
    }> | null;
};
export declare const Popups: {
    [key in UMLElementType | UMLRelationshipType]: ComponentType<{
        element: any;
    }> | null;
};
