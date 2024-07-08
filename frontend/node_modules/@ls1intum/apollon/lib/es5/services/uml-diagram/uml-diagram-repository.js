"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLDiagramRepository = void 0;
var diagram_type_1 = require("../../packages/diagram-type");
var uml_diagram_1 = require("./uml-diagram");
exports.UMLDiagramRepository = {
    isUMLDiagram: function (element) { return element.type in diagram_type_1.UMLDiagramType; },
    get: function (element) {
        if (!element || !exports.UMLDiagramRepository.isUMLDiagram(element)) {
            return null;
        }
        return new uml_diagram_1.UMLDiagram(element);
    },
    append: function (id) {
        return function (dispatch, getState) {
            dispatch({
                type: "@@element/diagram/APPEND" /* UMLDiagramActionTypes.APPEND */,
                payload: { ids: Array.isArray(id) ? id : [id] },
                undoable: false,
            });
        };
    },
    bringToFront: function (elementId) {
        return function (dispatch, getState) {
            var ids = (Array.isArray(elementId) ? elementId : [elementId]).filter(function (id) {
                return getState().diagram.ownedElements.includes(id);
            });
            dispatch({
                type: "@@element/diagram/BRING_TO_FRONT" /* UMLDiagramActionTypes.BRING_TO_FRONT */,
                payload: { ids: ids },
                undoable: false,
            });
        };
    },
};
//# sourceMappingURL=uml-diagram-repository.js.map