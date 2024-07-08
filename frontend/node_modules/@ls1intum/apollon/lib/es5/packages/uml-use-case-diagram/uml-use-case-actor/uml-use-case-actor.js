"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLUseCaseActor = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_element_1 = require("../../../services/uml-element/uml-element");
var assign_1 = require("../../../utils/fx/assign");
var UMLUseCaseActor = /** @class */ (function (_super) {
    tslib_1.__extends(UMLUseCaseActor, _super);
    function UMLUseCaseActor(values) {
        var _this = _super.call(this, values) || this;
        _this.type = __1.UseCaseElementType.UseCaseActor;
        _this.bounds = tslib_1.__assign(tslib_1.__assign({}, _this.bounds), { width: 90, height: 140 });
        (0, assign_1.assign)(_this, values);
        return _this;
    }
    UMLUseCaseActor.prototype.render = function (canvas) {
        return [this];
    };
    return UMLUseCaseActor;
}(uml_element_1.UMLElement));
exports.UMLUseCaseActor = UMLUseCaseActor;
//# sourceMappingURL=uml-use-case-actor.js.map