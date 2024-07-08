"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connectable = void 0;
var tslib_1 = require("tslib");
var uml_relationship_type_1 = require("../../../packages/uml-relationship-type");
var uml_relationships_1 = require("../../../packages/uml-relationships");
var uml_element_common_repository_1 = require("../uml-element-common-repository");
var uml_elements_1 = require("../../../packages/uml-elements");
var uml_relationship_common_repository_1 = require("../../uml-relationship/uml-relationship-common-repository");
exports.Connectable = {
    startConnecting: function (direction, id) {
        return function (dispatch, getState) {
            var ids = id
                ? Array.isArray(id)
                    ? id
                    : [id]
                : getState()
                    .selected.map(function (elementId) { return dispatch(uml_element_common_repository_1.UMLElementCommonRepository.getById(elementId)); })
                    .filter(function (element) { return element !== null; })
                    .filter(function (element) { return uml_elements_1.UMLElements[element.type].features.connectable; })
                    .map(function (element) { return element.id; });
            var directions = Array.isArray(direction) ? direction : [direction];
            if (!ids.length || (directions.length !== 1 && directions.length !== ids.length)) {
                return;
            }
            var ports = ids.map(function (elementId, index) { return ({
                element: elementId,
                direction: directions.length === 1 ? directions[0] : directions[index],
            }); });
            dispatch({
                type: "@@element/connectable/START" /* ConnectableActionTypes.START */,
                payload: { ports: ports },
                undoable: false,
            });
        };
    },
    connect: function (target, source) {
        return function (dispatch, getState) {
            var e_1, _a;
            var sources = source ? (Array.isArray(source) ? source : [source]) : getState().connecting;
            var targets = Array.isArray(target) ? target : [target];
            if (!targets.length || (targets.length !== 1 && targets.length !== sources.length)) {
                return;
            }
            var connections = [];
            try {
                for (var _b = tslib_1.__values(sources.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = tslib_1.__read(_c.value, 2), index = _d[0], port = _d[1];
                    // try to connect to target - if target.length === 1 -> connect to same element
                    var connectionTarget = targets.length === 1 ? targets[0] : targets[index];
                    if (port.element === connectionTarget.element && port.direction === connectionTarget.direction) {
                        continue;
                    }
                    connections.push({ source: port, target: connectionTarget });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            var relationships = connections.map(function (connection) {
                var sourceElement = dispatch(uml_element_common_repository_1.UMLElementCommonRepository.getById(connection.source.element));
                var targetElement = dispatch(uml_element_common_repository_1.UMLElementCommonRepository.getById(connection.target.element));
                var relationshipType;
                // determine the common supported connection types and choose one for the connection
                if (sourceElement && targetElement) {
                    var commonSupportedConnections = uml_relationship_common_repository_1.UMLRelationshipCommonRepository.getSupportedConnectionsForElements([
                        sourceElement,
                        targetElement,
                    ]);
                    // take the first common supported connection type or default diagram type
                    relationshipType =
                        commonSupportedConnections.length > 0
                            ? commonSupportedConnections[0]
                            : uml_relationship_type_1.DefaultUMLRelationshipType[getState().diagram.type];
                }
                else {
                    // take default diagram type
                    relationshipType = uml_relationship_type_1.DefaultUMLRelationshipType[getState().diagram.type];
                }
                var Classifier = uml_relationships_1.UMLRelationships[relationshipType];
                return new Classifier(connection);
            });
            if (connections.length) {
                dispatch(uml_element_common_repository_1.UMLElementCommonRepository.create(relationships));
            }
            if (!source) {
                dispatch({
                    type: "@@element/connectable/END" /* ConnectableActionTypes.END */,
                    payload: { ports: sources },
                    undoable: false,
                });
            }
        };
    },
    endConnecting: function (port) {
        return function (dispatch, getState) {
            var ports = port ? (Array.isArray(port) ? port : [port]) : getState().connecting;
            if (!ports.length) {
                return;
            }
            dispatch({
                type: "@@element/connectable/END" /* ConnectableActionTypes.END */,
                payload: { ports: ports },
                undoable: false,
            });
        };
    },
};
//# sourceMappingURL=connectable-repository.js.map