"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorLegend = void 0;
var tslib_1 = require("tslib");
var _1 = require(".");
var uml_element_1 = require("../../../services/uml-element/uml-element");
var ColorLegend = /** @class */ (function (_super) {
    tslib_1.__extends(ColorLegend, _super);
    function ColorLegend(values) {
        var _this = _super.call(this, values && !values.bounds ? tslib_1.__assign(tslib_1.__assign({}, values), { bounds: { x: 0, y: 0, width: 160, height: 50 } }) : values) || this;
        _this.type = _1.ColorLegendElementType.ColorLegend;
        return _this;
    }
    ColorLegend.prototype.render = function (canvas) {
        return [this];
    };
    return ColorLegend;
}(uml_element_1.UMLElement));
exports.ColorLegend = ColorLegend;
//# sourceMappingURL=color-legend.js.map