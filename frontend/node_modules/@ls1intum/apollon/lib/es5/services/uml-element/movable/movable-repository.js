"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movable = void 0;
var tslib_1 = require("tslib");
var uml_elements_1 = require("../../../packages/uml-elements");
var uml_relationships_1 = require("../../../packages/uml-relationships");
var tree_1 = require("../../../utils/geometry/tree");
var uml_diagram_repository_1 = require("../../uml-diagram/uml-diagram-repository");
// when moving an element, it is copied from the elements of the redux state and handled in the moving state separately
// we do this, because it enables us to not do a full shallow copy of all elements in the state, when a pointer move event is triggered
// but just update the position of elements which are actually moved
// that is why there is the the separation of movable and moving reducer
exports.Movable = {
    startMoving: function (id) {
        return function (dispatch, getState) {
            var e_1, _a;
            var _b = getState(), elements = _b.elements, selected = _b.selected;
            var ids = id ? (Array.isArray(id) ? id : [id]) : (0, tree_1.filterRoots)(selected, elements);
            var movables = [];
            var constructors = tslib_1.__assign(tslib_1.__assign({}, uml_elements_1.UMLElements), uml_relationships_1.UMLRelationships);
            try {
                for (var ids_1 = tslib_1.__values(ids), ids_1_1 = ids_1.next(); !ids_1_1.done; ids_1_1 = ids_1.next()) {
                    var i = ids_1_1.value;
                    var feature = constructors[elements[i].type].features;
                    if (feature.movable) {
                        movables.push(i);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (ids_1_1 && !ids_1_1.done && (_a = ids_1.return)) _a.call(ids_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (!movables.length) {
                return;
            }
            dispatch(uml_diagram_repository_1.UMLDiagramRepository.bringToFront(ids));
            dispatch({
                type: "@@element/movable/START" /* MovableActionTypes.START */,
                payload: { ids: movables },
                undoable: true,
            });
        };
    },
    move: function (delta, id) {
        return function (dispatch, getState) {
            var ids = id ? (Array.isArray(id) ? id : [id]) : getState().moving;
            if (!ids.length) {
                return;
            }
            dispatch({
                type: "@@element/movable/MOVE" /* MovingActionTypes.MOVE */,
                payload: { ids: ids, delta: delta },
                undoable: false,
            });
        };
    },
    endMoving: function (id, keyboard) {
        if (keyboard === void 0) { keyboard = false; }
        return function (dispatch, getState) {
            var ids = id ? (Array.isArray(id) ? id : [id]) : getState().moving;
            if (!ids.length) {
                return;
            }
            dispatch({
                type: "@@element/movable/END" /* MovableActionTypes.END */,
                payload: { ids: ids, keyboard: keyboard },
                undoable: false,
            });
        };
    },
};
//# sourceMappingURL=movable-repository.js.map