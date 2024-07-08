"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowchartTerminal = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_element_1 = require("../../../services/uml-element/uml-element");
var name_bounds_1 = require("../../../utils/name-bounds");
var FlowchartTerminal = /** @class */ (function (_super) {
    tslib_1.__extends(FlowchartTerminal, _super);
    function FlowchartTerminal() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.FlowchartElementType.FlowchartTerminal;
        return _this;
    }
    FlowchartTerminal.prototype.render = function (canvas) {
        this.bounds = (0, name_bounds_1.calculateNameBounds)(this, canvas);
        return [this];
    };
    return FlowchartTerminal;
}(uml_element_1.UMLElement));
exports.FlowchartTerminal = FlowchartTerminal;
//# sourceMappingURL=flowchart-terminal.js.map