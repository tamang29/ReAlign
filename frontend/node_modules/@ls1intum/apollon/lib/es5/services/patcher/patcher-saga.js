"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchLayout = exports.PatchLayouter = void 0;
var tslib_1 = require("tslib");
var effects_1 = require("redux-saga/effects");
var sagas_1 = require("../../utils/actions/sagas");
var uml_container_repository_1 = require("../uml-container/uml-container-repository");
var uml_element_1 = require("../uml-element/uml-element");
var uml_relationship_1 = require("../uml-relationship/uml-relationship");
var uml_relationship_saga_1 = require("../uml-relationship/uml-relationship-saga");
var layouter_1 = require("../layouter/layouter");
/**
 * Fixes the layout of the diagram after importing a patch.
 */
function PatchLayouter() {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, sagas_1.run)([patchLayout])];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.PatchLayouter = PatchLayouter;
function patchLayout() {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, effects_1.debounce)(100, "@@patcher/PATCH" /* PatcherActionTypes.PATCH */, recalculateLayouts)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.patchLayout = patchLayout;
function recalculateLayouts() {
    var elements, ids, _a, _b, id, e_1_1;
    var e_1, _c;
    return tslib_1.__generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, (0, effects_1.select)()];
            case 1:
                elements = (_d.sent()).elements;
                ids = Object.values(elements)
                    .filter(function (x) { return !x.owner; })
                    .map(function (x) { return x.id; });
                if (!ids.length) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, effects_1.put)(uml_container_repository_1.UMLContainerRepository.append(ids))];
            case 2:
                _d.sent();
                _d.label = 3;
            case 3:
                _d.trys.push([3, 11, 12, 13]);
                _a = tslib_1.__values(Object.keys(elements)), _b = _a.next();
                _d.label = 4;
            case 4:
                if (!!_b.done) return [3 /*break*/, 10];
                id = _b.value;
                return [4 /*yield*/, (0, effects_1.delay)(0)];
            case 5:
                _d.sent();
                if (!uml_element_1.UMLElement.isUMLElement(elements[id])) return [3 /*break*/, 7];
                return [4 /*yield*/, (0, effects_1.call)(layouter_1.render, id)];
            case 6:
                _d.sent();
                _d.label = 7;
            case 7:
                if (!(uml_relationship_1.UMLRelationship.isUMLRelationship(elements[id]) && !elements[id].isManuallyLayouted)) return [3 /*break*/, 9];
                return [4 /*yield*/, (0, effects_1.call)(uml_relationship_saga_1.recalc, id)];
            case 8:
                _d.sent();
                _d.label = 9;
            case 9:
                _b = _a.next();
                return [3 /*break*/, 4];
            case 10: return [3 /*break*/, 13];
            case 11:
                e_1_1 = _d.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 13];
            case 12:
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 13: return [2 /*return*/];
        }
    });
}
//# sourceMappingURL=patcher-saga.js.map