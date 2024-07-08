const initialState = {};
export const AssessmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case "@@element/ASSESS" /* AssessmentActionTypes.ASSESS */: {
            const { payload } = action;
            return {
                ...state,
                [payload.element]: payload.assessment,
            };
        }
        case "@@assessment/DELETE" /* AssessmentActionTypes.DELETE */: {
            const { payload } = action;
            const newState = { ...state };
            delete newState[payload.element];
            return newState;
        }
        case "@@element/DELETE" /* UMLElementActionTypes.DELETE */: {
            const { payload } = action;
            return Object.keys(state).reduce((assessments, id) => ({
                ...assessments,
                ...(!payload.ids.includes(id) && { [id]: state[id] }),
            }), {});
        }
    }
    return state;
};
//# sourceMappingURL=assessment-reducer.js.map