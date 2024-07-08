"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLDiagramReducer = void 0;
var tslib_1 = require("tslib");
var uml_diagram_1 = require("./uml-diagram");
var UMLDiagramReducer = function (state, action) {
    if (state === void 0) { state = new uml_diagram_1.UMLDiagram(); }
    switch (action.type) {
        case "@@element/diagram/APPEND" /* UMLDiagramActionTypes.APPEND */: {
            var payload = action.payload;
            return tslib_1.__assign(tslib_1.__assign({}, state), { ownedRelationships: tslib_1.__spreadArray([], tslib_1.__read(new Set(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(payload.ids), false), tslib_1.__read(state.ownedRelationships), false))), false).reverse() });
        }
        case "@@element/container/APPEND" /* UMLContainerActionTypes.APPEND */: {
            var payload_1 = action.payload;
            if (state.id !== payload_1.owner) {
                return tslib_1.__assign(tslib_1.__assign({}, state), { ownedElements: state.ownedElements.filter(function (id) { return !payload_1.ids.includes(id); }) });
            }
            return tslib_1.__assign(tslib_1.__assign({}, state), { ownedElements: tslib_1.__spreadArray([], tslib_1.__read(new Set(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(state.ownedElements), false), tslib_1.__read(payload_1.ids), false))), false) });
        }
        case "@@element/diagram/BRING_TO_FRONT" /* UMLDiagramActionTypes.BRING_TO_FRONT */: {
            var ids_1 = action.payload.ids;
            // order in svg 1.2 is defined by rendering order -> change rendering order to draw one element in front of another
            return tslib_1.__assign(tslib_1.__assign({}, state), { ownedElements: tslib_1.__spreadArray([], tslib_1.__read(state.ownedElements), false).filter(function (id) { return !ids_1.includes(id); }).concat(ids_1) });
        }
        case "@@element/container/REMOVE" /* UMLContainerActionTypes.REMOVE */: {
            var payload_2 = action.payload;
            return tslib_1.__assign(tslib_1.__assign({}, state), { ownedElements: state.ownedElements.filter(function (id) { return !payload_2.ids.includes(id); }), ownedRelationships: state.ownedRelationships.filter(function (id) { return !payload_2.ids.includes(id); }) });
        }
        case "@@element/resizable/RESIZE" /* ResizingActionTypes.RESIZE */: {
            var payload = action.payload;
            if (!payload.ids.includes(state.id)) {
                break;
            }
            return tslib_1.__assign(tslib_1.__assign({}, state), { bounds: tslib_1.__assign(tslib_1.__assign({}, state.bounds), { width: state.bounds.width + payload.delta.width, height: state.bounds.height + payload.delta.height }), resizeFrom: payload.resizeFrom });
        }
    }
    return state;
};
exports.UMLDiagramReducer = UMLDiagramReducer;
//# sourceMappingURL=uml-diagram-reducer.js.map