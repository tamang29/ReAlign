export const MovingReducer = (state = {}, action) => {
    switch (action.type) {
        case "@@element/movable/MOVE" /* MovingActionTypes.MOVE */: {
            const { payload } = action;
            return payload.ids.reduce((elements, id) => ({
                ...elements,
                ...(id in elements && {
                    [id]: {
                        ...elements[id],
                        bounds: {
                            ...elements[id].bounds,
                            x: elements[id].bounds.x + payload.delta.x,
                            y: elements[id].bounds.y + payload.delta.y,
                        },
                    },
                }),
            }), state);
        }
    }
    return state;
};
//# sourceMappingURL=moving-reducer.js.map