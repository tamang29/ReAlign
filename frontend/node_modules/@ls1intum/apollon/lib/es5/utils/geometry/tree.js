"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clone = exports.getChildren = exports.getAllParents = exports.filterRoots = void 0;
var tslib_1 = require("tslib");
var uml_container_1 = require("../../services/uml-container/uml-container");
function filterRoots(ids, elements) {
    var getSelection = function (root) {
        if (ids.includes(root.id))
            return [root.id];
        if (uml_container_1.UMLContainer.isUMLContainer(root)) {
            return root.ownedElements.reduce(function (selection, id) { return tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(selection), false), tslib_1.__read(getSelection(elements[id])), false); }, []);
        }
        return [];
    };
    return Object.values(elements)
        .filter(function (element) { return !element.owner; })
        .reduce(function (selection, element) { return tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(selection), false), tslib_1.__read(getSelection(element)), false); }, []);
}
exports.filterRoots = filterRoots;
/**
 * returns the ids of all elements in the hierarchy above the element with the specified id
 * @param id element id which parents should be found
 * @param elements elements in state
 */
function getAllParents(id, elements) {
    var getParents = function (element) {
        // reached top
        if (element.owner === null)
            return [];
        return tslib_1.__spreadArray([element.owner], tslib_1.__read(getParents(elements[element.owner])), false);
    };
    return getParents(elements[id]);
}
exports.getAllParents = getAllParents;
function getChildren(ids, elements) {
    var e_1, _a;
    var result = [];
    try {
        for (var ids_1 = tslib_1.__values(ids), ids_1_1 = ids_1.next(); !ids_1_1.done; ids_1_1 = ids_1.next()) {
            var id = ids_1_1.value;
            var owner = elements[id];
            if (!owner)
                continue;
            if (uml_container_1.UMLContainer.isUMLContainer(owner)) {
                result.push.apply(result, tslib_1.__spreadArray([], tslib_1.__read(getChildren(owner.ownedElements, elements)), false));
            }
            result.push(owner.id);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (ids_1_1 && !ids_1_1.done && (_a = ids_1.return)) _a.call(ids_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return result;
}
exports.getChildren = getChildren;
function clone(element, elements) {
    var e_2, _a;
    if (!uml_container_1.UMLContainer.isUMLContainer(element)) {
        return [element.clone()];
    }
    var result = [];
    var cloned = element.clone();
    var ownedElements = element.ownedElements;
    var _loop_1 = function (id) {
        var child = elements.find(function (prev) { return prev.id === id; });
        if (!child) {
            return "continue";
        }
        var _b = tslib_1.__read(clone(child, elements)), clonedChild = _b[0], clonedChildren = _b.slice(1);
        clonedChild.owner = cloned.id;
        var index = cloned.ownedElements.findIndex(function (x) { return x === id; });
        cloned.ownedElements[index] = clonedChild.id;
        result.push.apply(result, tslib_1.__spreadArray([clonedChild], tslib_1.__read(clonedChildren), false));
    };
    try {
        for (var ownedElements_1 = tslib_1.__values(ownedElements), ownedElements_1_1 = ownedElements_1.next(); !ownedElements_1_1.done; ownedElements_1_1 = ownedElements_1.next()) {
            var id = ownedElements_1_1.value;
            _loop_1(id);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (ownedElements_1_1 && !ownedElements_1_1.done && (_a = ownedElements_1.return)) _a.call(ownedElements_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return tslib_1.__spreadArray([cloned], tslib_1.__read(result), false);
}
exports.clone = clone;
//# sourceMappingURL=tree.js.map