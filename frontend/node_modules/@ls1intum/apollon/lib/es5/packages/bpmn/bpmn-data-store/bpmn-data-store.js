"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNDataStore = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_container_1 = require("../../../services/uml-container/uml-container");
var BPMNDataStore = /** @class */ (function (_super) {
    tslib_1.__extends(BPMNDataStore, _super);
    function BPMNDataStore() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.BPMNElementType.BPMNDataStore;
        return _this;
    }
    BPMNDataStore.prototype.render = function (canvas) {
        return [this];
    };
    BPMNDataStore.features = tslib_1.__assign(tslib_1.__assign({}, uml_container_1.UMLContainer.features), { resizable: false });
    return BPMNDataStore;
}(uml_container_1.UMLContainer));
exports.BPMNDataStore = BPMNDataStore;
//# sourceMappingURL=bpmn-data-store.js.map