"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNSubprocess = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var name_bounds_1 = require("../../../utils/name-bounds");
var uml_container_1 = require("../../../services/uml-container/uml-container");
var BPMNSubprocess = /** @class */ (function (_super) {
    tslib_1.__extends(BPMNSubprocess, _super);
    function BPMNSubprocess() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.BPMNElementType.BPMNSubprocess;
        return _this;
    }
    BPMNSubprocess.prototype.render = function (canvas) {
        this.bounds = (0, name_bounds_1.calculateNameBounds)(this, canvas);
        return [this];
    };
    return BPMNSubprocess;
}(uml_container_1.UMLContainer));
exports.BPMNSubprocess = BPMNSubprocess;
//# sourceMappingURL=bpmn-subprocess.js.map