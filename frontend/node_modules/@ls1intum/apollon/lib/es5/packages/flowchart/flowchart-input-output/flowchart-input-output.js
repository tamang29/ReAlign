"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowchartInputOutput = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_element_1 = require("../../../services/uml-element/uml-element");
var name_bounds_1 = require("../../../utils/name-bounds");
var FlowchartInputOutput = /** @class */ (function (_super) {
    tslib_1.__extends(FlowchartInputOutput, _super);
    function FlowchartInputOutput() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.FlowchartElementType.FlowchartInputOutput;
        return _this;
    }
    FlowchartInputOutput.prototype.render = function (canvas) {
        this.bounds = (0, name_bounds_1.calculateNameBounds)(this, canvas);
        return [this];
    };
    return FlowchartInputOutput;
}(uml_element_1.UMLElement));
exports.FlowchartInputOutput = FlowchartInputOutput;
//# sourceMappingURL=flowchart-input-output.js.map