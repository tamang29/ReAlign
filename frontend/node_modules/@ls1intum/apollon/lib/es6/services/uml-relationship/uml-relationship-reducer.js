export const UMLRelationshipReducer = (state = {}, action) => {
    switch (action.type) {
        case "@@element/reconnectable/RECONNECT" /* ReconnectableActionTypes.RECONNECT */: {
            const { payload } = action;
            return payload.connections.reduce((acc, connection) => ({
                ...acc,
                [connection.id]: {
                    ...state[connection.id],
                    source: { ...state[connection.id].source, ...connection.source },
                    target: { ...state[connection.id].target, ...connection.target },
                },
            }), state);
        }
        case "@@relationship/LAYOUT" /* UMLRelationshipActionTypes.LAYOUT */: {
            const { payload } = action;
            return {
                ...state,
                [payload.id]: {
                    ...state[payload.id],
                    path: payload.path,
                    bounds: {
                        ...state[payload.id].bounds,
                        ...payload.bounds,
                    },
                    isManuallyLayouted: false,
                },
            };
        }
        case "@@relationship/WAYPOINTLAYOUT" /* UMLRelationshipActionTypes.WAYPOINTLAYOUT */: {
            const { payload } = action;
            return {
                ...state,
                [payload.id]: {
                    ...state[payload.id],
                    path: payload.path,
                    bounds: {
                        ...state[payload.id].bounds,
                        ...payload.bounds,
                    },
                },
            };
        }
        case "@@relationship/waypoints/START" /* UMLRelationshipActionTypes.STARTWAYPOINTSLAYOUT */: {
            const { payload } = action;
            return {
                ...state,
                [payload.id]: {
                    ...state[payload.id],
                    path: payload.path,
                    bounds: {
                        ...state[payload.id].bounds,
                        ...payload.bounds,
                    },
                },
            };
        }
        case "@@relationship/waypoints/END" /* UMLRelationshipActionTypes.ENDWAYPOINTSLAYOUT */: {
            const { payload } = action;
            return {
                ...state,
                [payload.id]: {
                    ...state[payload.id],
                    isManuallyLayouted: true,
                },
            };
        }
    }
    return state;
};
//# sourceMappingURL=uml-relationship-reducer.js.map