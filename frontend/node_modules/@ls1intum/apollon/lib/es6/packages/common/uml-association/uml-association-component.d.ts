import React, { FunctionComponent } from 'react';
import { IUMLElementPort } from '../../../services/uml-element/uml-element-port';
import { Point } from '../../../utils/geometry/point';
import { UMLAssociation } from './uml-association';
import { UMLRelationshipType } from '../../uml-relationship-type';
export declare const layoutTextForUMLAssociation: (location: IUMLElementPort['direction'], position: 'TOP' | 'BOTTOM') => {
    dx: number;
    textAnchor: string;
    dy?: undefined;
} | {
    dy: number;
    textAnchor: string;
    dx?: undefined;
} | {
    dx: number;
    dy: number;
    textAnchor: string;
};
export declare const computeTextPositionForUMLAssociation: (alignmentPath: Point[], hasMarker?: boolean) => Point;
export declare const getMarkerForTypeForUMLAssociation: (relationshipType: UMLRelationshipType) => ((id: string, color?: string) => React.JSX.Element) | undefined;
export declare const UMLAssociationComponent: FunctionComponent<Props>;
interface Props {
    element: UMLAssociation;
}
export {};
