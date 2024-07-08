"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saga = void 0;
var tslib_1 = require("tslib");
var sagas_1 = require("../utils/actions/sagas");
var layouter_1 = require("./layouter/layouter");
var uml_container_saga_1 = require("./uml-container/uml-container-saga");
var uml_diagram_saga_1 = require("./uml-diagram/uml-diagram-saga");
var uml_element_saga_1 = require("./uml-element/uml-element-saga");
var uml_relationship_saga_1 = require("./uml-relationship/uml-relationship-saga");
var patcher_saga_1 = require("./patcher/patcher-saga");
function saga() {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, sagas_1.composeSaga)([layouter_1.Layouter, uml_element_saga_1.UMLElementSaga, uml_container_saga_1.UMLContainerSaga, uml_relationship_saga_1.UMLRelationshipSaga, uml_diagram_saga_1.UMLDiagramSaga, patcher_saga_1.PatchLayouter])];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.saga = saga;
//# sourceMappingURL=saga.js.map