export const UMLElementReducer = (state = {}, action) => {
    switch (action.type) {
        case "@@element/CREATE" /* UMLElementActionTypes.CREATE */: {
            const { payload } = action;
            return payload.values.reduce((elements, values) => ({ ...elements, [values.id]: values }), state);
        }
        case "@@element/UPDATE" /* UMLElementActionTypes.UPDATE */: {
            const { payload } = action;
            return payload.values.reduce((elements, values) => ({
                ...elements,
                [values.id]: {
                    ...elements[values.id],
                    ...values,
                },
            }), state);
        }
        case "@@element/DELETE" /* UMLElementActionTypes.DELETE */: {
            const { payload } = action;
            return Object.keys(state).reduce((elements, id) => ({
                ...elements,
                ...(!payload.ids.includes(id) && { [id]: state[id] }),
            }), {});
        }
    }
    return state;
};
//# sourceMappingURL=uml-element-reducer.js.map