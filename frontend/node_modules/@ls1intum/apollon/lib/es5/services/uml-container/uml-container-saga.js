"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLContainerSaga = void 0;
var tslib_1 = require("tslib");
var effects_1 = require("redux-saga/effects");
var uml_elements_1 = require("../../packages/uml-elements");
var sagas_1 = require("../../utils/actions/sagas");
var layouter_1 = require("../layouter/layouter");
var uml_container_1 = require("./uml-container");
var uml_container_repository_1 = require("./uml-container-repository");
function UMLContainerSaga() {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, sagas_1.run)([append, remove, appendAfterMove, renderAfterMove])];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.UMLContainerSaga = UMLContainerSaga;
function append() {
    var action, _a, elements, diagram, state, container;
    var _b;
    return tslib_1.__generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, (0, effects_1.take)("@@element/container/APPEND" /* UMLContainerActionTypes.APPEND */)];
            case 1:
                action = _c.sent();
                return [4 /*yield*/, (0, effects_1.select)()];
            case 2:
                _a = _c.sent(), elements = _a.elements, diagram = _a.diagram;
                state = tslib_1.__assign(tslib_1.__assign({}, elements), (_b = {}, _b[diagram.id] = diagram, _b));
                container = uml_container_repository_1.UMLContainerRepository.get(state[action.payload.owner]);
                if (!container) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, effects_1.call)(layouter_1.render, container.id)];
            case 3:
                _c.sent();
                return [2 /*return*/];
        }
    });
}
function remove() {
    var action, layer, _a, elements, diagram, state, owners, owners_1, owners_1_1, owner, e_1_1;
    var _b, e_1, _c;
    return tslib_1.__generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, (0, effects_1.take)("@@element/container/REMOVE" /* UMLContainerActionTypes.REMOVE */)];
            case 1:
                action = _d.sent();
                return [4 /*yield*/, (0, effects_1.getContext)('layer')];
            case 2:
                layer = _d.sent();
                return [4 /*yield*/, (0, effects_1.select)()];
            case 3:
                _a = _d.sent(), elements = _a.elements, diagram = _a.diagram;
                state = tslib_1.__assign(tslib_1.__assign({}, elements), (_b = {}, _b[diagram.id] = diagram, _b));
                owners = tslib_1.__spreadArray([], tslib_1.__read(new Set(action.payload.ids.filter(function (id) { return id in state; }).map(function (id) { return state[id].owner || diagram.id; }))), false);
                _d.label = 4;
            case 4:
                _d.trys.push([4, 9, 10, 11]);
                owners_1 = tslib_1.__values(owners), owners_1_1 = owners_1.next();
                _d.label = 5;
            case 5:
                if (!!owners_1_1.done) return [3 /*break*/, 8];
                owner = owners_1_1.value;
                return [4 /*yield*/, (0, effects_1.call)(layouter_1.render, owner)];
            case 6:
                _d.sent();
                _d.label = 7;
            case 7:
                owners_1_1 = owners_1.next();
                return [3 /*break*/, 5];
            case 8: return [3 /*break*/, 11];
            case 9:
                e_1_1 = _d.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 11];
            case 10:
                try {
                    if (owners_1_1 && !owners_1_1.done && (_c = owners_1.return)) _c.call(owners_1);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 11: return [2 /*return*/];
        }
    });
}
function appendAfterMove() {
    var action, _a, elements, hovered, containerID, container, movedElements;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, effects_1.take)("@@element/movable/END" /* MovableActionTypes.END */)];
            case 1:
                action = _b.sent();
                return [4 /*yield*/, (0, effects_1.select)()];
            case 2:
                _a = _b.sent(), elements = _a.elements, hovered = _a.hovered;
                containerID = null;
                if (hovered.length) {
                    container = elements[hovered[0]];
                    if (!container ||
                        !uml_container_1.UMLContainer.isUMLContainer(container) ||
                        !uml_elements_1.UMLElements[container.type].features.droppable) {
                        return [2 /*return*/];
                    }
                    containerID = container.id;
                }
                movedElements = action.payload.ids.filter(function (id) { return elements[id].owner !== containerID && id !== containerID; });
                if (!movedElements.length || action.payload.keyboard) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, effects_1.put)(uml_container_repository_1.UMLContainerRepository.remove(movedElements))];
            case 3:
                _b.sent();
                return [4 /*yield*/, (0, effects_1.put)(uml_container_repository_1.UMLContainerRepository.append(movedElements, containerID || undefined))];
            case 4:
                _b.sent();
                return [2 /*return*/];
        }
    });
}
function renderAfterMove() {
    var action, _a, elements, diagram, state;
    var _b;
    return tslib_1.__generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, (0, effects_1.take)("@@element/movable/END" /* MovableActionTypes.END */)];
            case 1:
                action = _c.sent();
                return [4 /*yield*/, (0, effects_1.select)()];
            case 2:
                _a = _c.sent(), elements = _a.elements, diagram = _a.diagram;
                state = tslib_1.__assign(tslib_1.__assign({}, elements), (_b = {}, _b[diagram.id] = diagram, _b));
                return [4 /*yield*/, (0, effects_1.race)({
                        append: (0, effects_1.take)("@@element/container/APPEND" /* UMLContainerActionTypes.APPEND */),
                        resize: (0, effects_1.call)(function () {
                            var owners, owners_2, owners_2_1, owner, e_2_1;
                            var e_2, _a;
                            return tslib_1.__generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, (0, effects_1.delay)(0)];
                                    case 1:
                                        _b.sent();
                                        owners = tslib_1.__spreadArray([], tslib_1.__read(new Set(action.payload.ids.map(function (id) { return state[id].owner || diagram.id; }))), false);
                                        _b.label = 2;
                                    case 2:
                                        _b.trys.push([2, 7, 8, 9]);
                                        owners_2 = tslib_1.__values(owners), owners_2_1 = owners_2.next();
                                        _b.label = 3;
                                    case 3:
                                        if (!!owners_2_1.done) return [3 /*break*/, 6];
                                        owner = owners_2_1.value;
                                        return [4 /*yield*/, (0, effects_1.call)(layouter_1.render, owner)];
                                    case 4:
                                        _b.sent();
                                        _b.label = 5;
                                    case 5:
                                        owners_2_1 = owners_2.next();
                                        return [3 /*break*/, 3];
                                    case 6: return [3 /*break*/, 9];
                                    case 7:
                                        e_2_1 = _b.sent();
                                        e_2 = { error: e_2_1 };
                                        return [3 /*break*/, 9];
                                    case 8:
                                        try {
                                            if (owners_2_1 && !owners_2_1.done && (_a = owners_2.return)) _a.call(owners_2);
                                        }
                                        finally { if (e_2) throw e_2.error; }
                                        return [7 /*endfinally*/];
                                    case 9: return [2 /*return*/];
                                }
                            });
                        }),
                    })];
            case 3:
                _c.sent();
                return [2 /*return*/];
        }
    });
}
//# sourceMappingURL=uml-container-saga.js.map