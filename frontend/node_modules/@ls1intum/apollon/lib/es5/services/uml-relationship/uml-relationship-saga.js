"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recalc = exports.UMLRelationshipSaga = void 0;
var tslib_1 = require("tslib");
var effects_1 = require("redux-saga/effects");
var sagas_1 = require("../../utils/actions/sagas");
var diff_1 = require("../../utils/fx/diff");
var uml_element_repository_1 = require("../uml-element/uml-element-repository");
var uml_relationship_1 = require("./uml-relationship");
var uml_relationship_repository_1 = require("./uml-relationship-repository");
var uml_relationship_type_1 = require("../../packages/uml-relationship-type");
var uml_diagram_repository_1 = require("../uml-diagram/uml-diagram-repository");
var not_empty_1 = require("../../utils/not-empty");
function UMLRelationshipSaga() {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, sagas_1.run)([create, reconnect, update, layoutElement, layoutRelationship, deleteElement])];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.UMLRelationshipSaga = UMLRelationshipSaga;
function create() {
    var action, _a, _b, value, e_1_1;
    var e_1, _c;
    return tslib_1.__generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, (0, effects_1.take)("@@element/CREATE" /* UMLElementActionTypes.CREATE */)];
            case 1:
                action = _d.sent();
                _d.label = 2;
            case 2:
                _d.trys.push([2, 7, 8, 9]);
                _a = tslib_1.__values(action.payload.values), _b = _a.next();
                _d.label = 3;
            case 3:
                if (!!_b.done) return [3 /*break*/, 6];
                value = _b.value;
                return [4 /*yield*/, (0, effects_1.call)(recalc, value.id)];
            case 4:
                _d.sent();
                _d.label = 5;
            case 5:
                _b = _a.next();
                return [3 /*break*/, 3];
            case 6: return [3 /*break*/, 9];
            case 7:
                e_1_1 = _d.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 9];
            case 8:
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 9: return [2 /*return*/];
        }
    });
}
function reconnect() {
    var action, _a, _b, connection, e_2_1;
    var e_2, _c;
    return tslib_1.__generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, (0, effects_1.take)("@@element/reconnectable/RECONNECT" /* ReconnectableActionTypes.RECONNECT */)];
            case 1:
                action = _d.sent();
                _d.label = 2;
            case 2:
                _d.trys.push([2, 7, 8, 9]);
                _a = tslib_1.__values(action.payload.connections), _b = _a.next();
                _d.label = 3;
            case 3:
                if (!!_b.done) return [3 /*break*/, 6];
                connection = _b.value;
                return [4 /*yield*/, (0, effects_1.call)(recalc, connection.id)];
            case 4:
                _d.sent();
                _d.label = 5;
            case 5:
                _b = _a.next();
                return [3 /*break*/, 3];
            case 6: return [3 /*break*/, 9];
            case 7:
                e_2_1 = _d.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 9];
            case 8:
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 9: return [2 /*return*/];
        }
    });
}
function layoutRelationship() {
    var action, layer, _a, elements, diagram, children, container, _b, updates, delta;
    return tslib_1.__generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, (0, effects_1.take)("@@relationship/waypoints/END" /* UMLRelationshipActionTypes.ENDWAYPOINTSLAYOUT */)];
            case 1:
                action = _c.sent();
                return [4 /*yield*/, (0, effects_1.getContext)('layer')];
            case 2:
                layer = _c.sent();
                return [4 /*yield*/, (0, effects_1.select)()];
            case 3:
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
            case 4:
                _c.sent();
                return [2 /*return*/];
        }
    });
}
function update() {
    var action, elements, _a, _b, value, e_3_1;
    var e_3, _c;
    return tslib_1.__generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, (0, effects_1.take)("@@element/UPDATE" /* UMLElementActionTypes.UPDATE */)];
            case 1:
                action = _d.sent();
                return [4 /*yield*/, (0, effects_1.select)()];
            case 2:
                elements = (_d.sent()).elements;
                _d.label = 3;
            case 3:
                _d.trys.push([3, 8, 9, 10]);
                _a = tslib_1.__values(action.payload.values), _b = _a.next();
                _d.label = 4;
            case 4:
                if (!!_b.done) return [3 /*break*/, 7];
                value = _b.value;
                if (!uml_relationship_1.UMLRelationship.isUMLRelationship(elements[value.id])) {
                    return [3 /*break*/, 6];
                }
                return [4 /*yield*/, (0, effects_1.call)(recalc, value.id)];
            case 5:
                _d.sent();
                _d.label = 6;
            case 6:
                _b = _a.next();
                return [3 /*break*/, 4];
            case 7: return [3 /*break*/, 10];
            case 8:
                e_3_1 = _d.sent();
                e_3 = { error: e_3_1 };
                return [3 /*break*/, 10];
            case 9:
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_3) throw e_3.error; }
                return [7 /*endfinally*/];
            case 10: return [2 /*return*/];
        }
    });
}
function layoutElement() {
    var action, elements, relationships, updates, relationships_1, relationships_1_1, relationship, source, target, _a, _b, id, e_4_1;
    var e_5, _c, e_4, _d;
    return tslib_1.__generator(this, function (_e) {
        switch (_e.label) {
            case 0: return [4 /*yield*/, (0, effects_1.take)(["@@element/movable/MOVE" /* MovingActionTypes.MOVE */, "@@element/resizable/RESIZE" /* ResizingActionTypes.RESIZE */])];
            case 1:
                action = _e.sent();
                return [4 /*yield*/, (0, effects_1.select)()];
            case 2:
                elements = (_e.sent()).elements;
                relationships = Object.values(elements).filter(function (x) {
                    return uml_relationship_1.UMLRelationship.isUMLRelationship(x);
                });
                updates = [];
                try {
                    loop: for (relationships_1 = tslib_1.__values(relationships), relationships_1_1 = relationships_1.next(); !relationships_1_1.done; relationships_1_1 = relationships_1.next()) {
                        relationship = relationships_1_1.value;
                        source = relationship.source.element;
                        while (source) {
                            if (action.payload.ids.includes(source)) {
                                updates.push(relationship.id);
                                continue loop;
                            }
                            source = elements[source].owner;
                        }
                        target = relationship.target.element;
                        while (target) {
                            if (action.payload.ids.includes(target)) {
                                updates.push(relationship.id);
                                continue loop;
                            }
                            target = elements[target].owner;
                        }
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (relationships_1_1 && !relationships_1_1.done && (_c = relationships_1.return)) _c.call(relationships_1);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
                _e.label = 3;
            case 3:
                _e.trys.push([3, 8, 9, 10]);
                _a = tslib_1.__values(tslib_1.__spreadArray([], tslib_1.__read(new Set(tslib_1.__spreadArray([], tslib_1.__read(updates), false))), false)), _b = _a.next();
                _e.label = 4;
            case 4:
                if (!!_b.done) return [3 /*break*/, 7];
                id = _b.value;
                return [4 /*yield*/, (0, effects_1.call)(recalc, id)];
            case 5:
                _e.sent();
                _e.label = 6;
            case 6:
                _b = _a.next();
                return [3 /*break*/, 4];
            case 7: return [3 /*break*/, 10];
            case 8:
                e_4_1 = _e.sent();
                e_4 = { error: e_4_1 };
                return [3 /*break*/, 10];
            case 9:
                try {
                    if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                }
                finally { if (e_4) throw e_4.error; }
                return [7 /*endfinally*/];
            case 10: return [2 /*return*/];
        }
    });
}
function deleteElement() {
    var action, elements, relationships;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, effects_1.take)("@@element/DELETE" /* UMLElementActionTypes.DELETE */)];
            case 1:
                action = _a.sent();
                return [4 /*yield*/, (0, effects_1.select)()];
            case 2:
                elements = (_a.sent()).elements;
                relationships = Object.values(elements)
                    .filter(function (x) { return uml_relationship_1.UMLRelationship.isUMLRelationship(x); })
                    .filter(function (relationship) {
                    return action.payload.ids.includes(relationship.source.element) ||
                        action.payload.ids.includes(relationship.target.element);
                })
                    .map(function (relationship) { return relationship.id; });
                return [4 /*yield*/, (0, effects_1.all)([
                        (0, effects_1.put)({
                            type: "@@element/container/REMOVE" /* UMLContainerActionTypes.REMOVE */,
                            payload: { ids: relationships },
                            undoable: false,
                        }),
                        (0, effects_1.put)({
                            type: "@@element/DELETE" /* UMLElementActionTypes.DELETE */,
                            payload: { ids: relationships },
                            undoable: false,
                        }),
                    ])];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
function recalc(id) {
    var _a, elements, selected, editor, layer, relationship, source, target, sourcePosition, targetPosition, original, _b, updates, _c, path, bounds;
    return tslib_1.__generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, (0, effects_1.select)()];
            case 1:
                _a = _d.sent(), elements = _a.elements, selected = _a.selected, editor = _a.editor;
                return [4 /*yield*/, (0, effects_1.getContext)('layer')];
            case 2:
                layer = _d.sent();
                relationship = uml_relationship_repository_1.UMLRelationshipRepository.get(elements[id]);
                if (!relationship) {
                    return [2 /*return*/];
                }
                source = uml_element_repository_1.UMLElementRepository.get(elements[relationship.source.element]);
                target = uml_element_repository_1.UMLElementRepository.get(elements[relationship.target.element]);
                if (!source || !target) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, effects_1.put)(uml_element_repository_1.UMLElementRepository.getAbsolutePosition(relationship.source.element))];
            case 3:
                sourcePosition = _d.sent();
                source.bounds = tslib_1.__assign(tslib_1.__assign({}, source.bounds), sourcePosition);
                return [4 /*yield*/, (0, effects_1.put)(uml_element_repository_1.UMLElementRepository.getAbsolutePosition(relationship.target.element))];
            case 4:
                targetPosition = _d.sent();
                target.bounds = tslib_1.__assign(tslib_1.__assign({}, target.bounds), targetPosition);
                original = elements[id];
                _b = tslib_1.__read(relationship.render(layer, source, target), 1), updates = _b[0];
                _c = (0, diff_1.diff)(original, updates), path = _c.path, bounds = _c.bounds;
                if (!path) return [3 /*break*/, 8];
                if (!(relationship.isManuallyLayouted && shouldPreserveLayout(source.id, target.id, selected, editor.readonly))) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, effects_1.put)(uml_relationship_repository_1.UMLRelationshipRepository.layoutWaypoints(updates.id, original.path, tslib_1.__assign(tslib_1.__assign({}, original.bounds), bounds)))];
            case 5:
                _d.sent();
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, (0, effects_1.put)(uml_relationship_repository_1.UMLRelationshipRepository.layout(updates.id, path, tslib_1.__assign(tslib_1.__assign({}, original.bounds), bounds)))];
            case 7:
                _d.sent();
                _d.label = 8;
            case 8:
                if (!(updates.type === uml_relationship_type_1.UMLRelationshipType.CommunicationLink)) return [3 /*break*/, 10];
                return [4 /*yield*/, (0, effects_1.put)(uml_element_repository_1.UMLElementRepository.update(updates.id, updates))];
            case 9:
                _d.sent();
                _d.label = 10;
            case 10: return [2 /*return*/];
        }
    });
}
exports.recalc = recalc;
var shouldPreserveLayout = function (sourceId, targetId, selected, isEditorReadOnly) {
    return (selected.includes(sourceId) && selected.includes(targetId)) || isEditorReadOnly ? true : false;
};
//# sourceMappingURL=uml-relationship-saga.js.map