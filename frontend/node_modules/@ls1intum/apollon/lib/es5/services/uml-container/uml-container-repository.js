"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLContainerRepository = void 0;
var uml_elements_1 = require("../../packages/uml-elements");
var uml_diagram_repository_1 = require("../uml-diagram/uml-diagram-repository");
var uml_element_1 = require("../uml-element/uml-element");
var uml_relationship_1 = require("../uml-relationship/uml-relationship");
var uml_container_1 = require("./uml-container");
exports.UMLContainerRepository = {
    get: function (element) {
        if (!element) {
            return null;
        }
        if (uml_diagram_repository_1.UMLDiagramRepository.isUMLDiagram(element)) {
            return uml_diagram_repository_1.UMLDiagramRepository.get(element);
        }
        if (uml_container_1.UMLContainer.isUMLContainer(element)) {
            var Classifier = uml_elements_1.UMLElements[element.type];
            return new Classifier(element);
        }
        return null;
    },
    append: function (id, owner) {
        return function (dispatch, getState) {
            var ids = Array.isArray(id) ? id : [id];
            var _a = getState(), elements = _a.elements, diagram = _a.diagram;
            var rels = ids.filter(function (x) { return uml_relationship_1.UMLRelationship.isUMLRelationship(elements[x]); });
            if (rels.length) {
                dispatch({
                    type: "@@element/diagram/APPEND" /* UMLDiagramActionTypes.APPEND */,
                    payload: { ids: rels },
                    undoable: false,
                });
            }
            var eles = ids.filter(function (x) { return uml_element_1.UMLElement.isUMLElement(elements[x]); });
            if (eles.length) {
                dispatch({
                    type: "@@element/container/APPEND" /* UMLContainerActionTypes.APPEND */,
                    payload: { ids: eles, owner: owner || diagram.id },
                    undoable: false,
                });
            }
        };
    },
    remove: function (id) { return ({
        type: "@@element/container/REMOVE" /* UMLContainerActionTypes.REMOVE */,
        payload: { ids: Array.isArray(id) ? id : [id] },
        undoable: true,
    }); },
};
//# sourceMappingURL=uml-container-repository.js.map