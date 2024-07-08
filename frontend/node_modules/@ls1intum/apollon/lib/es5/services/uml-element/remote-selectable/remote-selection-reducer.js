"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteSelectionReducer = void 0;
var tslib_1 = require("tslib");
var sameSelector = function (a, b) {
    return a && b && a.name === b.name && a.color === b.color;
};
var RemoteSelectionReducer = function (state, action) {
    if (state === void 0) { state = {}; }
    switch (action.type) {
        case "@@element/remote-selection/CHANGE" /* RemoteSelectionActionTypes.SELECTION_CHANGE */:
            var payload = action.payload;
            var selector_1 = payload.selector, changes = payload.changes;
            return changes.reduce(function (selection, change) {
                var _a;
                var _b;
                var id = change.id;
                var selectors = tslib_1.__spreadArray([], tslib_1.__read(((_b = selection[id]) !== null && _b !== void 0 ? _b : [])), false);
                if (change.type === "@@element/remote-selection/SELECT" /* RemoteSelectionChangeTypes.SELECT */ && !selectors.some(function (s) { return sameSelector(s, selector_1); })) {
                    selectors.push(selector_1);
                }
                else if (change.type === "@@element/remote-selection/DESELECT" /* RemoteSelectionChangeTypes.DESELECT */) {
                    var index = selectors.findIndex(function (s) { return sameSelector(s, selector_1); });
                    if (index >= 0) {
                        selectors.splice(index, 1);
                    }
                }
                return tslib_1.__assign(tslib_1.__assign({}, selection), (_a = {}, _a[id] = selectors, _a));
            }, state);
        case "@@element/remote-selection/PRUNE_SELECTORS" /* RemoteSelectionActionTypes.PRUNE_SELECTORS */:
            var allowedSelectors_1 = action.payload.allowedSelectors;
            return Object.fromEntries(Object.entries(state).map(function (_a) {
                var _b = tslib_1.__read(_a, 2), id = _b[0], selectors = _b[1];
                return [id, selectors.filter(function (s) { return allowedSelectors_1.some(function (selector) { return sameSelector(s, selector); }); })];
            }));
    }
    return state;
};
exports.RemoteSelectionReducer = RemoteSelectionReducer;
//# sourceMappingURL=remote-selection-reducer.js.map