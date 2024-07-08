"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLInterface = void 0;
var tslib_1 = require("tslib");
var uml_element_1 = require("../../../services/uml-element/uml-element");
var assign_1 = require("../../../utils/fx/assign");
var UMLInterface = /** @class */ (function (_super) {
    tslib_1.__extends(UMLInterface, _super);
    function UMLInterface(values) {
        var _this = _super.call(this, values) || this;
        _this.bounds = tslib_1.__assign(tslib_1.__assign({}, _this.bounds), { width: 20, height: 20 });
        (0, assign_1.assign)(_this, values);
        return _this;
    }
    UMLInterface.prototype.render = function (layer) {
        return [this];
        // const radix = 10;
        // const bounds = Text.size(layer, this.name, { fontWeight: 'bold' });
        // this.bounds.width = Math.round((bounds.width + 20) / radix) * radix;
        // this.bounds.height = Math.round((bounds.height + 20) / radix) * radix;
        // return [this];
    };
    UMLInterface.features = tslib_1.__assign(tslib_1.__assign({}, uml_element_1.UMLElement.features), { resizable: false, alternativePortVisualization: true });
    return UMLInterface;
}(uml_element_1.UMLElement));
exports.UMLInterface = UMLInterface;
//# sourceMappingURL=uml-interface.js.map