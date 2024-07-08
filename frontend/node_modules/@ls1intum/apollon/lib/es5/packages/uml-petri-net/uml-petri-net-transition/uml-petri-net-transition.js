"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLPetriNetTransition = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_element_1 = require("../../../services/uml-element/uml-element");
var UMLPetriNetTransition = /** @class */ (function (_super) {
    tslib_1.__extends(UMLPetriNetTransition, _super);
    function UMLPetriNetTransition(values) {
        var _this = _super.call(this, values) || this;
        _this.type = __1.PetriNetElementType.PetriNetTransition;
        _this.bounds = tslib_1.__assign({}, _this.bounds);
        _this.bounds.height = (values && values.bounds && values.bounds.height) || UMLPetriNetTransition.defaultHeight;
        _this.bounds.width = (values && values.bounds && values.bounds.width) || UMLPetriNetTransition.defaultWidth;
        return _this;
    }
    UMLPetriNetTransition.prototype.render = function (layer) {
        this.bounds.height = Math.max(this.bounds.height, UMLPetriNetTransition.defaultHeight);
        this.bounds.width = Math.max(this.bounds.width, UMLPetriNetTransition.defaultWidth);
        return [this];
    };
    UMLPetriNetTransition.features = tslib_1.__assign({}, uml_element_1.UMLElement.features);
    UMLPetriNetTransition.defaultWidth = 20;
    UMLPetriNetTransition.defaultHeight = 60;
    return UMLPetriNetTransition;
}(uml_element_1.UMLElement));
exports.UMLPetriNetTransition = UMLPetriNetTransition;
//# sourceMappingURL=uml-petri-net-transition.js.map