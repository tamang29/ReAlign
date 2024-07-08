"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopyReducer = void 0;
/**
 * only uses for copy paste without clipboard
 * @param state
 * @param action
 * @constructor
 */
var CopyReducer = function (state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case "@@copy/COPY" /* CopyActionTypes.COPY */: {
            var payload = action.payload;
            return payload;
        }
        case "@@copy/PASTE" /* CopyActionTypes.PASTE */: {
            return state;
        }
    }
    return state;
};
exports.CopyReducer = CopyReducer;
//# sourceMappingURL=copy-reducer.js.map