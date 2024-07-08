"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reconnectable = void 0;
var tslib_1 = require("tslib");
var not_empty_1 = require("../../../utils/not-empty");
var uml_relationship_1 = require("../uml-relationship");
var uml_relationship_common_repository_1 = require("../uml-relationship-common-repository");
exports.Reconnectable = {
    /**
     * creates a StTartReconnectingAction
     * @param endpoint the endpoint which should be reconnected. This endpoint will be part of the new connection, the other one is replaced.
     * @param id relationship id / ids, if omitted -> take all relationships from selected state
     */
    startReconnecting: function (endpoint, id) {
        return function (dispatch, getState) {
            var ids = id
                ? Array.isArray(id)
                    ? id
                    : [id]
                : getState()
                    .selected.map(function (elementId) { return dispatch(uml_relationship_common_repository_1.UMLRelationshipCommonRepository.getById(elementId)); })
                    // all relationships are reconnectable + its a static property, that's why it is enough to check for relationship
                    .filter(function (element) { return element !== null && uml_relationship_1.UMLRelationship.isUMLRelationship(element); })
                    .map(function (element) { return element.id; });
            if (!ids.length) {
                return;
            }
            dispatch({
                type: "@@element/reconnectable/START" /* ReconnectableActionTypes.START */,
                payload: { ids: ids, endpoint: endpoint },
                undoable: true,
            });
        };
    },
    reconnect: function (target) {
        return function (dispatch, getState) {
            var _a = getState(), reconnecting = _a.reconnecting, elements = _a.elements;
            var connections = Object.keys(reconnecting)
                .map(function (id) {
                var _a;
                var relationship = elements[id];
                var endpoint1 = reconnecting[id];
                var endpoint2 = endpoint1 === 'source' ? 'target' : 'source';
                var connection = (_a = {},
                    _a[endpoint1] = relationship[endpoint1],
                    _a[endpoint2] = tslib_1.__assign(tslib_1.__assign({}, relationship[endpoint2]), target),
                    _a);
                if (connection.source.element === connection.target.element &&
                    connection.source.direction === connection.target.direction) {
                    return null;
                }
                return tslib_1.__assign({ id: id }, connection);
            })
                .filter(not_empty_1.notEmpty);
            if (!connections.length) {
                return;
            }
            dispatch({
                type: "@@element/reconnectable/RECONNECT" /* ReconnectableActionTypes.RECONNECT */,
                payload: { connections: connections },
                undoable: false,
            });
        };
    },
    endReconnecting: function (id) {
        return function (dispatch, getState) {
            var ids = id ? (Array.isArray(id) ? id : [id]) : Object.keys(getState().reconnecting);
            if (!ids.length) {
                return;
            }
            dispatch({
                type: "@@element/reconnectable/END" /* ReconnectableActionTypes.END */,
                payload: { ids: ids },
                undoable: false,
            });
        };
    },
};
//# sourceMappingURL=reconnectable-repository.js.map