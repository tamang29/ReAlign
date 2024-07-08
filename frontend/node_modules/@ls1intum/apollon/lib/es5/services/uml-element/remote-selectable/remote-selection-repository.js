"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteSelectable = void 0;
var tslib_1 = require("tslib");
exports.RemoteSelectable = {
    remoteSelectionChange: function (selector, changes) { return ({
        type: "@@element/remote-selection/CHANGE" /* RemoteSelectionActionTypes.SELECTION_CHANGE */,
        payload: {
            selector: selector,
            changes: changes,
        },
        undoable: false,
    }); },
    remoteSelect: function (selector, ids) {
        return exports.RemoteSelectable.remoteSelectionChange(selector, ids.map(function (id) { return ({ type: "@@element/remote-selection/SELECT" /* RemoteSelectionChangeTypes.SELECT */, id: id }); }));
    },
    remoteDeselect: function (selector, ids) {
        return exports.RemoteSelectable.remoteSelectionChange(selector, ids.map(function (id) { return ({ type: "@@element/remote-selection/DESELECT" /* RemoteSelectionChangeTypes.DESELECT */, id: id }); }));
    },
    remoteSelectDeselect: function (selector, select, deselect) {
        return exports.RemoteSelectable.remoteSelectionChange(selector, tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(select.map(function (id) { return ({ type: "@@element/remote-selection/SELECT" /* RemoteSelectionChangeTypes.SELECT */, id: id }); })), false), tslib_1.__read(deselect.map(function (id) { return ({ type: "@@element/remote-selection/DESELECT" /* RemoteSelectionChangeTypes.DESELECT */, id: id }); })), false));
    },
    pruneRemoteSelectors: function (allowedSelectors) { return ({
        type: "@@element/remote-selection/PRUNE_SELECTORS" /* RemoteSelectionActionTypes.PRUNE_SELECTORS */,
        payload: {
            allowedSelectors: allowedSelectors,
        },
        undoable: false,
    }); },
};
//# sourceMappingURL=remote-selection-repository.js.map