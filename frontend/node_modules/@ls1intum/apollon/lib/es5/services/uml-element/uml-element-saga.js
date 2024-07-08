"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLElementSaga = void 0;
var tslib_1 = require("tslib");
var effects_1 = require("redux-saga/effects");
var sagas_1 = require("../../utils/actions/sagas");
var tree_1 = require("../../utils/geometry/tree");
var layouter_1 = require("../layouter/layouter");
function UMLElementSaga() {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, sagas_1.run)([makeInteractable, renderAfterUpdate, renderWhileResize])];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.UMLElementSaga = UMLElementSaga;
function makeInteractable() {
    var _a, interactive, elements, roots, difference;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, effects_1.take)("@@element/interactable/SELECT" /* InteractableActionTypes.SELECT */)];
            case 1:
                _b.sent();
                return [4 /*yield*/, (0, effects_1.select)()];
            case 2:
                _a = _b.sent(), interactive = _a.interactive, elements = _a.elements;
                roots = (0, tree_1.filterRoots)(interactive, elements);
                difference = interactive.filter(function (x) { return !roots.includes(x); });
                return [4 /*yield*/, (0, effects_1.put)({
                        type: "@@element/interactable/DESELECT" /* InteractableActionTypes.DESELECT */,
                        payload: { ids: difference },
                        undoable: false,
                    })];
            case 3:
                _b.sent();
                return [2 /*return*/];
        }
    });
}
function renderAfterUpdate() {
    var action, _a, _b, value, e_1_1;
    var e_1, _c;
    return tslib_1.__generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, (0, effects_1.take)("@@element/UPDATE" /* UMLElementActionTypes.UPDATE */)];
            case 1:
                action = _d.sent();
                if ((0, sagas_1.isInternal)(action)) {
                    return [2 /*return*/];
                }
                _d.label = 2;
            case 2:
                _d.trys.push([2, 7, 8, 9]);
                _a = tslib_1.__values(action.payload.values), _b = _a.next();
                _d.label = 3;
            case 3:
                if (!!_b.done) return [3 /*break*/, 6];
                value = _b.value;
                return [4 /*yield*/, (0, effects_1.call)(layouter_1.render, value.id)];
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
function renderWhileResize() {
    var action, _a, _b, id, e_2_1;
    var e_2, _c;
    return tslib_1.__generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, (0, effects_1.take)("@@element/resizable/RESIZE" /* ResizingActionTypes.RESIZE */)];
            case 1:
                action = _d.sent();
                if ((0, sagas_1.isInternal)(action)) {
                    return [2 /*return*/];
                }
                _d.label = 2;
            case 2:
                _d.trys.push([2, 7, 8, 9]);
                _a = tslib_1.__values(action.payload.ids), _b = _a.next();
                _d.label = 3;
            case 3:
                if (!!_b.done) return [3 /*break*/, 6];
                id = _b.value;
                return [4 /*yield*/, (0, effects_1.call)(layouter_1.render, id)];
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
//# sourceMappingURL=uml-element-saga.js.map