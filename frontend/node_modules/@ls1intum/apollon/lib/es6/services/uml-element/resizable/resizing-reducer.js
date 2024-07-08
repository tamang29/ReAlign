export const ResizingReducer = (state = {}, action) => {
    const obj = { x: 0, y: 0 };
    const getUpdatedPosition = (elem, payload, resizeFrom) => {
        switch (resizeFrom) {
            case "topLeft" /* ResizeFrom.TOPLEFT */:
                obj.x = Math.min(elem.x - payload.delta.width, elem.x + elem.width);
                obj.y = Math.min(elem.y - payload.delta.height, elem.y + elem.height);
                break;
            case "topRight" /* ResizeFrom.TOPRIGHT */:
                obj.x = elem.x;
                obj.y = Math.min(elem.y - payload.delta.height, elem.y + elem.height);
                break;
            case "bottomLeft" /* ResizeFrom.BOTTOMLEFT */:
                obj.x = Math.min(elem.x - payload.delta.width, elem.x + elem.width);
                obj.y = elem.y;
                break;
            case "bottomRight" /* ResizeFrom.BOTTOMRIGHT */:
                obj.x = elem.x;
                obj.y = elem.y;
                break;
            default:
                obj.x = elem.x;
                obj.y = elem.y;
                break;
        }
        return obj;
    };
    switch (action.type) {
        case "@@element/resizable/RESIZE" /* ResizingActionTypes.RESIZE */: {
            const { payload } = action;
            return payload.ids.reduce((elements, id) => ({
                ...elements,
                ...(id in elements && {
                    [id]: {
                        ...elements[id],
                        bounds: {
                            ...elements[id].bounds,
                            x: getUpdatedPosition(elements[id].bounds, payload, payload.resizeFrom).x,
                            y: getUpdatedPosition(elements[id].bounds, payload, payload.resizeFrom).y,
                            width: Math.max(elements[id].bounds.width + payload.delta.width, 0),
                            height: Math.max(elements[id].bounds.height + payload.delta.height, 0),
                        },
                        resizeFrom: payload.resizeFrom,
                    },
                }),
            }), state);
        }
    }
    return state;
};
//# sourceMappingURL=resizing-reducer.js.map