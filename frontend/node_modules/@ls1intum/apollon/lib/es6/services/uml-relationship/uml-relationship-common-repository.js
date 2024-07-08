import { UMLRelationships } from '../../packages/uml-relationships';
import { UMLRelationship } from './uml-relationship';
import { UMLElements } from '../../packages/uml-elements';
export const UMLRelationshipCommonRepository = {
    get: (element) => {
        if (!element) {
            return null;
        }
        if (UMLRelationship.isUMLRelationship(element)) {
            const Classifier = UMLRelationships[element.type];
            return new Classifier(element);
        }
        return null;
    },
    getById: (id) => (dispatch, getState) => {
        const { elements } = getState();
        return UMLRelationshipCommonRepository.get(elements[id]);
    },
    getSupportedConnectionsForElements: (elements) => {
        const elementsArray = Array.isArray(elements) ? elements : [elements];
        if (!(elementsArray.length > 0)) {
            return [];
        }
        // determine the common supported connection types
        return elementsArray.reduce((supportedConnections, element) => {
            const elementSupportedConnections = UMLElements[element.type].supportedRelationships;
            return supportedConnections.filter((supportedConnection) => elementSupportedConnections.includes(supportedConnection));
        }, UMLElements[elementsArray[0].type].supportedRelationships);
    },
    layout: (id, path, bounds) => ({
        type: "@@relationship/LAYOUT" /* UMLRelationshipActionTypes.LAYOUT */,
        payload: { id, path, bounds },
        undoable: false,
    }),
    layoutWaypoints: (id, path, bounds) => ({
        type: "@@relationship/WAYPOINTLAYOUT" /* UMLRelationshipActionTypes.WAYPOINTLAYOUT */,
        payload: { id, path, bounds },
        undoable: false,
    }),
    flip: (id) => (dispatch, getState) => {
        const { selected, elements } = getState();
        const ids = id ? (Array.isArray(id) ? id : [id]) : selected;
        const connections = ids.map((r) => {
            const relationship = elements[r];
            const source = { element: relationship.target.element, direction: relationship.target.direction };
            const target = { element: relationship.source.element, direction: relationship.source.direction };
            return { id: relationship.id, source, target };
        });
        dispatch({
            type: "@@element/reconnectable/RECONNECT" /* ReconnectableActionTypes.RECONNECT */,
            payload: { connections },
            undoable: true,
        });
    },
    startWaypointsLayout: (id, path, bounds) => (dispatch) => {
        const ids = id ? (Array.isArray(id) ? id : [id]) : undefined;
        if (ids && !ids.length) {
            return;
        }
        dispatch({
            type: "@@relationship/waypoints/START" /* UMLRelationshipActionTypes.STARTWAYPOINTSLAYOUT */,
            payload: { id, path, bounds },
            undoable: false,
        });
    },
    endWaypointsLayout: (id) => (dispatch) => {
        if (!id.length) {
            return;
        }
        dispatch({
            type: "@@relationship/waypoints/END" /* UMLRelationshipActionTypes.ENDWAYPOINTSLAYOUT */,
            payload: { id },
            undoable: false,
        });
    },
};
//# sourceMappingURL=uml-relationship-common-repository.js.map