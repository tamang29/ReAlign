import { FunctionComponent, PropsWithChildren } from 'react';
import { UMLElementType } from './uml-element-type';
import { UMLRelationshipType } from './uml-relationship-type';
import { ConnectedComponent } from 'react-redux';
export declare const Components: {
    [key in UMLElementType | UMLRelationshipType]: FunctionComponent<PropsWithChildren<{
        element: any;
        fillColor?: string;
    }>> | ConnectedComponent<FunctionComponent<any>, {
        element: any;
    }>;
};
