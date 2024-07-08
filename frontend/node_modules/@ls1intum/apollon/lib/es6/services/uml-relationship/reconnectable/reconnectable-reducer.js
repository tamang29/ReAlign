export const ReconnectableReducer = (state = {}, action) => {
    switch (action.type) {
        case "@@element/reconnectable/START" /* ReconnectableActionTypes.START */: {
            const { payload } = action;
            return payload.ids.reduce((ids, id) => ({ ...ids, [id]: payload.endpoint }), state);
        }
        case "@@element/DELETE" /* UMLElementActionTypes.DELETE */:
        case "@@element/reconnectable/END" /* ReconnectableActionTypes.END */: {
            const { payload } = action;
            return Object.keys(state).reduce((ids, id) => ({
                ...ids,
                ...(!payload.ids.includes(id) && { [id]: state[id] }),
            }), {});
        }
    }
    return state;
};
//# sourceMappingURL=reconnectable-reducer.js.map