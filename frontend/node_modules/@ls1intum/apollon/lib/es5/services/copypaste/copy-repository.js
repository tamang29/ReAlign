"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopyRepository = void 0;
var tslib_1 = require("tslib");
var tree_1 = require("../../utils/geometry/tree");
var not_empty_1 = require("../../utils/not-empty");
var uml_element_repository_1 = require("../uml-element/uml-element-repository");
var uml_element_type_1 = require("../../packages/uml-element-type");
var uml_relationship_repository_1 = require("../uml-relationship/uml-relationship-repository");
var CopyRepository = /** @class */ (function () {
    function CopyRepository() {
    }
    CopyRepository.transformElementsForCopy = function (umlElements) {
        // roots in diagram Elements
        var roots = umlElements.filter(function (element) { return !element.owner || umlElements.every(function (innerElement) { return innerElement.id !== element.owner; }); });
        var cloneMap = {};
        // flat map elements to copies
        var copies = roots.reduce(function (clonedElements, element) {
            element.owner = null;
            element.bounds.x = element.bounds.x + 10 * CopyRepository.pasteCounter;
            element.bounds.y = element.bounds.y + 10 * CopyRepository.pasteCounter;
            var clones = (0, tree_1.clone)(element, umlElements);
            cloneMap[element.id] = clones[0].id;
            return clonedElements.concat.apply(clonedElements, tslib_1.__spreadArray([], tslib_1.__read(clones), false));
        }, []);
        // map elements to serializable elements
        return { copiedElements: copies.map(function (element) { return (tslib_1.__assign({}, element)); }), cloneMap: cloneMap };
    };
    CopyRepository.transformRelationshipsForCopy = function (umlRelationships, cloneMap) {
        // roots in diagram Elements
        var roots = umlRelationships.filter(function (element) { return !element.owner || umlRelationships.every(function (innerElement) { return innerElement.id !== element.owner; }); });
        // flat map elements to copies
        var copies = roots.reduce(function (clonedElements, element) {
            element.owner = null;
            element.bounds.x = element.bounds.x + 10 * CopyRepository.pasteCounter;
            element.bounds.y = element.bounds.y + 10 * CopyRepository.pasteCounter;
            element.source.element = cloneMap[element.source.element];
            element.target.element = cloneMap[element.target.element];
            var newPath = element.path.map(function (pathPoint) { return ({ x: pathPoint.x + 10, y: pathPoint.y + 10 }); });
            element.path = tslib_1.__spreadArray([newPath[0], newPath[1]], tslib_1.__read(newPath.slice(2)), false);
            var clones = [element.cloneRelationship()];
            return clonedElements.concat.apply(clonedElements, tslib_1.__spreadArray([], tslib_1.__read(clones), false));
        }, []);
        // map elements to serializable elements
        return copies.map(function (relationship) { return (tslib_1.__assign({}, relationship)); });
    };
    /**
     * Counts how often paste commands are executed to set offset
     */
    CopyRepository.pasteCounter = 0;
    CopyRepository.copy = function (id) {
        return function (dispatch, getState) {
            CopyRepository.pasteCounter = 0;
            var _a = getState(), elements = _a.elements, selected = _a.selected;
            var ids = id ? (Array.isArray(id) ? id : [id]) : selected;
            // copy elements with all their child elements, because containers do not know their full children representation
            var idsToClone = (0, tree_1.getChildren)(ids, getState().elements);
            var result = idsToClone
                .map(function (idToClone) { return uml_element_repository_1.UMLElementRepository.get(elements[idToClone]); })
                .filter(not_empty_1.notEmpty);
            if (getState().editor.enableCopyPasteToClipboard) {
                navigator.clipboard.writeText(JSON.stringify(result));
                return;
            }
            else {
                return dispatch({
                    type: "@@copy/COPY" /* CopyActionTypes.COPY */,
                    payload: idsToClone,
                    undoable: false,
                });
            }
        };
    };
    CopyRepository.paste = function () { return function (dispatch, getState) {
        CopyRepository.pasteCounter++;
        if (getState().editor.enableCopyPasteToClipboard) {
            navigator.clipboard
                .readText()
                .then(function (value) {
                var parsedElements = JSON.parse(value);
                var currentDiagramType = getState().diagram.type;
                // all elements must be supported Apollon elements and part of the current diagram type
                var diagramElements = parsedElements
                    .map(function (x) { return uml_element_repository_1.UMLElementRepository.get(x); })
                    .filter(not_empty_1.notEmpty)
                    .filter(function (element) { return element.type in uml_element_type_1.UMLElementsForDiagram[currentDiagramType]; });
                return CopyRepository.transformElementsForCopy(diagramElements);
            })
                .then(function (_a) {
                var copiedElements = _a.copiedElements;
                dispatch(uml_element_repository_1.UMLElementRepository.create(copiedElements));
                dispatch(uml_element_repository_1.UMLElementRepository.deselect());
                dispatch(uml_element_repository_1.UMLElementRepository.select((0, tree_1.filterRoots)(copiedElements.map(function (element) { return element.id; }), getState().elements)));
            });
        }
        else {
            var copy_1 = getState().copy;
            dispatch({ type: "@@copy/PASTE" /* CopyActionTypes.PASTE */, payload: {}, undoable: false });
            var elements_1 = getState().elements;
            var elementsToCopy = copy_1
                .map(function (IdOfCopyElement) { return uml_element_repository_1.UMLElementRepository.get(elements_1[IdOfCopyElement]); })
                .filter(not_empty_1.notEmpty);
            var relationshipsToCopy = copy_1
                .map(function (IdOfCopyElement) { return uml_relationship_repository_1.UMLRelationshipRepository.get(elements_1[IdOfCopyElement]); })
                .filter(not_empty_1.notEmpty)
                .filter(function (relationship) {
                return relationship.source &&
                    relationship.target &&
                    copy_1.includes(relationship.source.element) &&
                    copy_1.includes(relationship.target.element);
            });
            var _a = CopyRepository.transformElementsForCopy(elementsToCopy), copiedElements = _a.copiedElements, cloneMap = _a.cloneMap;
            dispatch(uml_element_repository_1.UMLElementRepository.create(copiedElements));
            dispatch(uml_element_repository_1.UMLElementRepository.deselect());
            var copiedRelationships = CopyRepository.transformRelationshipsForCopy(relationshipsToCopy, cloneMap);
            dispatch(uml_element_repository_1.UMLElementRepository.create(copiedRelationships));
            dispatch(uml_element_repository_1.UMLElementRepository.select((0, tree_1.filterRoots)(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(copiedElements), false), tslib_1.__read(copiedRelationships), false).map(function (element) { return element.id; }), getState().elements)));
        }
    }; };
    return CopyRepository;
}());
exports.CopyRepository = CopyRepository;
//# sourceMappingURL=copy-repository.js.map