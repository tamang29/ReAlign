"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = exports.Layouter = void 0;
var tslib_1 = require("tslib");
var effects_1 = require("redux-saga/effects");
var sagas_1 = require("../../utils/actions/sagas");
var diff_1 = require("../../utils/fx/diff");
var not_empty_1 = require("../../utils/not-empty");
var uml_container_1 = require("../uml-container/uml-container");
var uml_container_repository_1 = require("../uml-container/uml-container-repository");
var uml_diagram_repository_1 = require("../uml-diagram/uml-diagram-repository");
var uml_element_1 = require("../uml-element/uml-element");
var uml_element_repository_1 = require("../uml-element/uml-element-repository");
var uml_relationship_1 = require("../uml-relationship/uml-relationship");
var uml_relationship_repository_1 = require("../uml-relationship/uml-relationship-repository");
var uml_relationship_saga_1 = require("../uml-relationship/uml-relationship-saga");
function Layouter() {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, sagas_1.run)([layout])];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.Layouter = Layouter;
function layout() {
    var action, layer, _a, elements, diagram, ids, _b, _c, id, e_1_1;
    var e_1, _d;
    return tslib_1.__generator(this, function (_e) {
        switch (_e.label) {
            case 0: return [4 /*yield*/, (0, effects_1.take)("@@layouter/LAYOUT" /* LayouterActionTypes.LAYOUT */)];
            case 1:
                action = _e.sent();
                return [4 /*yield*/, (0, effects_1.getContext)('layer')];
            case 2:
                layer = _e.sent();
                return [4 /*yield*/, (0, effects_1.select)()];
            case 3:
                _a = _e.sent(), elements = _a.elements, diagram = _a.diagram;
                ids = Object.values(elements)
                    .filter(function (x) { return !x.owner; })
                    .map(function (x) { return x.id; });
                if (!ids.length) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, effects_1.put)(uml_container_repository_1.UMLContainerRepository.append(ids))];
            case 4:
                _e.sent();
                _e.label = 5;
            case 5:
                _e.trys.push([5, 13, 14, 15]);
                _b = tslib_1.__values(Object.keys(elements)), _c = _b.next();
                _e.label = 6;
            case 6:
                if (!!_c.done) return [3 /*break*/, 12];
                id = _c.value;
                return [4 /*yield*/, (0, effects_1.delay)(0)];
            case 7:
                _e.sent();
                if (!uml_element_1.UMLElement.isUMLElement(elements[id])) return [3 /*break*/, 9];
                return [4 /*yield*/, (0, effects_1.call)(render, id)];
            case 8:
                _e.sent();
                _e.label = 9;
            case 9:
                if (!(uml_relationship_1.UMLRelationship.isUMLRelationship(elements[id]) && !elements[id].isManuallyLayouted)) return [3 /*break*/, 11];
                return [4 /*yield*/, (0, effects_1.call)(uml_relationship_saga_1.recalc, id)];
            case 10:
                _e.sent();
                _e.label = 11;
            case 11:
                _c = _b.next();
                return [3 /*break*/, 6];
            case 12: return [3 /*break*/, 15];
            case 13:
                e_1_1 = _e.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 15];
            case 14:
                try {
                    if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 15: return [2 /*return*/];
        }
    });
}
function renderDiagram() {
    var _a, elements, original, canvas, diagram, children;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, effects_1.select)()];
            case 1:
                _a = _b.sent(), elements = _a.elements, original = _a.diagram;
                return [4 /*yield*/, (0, effects_1.getContext)('layer')];
            case 2:
                canvas = _b.sent();
                diagram = uml_diagram_repository_1.UMLDiagramRepository.get(original);
                children = tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(diagram.ownedElements.map(function (x) { return uml_element_repository_1.UMLElementRepository.get(elements[x]); })), false), tslib_1.__read(diagram.ownedRelationships.map(function (x) { return uml_relationship_repository_1.UMLRelationshipRepository.get(elements[x]); })), false).filter(not_empty_1.notEmpty);
                return [2 /*return*/, diagram.render(canvas, children)];
        }
    });
}
function renderContainer(id) {
    var elements, canvas, container, children;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, effects_1.select)()];
            case 1:
                elements = (_a.sent()).elements;
                return [4 /*yield*/, (0, effects_1.getContext)('layer')];
            case 2:
                canvas = _a.sent();
                container = uml_container_repository_1.UMLContainerRepository.get(elements[id]);
                children = container.ownedElements.map(function (x) { return uml_element_repository_1.UMLElementRepository.get(elements[x]); }).filter(not_empty_1.notEmpty);
                return [2 /*return*/, container.render(canvas, children)];
        }
    });
}
function renderElement(id) {
    var elements, canvas, element;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, effects_1.select)()];
            case 1:
                elements = (_a.sent()).elements;
                return [4 /*yield*/, (0, effects_1.getContext)('layer')];
            case 2:
                canvas = _a.sent();
                element = uml_element_repository_1.UMLElementRepository.get(elements[id]);
                return [2 /*return*/, element.render(canvas)];
        }
    });
}
function render(id) {
    var _a, elements, diagram, state, updates, _b, _c, _d, index, update, original, size, position, _e, _, name_1, owner, type, bounds, ownedElements, difference, e_2_1;
    var _f, e_2, _g;
    return tslib_1.__generator(this, function (_h) {
        switch (_h.label) {
            case 0: return [4 /*yield*/, (0, effects_1.select)()];
            case 1:
                _a = _h.sent(), elements = _a.elements, diagram = _a.diagram;
                state = tslib_1.__assign(tslib_1.__assign({}, elements), (_f = {}, _f[diagram.id] = diagram, _f));
                updates = [];
                if (!uml_diagram_repository_1.UMLDiagramRepository.isUMLDiagram(state[id])) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, effects_1.call)(renderDiagram)];
            case 2:
                updates = _h.sent();
                return [3 /*break*/, 7];
            case 3:
                if (!uml_container_1.UMLContainer.isUMLContainer(state[id])) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, effects_1.call)(renderContainer, id)];
            case 4:
                updates = _h.sent();
                return [3 /*break*/, 7];
            case 5:
                if (!uml_element_1.UMLElement.isUMLElement(state[id])) return [3 /*break*/, 7];
                return [4 /*yield*/, (0, effects_1.call)(renderElement, id)];
            case 6:
                updates = _h.sent();
                _h.label = 7;
            case 7:
                if (!updates.length) {
                    return [2 /*return*/];
                }
                _h.label = 8;
            case 8:
                _h.trys.push([8, 19, 20, 21]);
                _b = tslib_1.__values(updates.entries()), _c = _b.next();
                _h.label = 9;
            case 9:
                if (!!_c.done) return [3 /*break*/, 18];
                _d = tslib_1.__read(_c.value, 2), index = _d[0], update = _d[1];
                original = state[update.id];
                size = {
                    width: update.bounds.width - original.bounds.width,
                    height: update.bounds.height - original.bounds.height,
                };
                if (!Object.values(size).some(function (x) { return x !== 0; })) return [3 /*break*/, 11];
                return [4 /*yield*/, (0, effects_1.put)({
                        type: "@@element/resizable/RESIZE" /* ResizingActionTypes.RESIZE */,
                        payload: {
                            ids: [update.id],
                            resizeFrom: update.resizeFrom,
                            delta: size,
                        },
                        undoable: false,
                    })];
            case 10:
                _h.sent();
                _h.label = 11;
            case 11:
                if (uml_diagram_repository_1.UMLDiagramRepository.isUMLDiagram(update)) {
                    return [3 /*break*/, 17];
                }
                position = {
                    x: update.bounds.x - original.bounds.x,
                    y: update.bounds.y - original.bounds.y,
                };
                if (!Object.values(position).some(function (x) { return x !== 0; })) return [3 /*break*/, 13];
                return [4 /*yield*/, (0, effects_1.put)({
                        type: "@@element/movable/MOVE" /* MovingActionTypes.MOVE */,
                        payload: { ids: [update.id], delta: position },
                        undoable: false,
                    })];
            case 12:
                _h.sent();
                _h.label = 13;
            case 13:
                if (!(index === 0)) return [3 /*break*/, 17];
                _e = (0, diff_1.diff)(original, update), _ = _e.id, name_1 = _e.name, owner = _e.owner, type = _e.type, bounds = _e.bounds, ownedElements = _e.ownedElements, difference = tslib_1.__rest(_e, ["id", "name", "owner", "type", "bounds", "ownedElements"]);
                if (!Object.keys(difference).length) return [3 /*break*/, 15];
                return [4 /*yield*/, (0, effects_1.put)(uml_element_repository_1.UMLElementRepository.update(update.id, tslib_1.__assign({}, difference)))];
            case 14:
                _h.sent();
                _h.label = 15;
            case 15: return [4 /*yield*/, (0, effects_1.call)(render, update.owner || diagram.id)];
            case 16:
                _h.sent();
                _h.label = 17;
            case 17:
                _c = _b.next();
                return [3 /*break*/, 9];
            case 18: return [3 /*break*/, 21];
            case 19:
                e_2_1 = _h.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 21];
            case 20:
                try {
                    if (_c && !_c.done && (_g = _b.return)) _g.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 21: return [2 /*return*/];
        }
    });
}
exports.render = render;
//# sourceMappingURL=layouter.js.map