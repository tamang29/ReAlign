import { DefaultUMLRelationshipType } from '../../../packages/uml-relationship-type';
import { UMLRelationships } from '../../../packages/uml-relationships';
import { UMLElementCommonRepository } from '../uml-element-common-repository';
import { UMLElements } from '../../../packages/uml-elements';
import { UMLRelationshipCommonRepository } from '../../uml-relationship/uml-relationship-common-repository';
export const Connectable = {
    startConnecting: (direction, id) => (dispatch, getState) => {
        const ids = id
            ? Array.isArray(id)
                ? id
                : [id]
            : getState()
                .selected.map((elementId) => dispatch(UMLElementCommonRepository.getById(elementId)))
                .filter((element) => element !== null)
                .filter((element) => UMLElements[element.type].features.connectable)
                .map((element) => element.id);
        const directions = Array.isArray(direction) ? direction : [direction];
        if (!ids.length || (directions.length !== 1 && directions.length !== ids.length)) {
            return;
        }
        const ports = ids.map((elementId, index) => ({
            element: elementId,
            direction: directions.length === 1 ? directions[0] : directions[index],
        }));
        dispatch({
            type: "@@element/connectable/START" /* ConnectableActionTypes.START */,
            payload: { ports },
            undoable: false,
        });
    },
    connect: (target, source) => (dispatch, getState) => {
        const sources = source ? (Array.isArray(source) ? source : [source]) : getState().connecting;
        const targets = Array.isArray(target) ? target : [target];
        if (!targets.length || (targets.length !== 1 && targets.length !== sources.length)) {
            return;
        }
        const connections = [];
        for (const [index, port] of sources.entries()) {
            // try to connect to target - if target.length === 1 -> connect to same element
            const connectionTarget = targets.length === 1 ? targets[0] : targets[index];
            if (port.element === connectionTarget.element && port.direction === connectionTarget.direction) {
                continue;
            }
            connections.push({ source: port, target: connectionTarget });
        }
        const relationships = connections.map((connection) => {
            const sourceElement = dispatch(UMLElementCommonRepository.getById(connection.source.element));
            const targetElement = dispatch(UMLElementCommonRepository.getById(connection.target.element));
            let relationshipType;
            // determine the common supported connection types and choose one for the connection
            if (sourceElement && targetElement) {
                const commonSupportedConnections = UMLRelationshipCommonRepository.getSupportedConnectionsForElements([
                    sourceElement,
                    targetElement,
                ]);
                // take the first common supported connection type or default diagram type
                relationshipType =
                    commonSupportedConnections.length > 0
                        ? commonSupportedConnections[0]
                        : DefaultUMLRelationshipType[getState().diagram.type];
            }
            else {
                // take default diagram type
                relationshipType = DefaultUMLRelationshipType[getState().diagram.type];
            }
            const Classifier = UMLRelationships[relationshipType];
            return new Classifier(connection);
        });
        if (connections.length) {
            dispatch(UMLElementCommonRepository.create(relationships));
        }
        if (!source) {
            dispatch({
                type: "@@element/connectable/END" /* ConnectableActionTypes.END */,
                payload: { ports: sources },
                undoable: false,
            });
        }
    },
    endConnecting: (port) => (dispatch, getState) => {
        const ports = port ? (Array.isArray(port) ? port : [port]) : getState().connecting;
        if (!ports.length) {
            return;
        }
        dispatch({
            type: "@@element/connectable/END" /* ConnectableActionTypes.END */,
            payload: { ports },
            undoable: false,
        });
    },
};
//# sourceMappingURL=connectable-repository.js.map