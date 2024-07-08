"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLRelationshipReducer = void 0;
var tslib_1 = require("tslib");
var UMLRelationshipReducer = function (state, action) {
    var _a, _b, _c, _d;
    if (state === void 0) { state = {}; }
    switch (action.type) {
        case "@@element/reconnectable/RECONNECT" /* ReconnectableActionTypes.RECONNECT */: {
            var payload = action.payload;
            return payload.connections.reduce(function (acc, connection) {
                var _a;
                return (tslib_1.__assign(tslib_1.__assign({}, acc), (_a = {}, _a[connection.id] = tslib_1.__assign(tslib_1.__assign({}, state[connection.id]), { source: tslib_1.__assign(tslib_1.__assign({}, state[connection.id].source), connection.source), target: tslib_1.__assign(tslib_1.__assign({}, state[connection.id].target), connection.target) }), _a)));
            }, state);
        }
        case "@@relationship/LAYOUT" /* UMLRelationshipActionTypes.LAYOUT */: {
            var payload = action.payload;
            return tslib_1.__assign(tslib_1.__assign({}, state), (_a = {}, _a[payload.id] = tslib_1.__assign(tslib_1.__assign({}, state[payload.id]), { path: payload.path, bounds: tslib_1.__assign(tslib_1.__assign({}, state[payload.id].bounds), payload.bounds), isManuallyLayouted: false }), _a));
        }
        case "@@relationship/WAYPOINTLAYOUT" /* UMLRelationshipActionTypes.WAYPOINTLAYOUT */: {
            var payload = action.payload;
            return tslib_1.__assign(tslib_1.__assign({}, state), (_b = {}, _b[payload.id] = tslib_1.__assign(tslib_1.__assign({}, state[payload.id]), { path: payload.path, bounds: tslib_1.__assign(tslib_1.__assign({}, state[payload.id].bounds), payload.bounds) }), _b));
        }
        case "@@relationship/waypoints/START" /* UMLRelationshipActionTypes.STARTWAYPOINTSLAYOUT */: {
            var payload = action.payload;
            return tslib_1.__assign(tslib_1.__assign({}, state), (_c = {}, _c[payload.id] = tslib_1.__assign(tslib_1.__assign({}, state[payload.id]), { path: payload.path, bounds: tslib_1.__assign(tslib_1.__assign({}, state[payload.id].bounds), payload.bounds) }), _c));
        }
        case "@@relationship/waypoints/END" /* UMLRelationshipActionTypes.ENDWAYPOINTSLAYOUT */: {
            var payload = action.payload;
            return tslib_1.__assign(tslib_1.__assign({}, state), (_d = {}, _d[payload.id] = tslib_1.__assign(tslib_1.__assign({}, state[payload.id]), { isManuallyLayouted: true }), _d));
        }
    }
    return state;
};
exports.UMLRelationshipReducer = UMLRelationshipReducer;
//# sourceMappingURL=uml-relationship-reducer.js.map