import { AsyncAction } from '../../utils/actions/actions';
import { IBoundary } from '../../utils/geometry/boundary';
import { IPath } from '../../utils/geometry/path';
import { IUMLElement, UMLElement } from '../uml-element/uml-element';
import { UMLRelationship } from './uml-relationship';
import { LayoutAction, WaypointLayoutAction } from './uml-relationship-types';
import { UMLRelationshipType } from '../..';
export declare const UMLRelationshipCommonRepository: {
    get: (element?: IUMLElement) => UMLRelationship | null;
    getById: (id: string) => AsyncAction<UMLElement | null>;
    getSupportedConnectionsForElements: (elements: UMLElement | UMLElement[]) => UMLRelationshipType[];
    layout: (id: string, path: IPath, bounds: IBoundary) => LayoutAction;
    layoutWaypoints: (id: string, path: IPath, bounds: IBoundary) => WaypointLayoutAction;
    flip: (id?: string | string[]) => AsyncAction;
    startWaypointsLayout: (id: string, path: IPath, bounds: IBoundary) => AsyncAction;
    endWaypointsLayout: (id: string) => AsyncAction;
};
