"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLContainerReducer = void 0;
var tslib_1 = require("tslib");
var point_1 = require("../../utils/geometry/point");
var not_empty_1 = require("../../utils/not-empty");
var uml_container_1 = require("./uml-container");
var uml_elements_1 = require("../../packages/uml-elements");
var UMLContainerReducer = function (state, action) {
    var _a;
    if (state === void 0) { state = {}; }
    switch (action.type) {
        case "@@element/container/APPEND" /* UMLContainerActionTypes.APPEND */: {
            var payload = action.payload;
            var container_1 = state[payload.owner];
            var elementState = tslib_1.__assign(tslib_1.__assign({}, state), (container_1 &&
                uml_container_1.UMLContainer.isUMLContainer(container_1) && (_a = {},
                _a[container_1.id] = tslib_1.__assign(tslib_1.__assign({}, container_1), { ownedElements: tslib_1.__spreadArray([], tslib_1.__read(new Set(
                    // TODO: find better solution for this
                    // hacky: create new Element of Container type to reorder children. This must be done, because js prototype is lost in redux state
                    new uml_elements_1.UMLElements[container_1.type]().reorderChildren(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(container_1.ownedElements), false), tslib_1.__read(payload.ids), false).map(function (id) { return state[id]; })))), false) }),
                _a)));
            var reduce = function (elements, id) {
                var _a;
                var element = elements[id];
                var position = new point_1.Point(element.bounds.x, element.bounds.y);
                var current = element.owner && elements[element.owner];
                while (current) {
                    position = position.add(current.bounds.x, current.bounds.y);
                    current = current.owner ? elements[current.owner] : null;
                }
                current = container_1;
                while (current) {
                    position = position.subtract(current.bounds.x, current.bounds.y);
                    current = current.owner ? elements[current.owner] : null;
                }
                return tslib_1.__assign(tslib_1.__assign({}, elements), (_a = {}, _a[id] = tslib_1.__assign(tslib_1.__assign({}, elements[id]), { owner: container_1 ? container_1.id : null, bounds: tslib_1.__assign(tslib_1.__assign({}, element.bounds), position) }), _a));
            };
            return payload.ids.filter(function (id) { return state[id]; }).reduce(reduce, elementState);
        }
        case "@@element/container/REMOVE" /* UMLContainerActionTypes.REMOVE */: {
            var payload_1 = action.payload;
            var ids = tslib_1.__spreadArray([], tslib_1.__read(new Set(payload_1.ids
                .filter(function (id) { return state[id] && state[id].owner; })
                .map(function (id) { return state[id].owner; })
                .filter(not_empty_1.notEmpty))), false);
            return ids.reduce(function (elements, id) {
                var _a;
                return (tslib_1.__assign(tslib_1.__assign({}, elements), (_a = {}, _a[id] = tslib_1.__assign(tslib_1.__assign({}, state[id]), { ownedElements: state[id].ownedElements.filter(function (element) { return !payload_1.ids.includes(element); }) }), _a)));
            }, state);
        }
    }
    return state;
};
exports.UMLContainerReducer = UMLContainerReducer;
//# sourceMappingURL=uml-container-reducer.js.map