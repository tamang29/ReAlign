/**
 * only uses for copy paste without clipboard
 * @param state
 * @param action
 * @constructor
 */
export const CopyReducer = (state = [], action) => {
    switch (action.type) {
        case "@@copy/COPY" /* CopyActionTypes.COPY */: {
            const { payload } = action;
            return payload;
        }
        case "@@copy/PASTE" /* CopyActionTypes.PASTE */: {
            return state;
        }
    }
    return state;
};
//# sourceMappingURL=copy-reducer.js.map