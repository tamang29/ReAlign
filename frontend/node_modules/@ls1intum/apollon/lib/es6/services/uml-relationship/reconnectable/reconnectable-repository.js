import { notEmpty } from '../../../utils/not-empty';
import { UMLRelationship } from '../uml-relationship';
import { UMLRelationshipCommonRepository } from '../uml-relationship-common-repository';
export const Reconnectable = {
    /**
     * creates a StTartReconnectingAction
     * @param endpoint the endpoint which should be reconnected. This endpoint will be part of the new connection, the other one is replaced.
     * @param id relationship id / ids, if omitted -> take all relationships from selected state
     */
    startReconnecting: (endpoint, id) => (dispatch, getState) => {
        const ids = id
            ? Array.isArray(id)
                ? id
                : [id]
            : getState()
                .selected.map((elementId) => dispatch(UMLRelationshipCommonRepository.getById(elementId)))
                // all relationships are reconnectable + its a static property, that's why it is enough to check for relationship
                .filter((element) => element !== null && UMLRelationship.isUMLRelationship(element))
                .map((element) => element.id);
        if (!ids.length) {
            return;
        }
        dispatch({
            type: "@@element/reconnectable/START" /* ReconnectableActionTypes.START */,
            payload: { ids, endpoint },
            undoable: true,
        });
    },
    reconnect: (target) => (dispatch, getState) => {
        const { reconnecting, elements } = getState();
        const connections = Object.keys(reconnecting)
            .map((id) => {
            const relationship = elements[id];
            const endpoint1 = reconnecting[id];
            const endpoint2 = endpoint1 === 'source' ? 'target' : 'source';
            const connection = {
                [endpoint1]: relationship[endpoint1],
                [endpoint2]: { ...relationship[endpoint2], ...target },
            };
            if (connection.source.element === connection.target.element &&
                connection.source.direction === connection.target.direction) {
                return null;
            }
            return { id, ...connection };
        })
            .filter(notEmpty);
        if (!connections.length) {
            return;
        }
        dispatch({
            type: "@@element/reconnectable/RECONNECT" /* ReconnectableActionTypes.RECONNECT */,
            payload: { connections },
            undoable: false,
        });
    },
    endReconnecting: (id) => (dispatch, getState) => {
        const ids = id ? (Array.isArray(id) ? id : [id]) : Object.keys(getState().reconnecting);
        if (!ids.length) {
            return;
        }
        dispatch({
            type: "@@element/reconnectable/END" /* ReconnectableActionTypes.END */,
            payload: { ids },
            undoable: false,
        });
    },
};
//# sourceMappingURL=reconnectable-repository.js.map