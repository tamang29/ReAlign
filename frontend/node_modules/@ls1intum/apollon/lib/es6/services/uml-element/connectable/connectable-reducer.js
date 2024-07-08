export const ConnectableReducer = (state = [], action) => {
    switch (action.type) {
        case "@@element/connectable/START" /* ConnectableActionTypes.START */: {
            const { payload } = action;
            return [...new Set([...payload.ports, ...state])];
        }
        case "@@element/connectable/END" /* ConnectableActionTypes.END */: {
            const { payload } = action;
            return state.filter((port) => !payload.ports.includes(port));
        }
        case "@@element/DELETE" /* UMLElementActionTypes.DELETE */: {
            const { payload } = action;
            return state.reduce((ports, port) => ({
                ...ports,
                ...(!payload.ids.includes(port.element) && port),
            }), []);
        }
    }
    return state;
};
//# sourceMappingURL=connectable-reducer.js.map