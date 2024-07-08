"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLElementCommonRepository = void 0;
var tslib_1 = require("tslib");
var uml_elements_1 = require("../../packages/uml-elements");
var point_1 = require("../../utils/geometry/point");
var tree_1 = require("../../utils/geometry/tree");
var uml_container_1 = require("../uml-container/uml-container");
var uml_container_repository_1 = require("../uml-container/uml-container-repository");
var uml_element_1 = require("./uml-element");
exports.UMLElementCommonRepository = {
    /**
     * Creates new instances of `UMLElements`
     *
     * @param value - An array of new values for the instances to create.
     * @param [owner] - Specify the owner for the new elements.
     */
    create: function (value, owner) {
        return function (dispatch) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var values, roots;
            return tslib_1.__generator(this, function (_a) {
                values = Array.isArray(value) ? value : [value];
                dispatch({
                    type: "@@element/CREATE" /* UMLElementActionTypes.CREATE */,
                    payload: { values: values },
                    undoable: true,
                });
                roots = values.filter(function (x) { return !x.owner; }).map(function (x) { return x.id; });
                if (roots.length) {
                    dispatch(uml_container_repository_1.UMLContainerRepository.append(roots, owner));
                }
                return [2 /*return*/];
            });
        }); };
    },
    /** Read an UMLElement */
    get: function (element) {
        if (!element) {
            return null;
        }
        if (uml_element_1.UMLElement.isUMLElement(element)) {
            var Classifier = uml_elements_1.UMLElements[element.type];
            return new Classifier(element);
        }
        return null;
    },
    /** Read an UMLElement by id */
    getById: function (id) {
        return function (dispatch, getState) {
            var elements = getState().elements;
            return exports.UMLElementCommonRepository.get(elements[id]);
        };
    },
    /** Update existing elements */
    update: function (id, values) { return ({
        type: "@@element/UPDATE" /* UMLElementActionTypes.UPDATE */,
        payload: { values: (Array.isArray(id) ? id : [id]).map(function (i) { return (tslib_1.__assign({ id: i }, values)); }) },
        undoable: false,
    }); },
    /** Delete existing elements */
    delete: function (id) {
        return function (dispatch, getState) {
            var _a = getState(), elements = _a.elements, selected = _a.selected;
            var ids = id ? (Array.isArray(id) ? id : [id]) : selected;
            var roots = (0, tree_1.filterRoots)(ids, elements);
            if (!roots.length) {
                return;
            }
            dispatch(uml_container_repository_1.UMLContainerRepository.remove(roots));
            dispatch({
                type: "@@element/DELETE" /* UMLElementActionTypes.DELETE */,
                payload: { ids: (0, tree_1.getChildren)(roots, elements) },
                undoable: false,
            });
        };
    },
    /** Composes the absolute position of an element */
    getAbsolutePosition: function (id) {
        return function (dispatch, getState) {
            var elements = getState().elements;
            // if the element is currently moving the position update is only done in moving redux state
            // thus take the elements from moving to calculate absolute position
            var element = elements[id];
            var position = new point_1.Point(element.bounds.x, element.bounds.y);
            while (element.owner) {
                element = elements[element.owner];
                position = position.add(element.bounds.x, element.bounds.y);
            }
            return position;
        };
    },
    getChildren: function (id) {
        return function (dispatch, getState) {
            var elements = getState().elements;
            var owner = elements[id];
            if (!owner) {
                return [];
            }
            if (uml_container_1.UMLContainer.isUMLContainer(owner)) {
                return owner.ownedElements.reduce(function (acc, element) { return tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(acc), false), tslib_1.__read(dispatch(exports.UMLElementCommonRepository.getChildren(element))), false); }, [owner]);
            }
            return [owner];
        };
    },
};
//# sourceMappingURL=uml-element-common-repository.js.map