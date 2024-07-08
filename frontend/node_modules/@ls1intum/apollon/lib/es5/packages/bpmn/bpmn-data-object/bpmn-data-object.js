"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNDataObject = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_container_1 = require("../../../services/uml-container/uml-container");
var BPMNDataObject = /** @class */ (function (_super) {
    tslib_1.__extends(BPMNDataObject, _super);
    function BPMNDataObject() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.BPMNElementType.BPMNDataObject;
        return _this;
    }
    BPMNDataObject.prototype.render = function (canvas) {
        return [this];
    };
    BPMNDataObject.features = tslib_1.__assign(tslib_1.__assign({}, uml_container_1.UMLContainer.features), { resizable: false });
    return BPMNDataObject;
}(uml_container_1.UMLContainer));
exports.BPMNDataObject = BPMNDataObject;
//# sourceMappingURL=bpmn-data-object.js.map