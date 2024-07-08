"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelState = void 0;
var tslib_1 = require("tslib");
var uml_elements_1 = require("../../packages/uml-elements");
var uml_relationships_1 = require("../../packages/uml-relationships");
var uml_container_1 = require("../../services/uml-container/uml-container");
var uml_element_1 = require("../../services/uml-element/uml-element");
var uml_element_repository_1 = require("../../services/uml-element/uml-element-repository");
var uml_relationship_1 = require("../../services/uml-relationship/uml-relationship");
var uml_relationship_repository_1 = require("../../services/uml-relationship/uml-relationship-repository");
var compat_1 = require("../../compat");
var uml_diagram_1 = require("../../services/uml-diagram/uml-diagram");
var util_1 = require("./util");
// TODO: simplify this code, break it into smaller pieces.
// FIXME: this code has issues in various cases, including when
//        the boundary of the diagram is determined by some relationship.
var ModelState = /** @class */ (function () {
    function ModelState() {
    }
    ModelState.fromModel = function (compatModel) {
        var model = (0, compat_1.backwardsCompatibleModel)(compatModel);
        var apollonElements = model.elements;
        var apollonRelationships = model.relationships;
        var deserialize = function (apollonElement) {
            var element = new uml_elements_1.UMLElements[apollonElement.type]();
            var children = uml_container_1.UMLContainer.isUMLContainer(element)
                ? Object.values(apollonElements)
                    .filter(function (child) { return child.owner === apollonElement.id; })
                    .map(function (val) {
                    var parent = apollonElements[val.owner];
                    return tslib_1.__assign(tslib_1.__assign({}, val), { bounds: tslib_1.__assign(tslib_1.__assign({}, val.bounds), { x: val.bounds.x - parent.bounds.x, y: val.bounds.y - parent.bounds.y }) });
                })
                : [];
            element.deserialize(apollonElement, children);
            return tslib_1.__spreadArray([element], tslib_1.__read(children.reduce(function (acc, val) { return tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(acc), false), tslib_1.__read(deserialize(val)), false); }, [])), false);
        };
        var elements = Object.values(apollonElements)
            .filter(function (element) { return !element.owner; })
            .reduce(function (acc, val) { return tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(acc), false), tslib_1.__read(deserialize(val)), false); }, []);
        var relationships = Object.values(apollonRelationships).map(function (apollonRelationship) {
            var relationship = new uml_relationships_1.UMLRelationships[apollonRelationship.type]();
            relationship.deserialize(apollonRelationship);
            return relationship;
        });
        // set diagram to keep diagram type
        var diagram = new uml_diagram_1.UMLDiagram();
        diagram.type = model.type;
        diagram.ownedRelationships = Object.values(model.relationships).map(function (s) {
            return s.id;
        });
        return {
            diagram: diagram,
            interactive: tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read((0, util_1.inclusionMapToArray)(model.interactive.elements)), false), tslib_1.__read((0, util_1.inclusionMapToArray)(model.interactive.relationships)), false),
            elements: tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(elements), false), tslib_1.__read(relationships), false).reduce(function (acc, val) {
                var _a;
                return (tslib_1.__assign(tslib_1.__assign({}, acc), (_a = {}, _a[val.id] = tslib_1.__assign({}, val), _a)));
            }, {}),
            assessments: (Object.values(model.assessments) || []).reduce(function (acc, val) {
                var _a;
                return (tslib_1.__assign(tslib_1.__assign({}, acc), (_a = {}, _a[val.modelElementId] = {
                    score: val.score,
                    feedback: val.feedback,
                    label: val.label,
                    labelColor: val.labelColor,
                    correctionStatus: val.correctionStatus,
                    dropInfo: val.dropInfo,
                }, _a)));
            }, {}),
        };
    };
    ModelState.toModel = function (state) {
        var elements = Object.values(state.elements)
            .map(function (element) { return uml_element_repository_1.UMLElementRepository.get(element); })
            .reduce(function (acc, val) {
            var _a;
            return (tslib_1.__assign(tslib_1.__assign({}, acc), (val && (_a = {}, _a[val.id] = val, _a))));
        }, {});
        var relationships = Object.values(state.elements)
            .filter(function (x) { return uml_relationship_1.UMLRelationship.isUMLRelationship(x); })
            .map(function (relationship) { return uml_relationship_repository_1.UMLRelationshipRepository.get(relationship); });
        var serialize = function (element) {
            var _a, e_1, _b;
            var children = uml_container_1.UMLContainer.isUMLContainer(element)
                ? element.ownedElements.map(function (id) { return elements[id]; })
                : [];
            var res = (_a = {},
                _a[element.id] = element.serialize(children),
                _a);
            try {
                for (var children_1 = tslib_1.__values(children), children_1_1 = children_1.next(); !children_1_1.done; children_1_1 = children_1.next()) {
                    var child = children_1_1.value;
                    var childres = serialize(child);
                    Object.values(childres).forEach(function (child) {
                        child.bounds.x += element.bounds.x;
                        child.bounds.y += element.bounds.y;
                    });
                    Object.assign(res, childres);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (children_1_1 && !children_1_1.done && (_b = children_1.return)) _b.call(children_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return res;
        };
        var apollonElements = Object.values(elements)
            .filter(function (element) { return !element.owner; })
            .reduce(function (acc, element) { return (tslib_1.__assign(tslib_1.__assign({}, acc), serialize(element))); }, {});
        var apollonElementsArray = Object.values(apollonElements);
        var apollonRelationships = relationships.map(function (relationship) {
            return relationship.serialize();
        });
        var interactive = {
            elements: (0, util_1.arrayToInclusionMap)(state.interactive.filter(function (id) { return uml_element_1.UMLElement.isUMLElement(state.elements[id]); })),
            relationships: (0, util_1.arrayToInclusionMap)(state.interactive.filter(function (id) { return uml_relationship_1.UMLRelationship.isUMLRelationship(state.elements[id]); })),
        };
        var assessments = Object.fromEntries(Object.entries(state.assessments).map(function (_a) {
            var _b = tslib_1.__read(_a, 2), id = _b[0], assessment = _b[1];
            return [
                id,
                {
                    modelElementId: id,
                    elementType: state.elements[id].type,
                    score: state.assessments[id].score,
                    feedback: state.assessments[id].feedback,
                    label: state.assessments[id].label,
                    labelColor: state.assessments[id].labelColor,
                    correctionStatus: state.assessments[id].correctionStatus,
                    dropInfo: state.assessments[id].dropInfo,
                },
            ];
        }));
        return {
            version: '3.0.0',
            type: state.diagram.type,
            size: { width: state.diagram.bounds.width, height: state.diagram.bounds.height },
            interactive: interactive,
            elements: apollonElements,
            relationships: Object.fromEntries(apollonRelationships.map(function (relationship) { return [relationship.id, relationship]; })),
            assessments: assessments,
        };
    };
    return ModelState;
}());
exports.ModelState = ModelState;
//# sourceMappingURL=model-state.js.map