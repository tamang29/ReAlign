"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssessmentReducer = void 0;
var tslib_1 = require("tslib");
var initialState = {};
var AssessmentReducer = function (state, action) {
    var _a;
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case "@@element/ASSESS" /* AssessmentActionTypes.ASSESS */: {
            var payload = action.payload;
            return tslib_1.__assign(tslib_1.__assign({}, state), (_a = {}, _a[payload.element] = payload.assessment, _a));
        }
        case "@@assessment/DELETE" /* AssessmentActionTypes.DELETE */: {
            var payload = action.payload;
            var newState = tslib_1.__assign({}, state);
            delete newState[payload.element];
            return newState;
        }
        case "@@element/DELETE" /* UMLElementActionTypes.DELETE */: {
            var payload_1 = action.payload;
            return Object.keys(state).reduce(function (assessments, id) {
                var _a;
                return (tslib_1.__assign(tslib_1.__assign({}, assessments), (!payload_1.ids.includes(id) && (_a = {}, _a[id] = state[id], _a))));
            }, {});
        }
    }
    return state;
};
exports.AssessmentReducer = AssessmentReducer;
//# sourceMappingURL=assessment-reducer.js.map