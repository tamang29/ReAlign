"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNTransaction = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_container_1 = require("../../../services/uml-container/uml-container");
var BPMNTransaction = /** @class */ (function (_super) {
    tslib_1.__extends(BPMNTransaction, _super);
    function BPMNTransaction() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.BPMNElementType.BPMNTransaction;
        return _this;
    }
    BPMNTransaction.prototype.render = function (canvas) {
        return [this];
    };
    return BPMNTransaction;
}(uml_container_1.UMLContainer));
exports.BPMNTransaction = BPMNTransaction;
//# sourceMappingURL=bpmn-transaction.js.map