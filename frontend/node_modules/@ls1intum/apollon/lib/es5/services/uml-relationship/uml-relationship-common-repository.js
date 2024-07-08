"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLRelationshipCommonRepository = void 0;
var uml_relationships_1 = require("../../packages/uml-relationships");
var uml_relationship_1 = require("./uml-relationship");
var uml_elements_1 = require("../../packages/uml-elements");
exports.UMLRelationshipCommonRepository = {
    get: function (element) {
        if (!element) {
            return null;
        }
        if (uml_relationship_1.UMLRelationship.isUMLRelationship(element)) {
            var Classifier = uml_relationships_1.UMLRelationships[element.type];
            return new Classifier(element);
        }
        return null;
    },
    getById: function (id) {
        return function (dispatch, getState) {
            var elements = getState().elements;
            return exports.UMLRelationshipCommonRepository.get(elements[id]);
        };
    },
    getSupportedConnectionsForElements: function (elements) {
        var elementsArray = Array.isArray(elements) ? elements : [elements];
        if (!(elementsArray.length > 0)) {
            return [];
        }
        // determine the common supported connection types
        return elementsArray.reduce(function (supportedConnections, element) {
            var elementSupportedConnections = uml_elements_1.UMLElements[element.type].supportedRelationships;
            return supportedConnections.filter(function (supportedConnection) {
                return elementSupportedConnections.includes(supportedConnection);
            });
        }, uml_elements_1.UMLElements[elementsArray[0].type].supportedRelationships);
    },
    layout: function (id, path, bounds) { return ({
        type: "@@relationship/LAYOUT" /* UMLRelationshipActionTypes.LAYOUT */,
        payload: { id: id, path: path, bounds: bounds },
        undoable: false,
    }); },
    layoutWaypoints: function (id, path, bounds) { return ({
        type: "@@relationship/WAYPOINTLAYOUT" /* UMLRelationshipActionTypes.WAYPOINTLAYOUT */,
        payload: { id: id, path: path, bounds: bounds },
        undoable: false,
    }); },
    flip: function (id) {
        return function (dispatch, getState) {
            var _a = getState(), selected = _a.selected, elements = _a.elements;
            var ids = id ? (Array.isArray(id) ? id : [id]) : selected;
            var connections = ids.map(function (r) {
                var relationship = elements[r];
                var source = { element: relationship.target.element, direction: relationship.target.direction };
                var target = { element: relationship.source.element, direction: relationship.source.direction };
                return { id: relationship.id, source: source, target: target };
            });
            dispatch({
                type: "@@element/reconnectable/RECONNECT" /* ReconnectableActionTypes.RECONNECT */,
                payload: { connections: connections },
                undoable: true,
            });
        };
    },
    startWaypointsLayout: function (id, path, bounds) {
        return function (dispatch) {
            var ids = id ? (Array.isArray(id) ? id : [id]) : undefined;
            if (ids && !ids.length) {
                return;
            }
            dispatch({
                type: "@@relationship/waypoints/START" /* UMLRelationshipActionTypes.STARTWAYPOINTSLAYOUT */,
                payload: { id: id, path: path, bounds: bounds },
                undoable: false,
            });
        };
    },
    endWaypointsLayout: function (id) {
        return function (dispatch) {
            if (!id.length) {
                return;
            }
            dispatch({
                type: "@@relationship/waypoints/END" /* UMLRelationshipActionTypes.ENDWAYPOINTSLAYOUT */,
                payload: { id: id },
                undoable: false,
            });
        };
    },
};
//# sourceMappingURL=uml-relationship-common-repository.js.map