"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLDiagramSaga = void 0;
var tslib_1 = require("tslib");
var effects_1 = require("redux-saga/effects");
var sagas_1 = require("../../utils/actions/sagas");
var not_empty_1 = require("../../utils/not-empty");
var editor_types_1 = require("../editor/editor-types");
var uml_element_repository_1 = require("../uml-element/uml-element-repository");
var uml_relationship_repository_1 = require("../uml-relationship/uml-relationship-repository");
var uml_diagram_repository_1 = require("./uml-diagram-repository");
function UMLDiagramSaga() {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, sagas_1.run)([selectRelationship, resizeAfterConnectionChange])];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.UMLDiagramSaga = UMLDiagramSaga;
function selectRelationship() {
    var action, _a, diagram, editor, ids;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, effects_1.take)("@@element/selectable/SELECT" /* SelectableActionTypes.SELECT */)];
            case 1:
                action = _b.sent();
                return [4 /*yield*/, (0, effects_1.select)()];
            case 2:
                _a = _b.sent(), diagram = _a.diagram, editor = _a.editor;
                if (editor.readonly || editor.mode === editor_types_1.ApollonMode.Assessment) {
                    return [2 /*return*/];
                }
                ids = action.payload.ids.filter(function (id) { return diagram.ownedRelationships.includes(id); });
                if (!ids.length) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, effects_1.put)({
                        type: "@@element/diagram/APPEND" /* UMLDiagramActionTypes.APPEND */,
                        payload: { ids: ids },
                        undoable: false,
                    })];
            case 3:
                _b.sent();
                return [2 /*return*/];
        }
    });
}
function resizeAfterConnectionChange() {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, effects_1.takeLatest)(["@@element/connectable/END" /* ConnectableActionTypes.END */, "@@element/reconnectable/END" /* ReconnectableActionTypes.END */, "@@element/updatable/END" /* UpdatableActionTypes.END */], resize)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
function resize() {
    var layer, _a, elements, diagram, children, container, _b, updates, delta;
    return tslib_1.__generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, (0, effects_1.getContext)('layer')];
            case 1:
                layer = _c.sent();
                return [4 /*yield*/, (0, effects_1.select)()];
            case 2:
                _a = _c.sent(), elements = _a.elements, diagram = _a.diagram;
                children = tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(diagram.ownedElements.map(function (id) { return uml_element_repository_1.UMLElementRepository.get(elements[id]); })), false), tslib_1.__read(diagram.ownedRelationships.map(function (id) { return uml_relationship_repository_1.UMLRelationshipRepository.get(elements[id]); })), false).filter(not_empty_1.notEmpty);
                container = uml_diagram_repository_1.UMLDiagramRepository.get(diagram);
                if (!container) {
                    return [2 /*return*/];
                }
                _b = tslib_1.__read(container.render(layer, children), 1), updates = _b[0];
                delta = {
                    width: updates.bounds.width - diagram.bounds.width,
                    height: updates.bounds.height - diagram.bounds.height,
                };
                return [4 /*yield*/, (0, effects_1.put)({
                        type: "@@element/resizable/RESIZE" /* ResizingActionTypes.RESIZE */,
                        payload: { ids: [diagram.id], delta: delta },
                        undoable: false,
                    })];
            case 3:
                _c.sent();
                return [2 /*return*/];
        }
    });
}
//# sourceMappingURL=uml-diagram-saga.js.map