"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNAnnotation = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_container_1 = require("../../../services/uml-container/uml-container");
var BPMNAnnotation = /** @class */ (function (_super) {
    tslib_1.__extends(BPMNAnnotation, _super);
    function BPMNAnnotation() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.BPMNElementType.BPMNAnnotation;
        return _this;
    }
    BPMNAnnotation.prototype.render = function (canvas) {
        return [this];
    };
    BPMNAnnotation.features = tslib_1.__assign({}, uml_container_1.UMLContainer.features);
    return BPMNAnnotation;
}(uml_container_1.UMLContainer));
exports.BPMNAnnotation = BPMNAnnotation;
//# sourceMappingURL=bpmn-annotation.js.map