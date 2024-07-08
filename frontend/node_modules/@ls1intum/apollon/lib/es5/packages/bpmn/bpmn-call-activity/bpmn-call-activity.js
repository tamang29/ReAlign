"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNCallActivity = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_container_1 = require("../../../services/uml-container/uml-container");
var BPMNCallActivity = /** @class */ (function (_super) {
    tslib_1.__extends(BPMNCallActivity, _super);
    function BPMNCallActivity() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.BPMNElementType.BPMNCallActivity;
        return _this;
    }
    BPMNCallActivity.prototype.render = function (canvas) {
        return [this];
    };
    return BPMNCallActivity;
}(uml_container_1.UMLContainer));
exports.BPMNCallActivity = BPMNCallActivity;
//# sourceMappingURL=bpmn-call-activity.js.map