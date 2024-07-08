"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLPetriNetPlace = void 0;
var tslib_1 = require("tslib");
var uml_element_1 = require("../../../services/uml-element/uml-element");
var index_1 = require("../index");
var assign_1 = require("../../../utils/fx/assign");
var UMLPetriNetPlace = /** @class */ (function (_super) {
    tslib_1.__extends(UMLPetriNetPlace, _super);
    function UMLPetriNetPlace(values) {
        var _this = _super.call(this, values) || this;
        // currently we need to add this, because otherwise this will be recognized as update in layouter and for every update action on component, antoher update is triggerd
        _this.highlight = undefined;
        _this.type = index_1.PetriNetElementType.PetriNetPlace;
        _this.bounds = tslib_1.__assign(tslib_1.__assign({}, _this.bounds), { width: 60, height: 60 });
        (0, assign_1.assign)(_this, values);
        _this.amountOfTokens = (values === null || values === void 0 ? void 0 : values.amountOfTokens) || (values === null || values === void 0 ? void 0 : values.amountOfTokens) === 0 ? values.amountOfTokens : 0;
        _this.capacity = (values === null || values === void 0 ? void 0 : values.capacity) || (values === null || values === void 0 ? void 0 : values.capacity) === 0 ? values.capacity : UMLPetriNetPlace.defaultCapacity;
        return _this;
    }
    UMLPetriNetPlace.prototype.serialize = function (children) {
        return tslib_1.__assign(tslib_1.__assign({}, _super.prototype.serialize.call(this)), { type: this.type, amountOfTokens: this.amountOfTokens, capacity: !isFinite(this.capacity) ? this.capacity.toString() : this.capacity });
    };
    UMLPetriNetPlace.prototype.deserialize = function (values, children) {
        var assert = function (v) {
            return v.type === index_1.PetriNetElementType.PetriNetPlace;
        };
        if (!assert(values)) {
            return;
        }
        _super.prototype.deserialize.call(this, values, children);
        this.amountOfTokens = values.amountOfTokens;
        this.capacity =
            values.capacity === Number.POSITIVE_INFINITY.toString() ? Number.POSITIVE_INFINITY : values.capacity;
    };
    UMLPetriNetPlace.prototype.render = function (canvas) {
        return [this];
    };
    UMLPetriNetPlace.features = tslib_1.__assign(tslib_1.__assign({}, uml_element_1.UMLElement.features), { resizable: false });
    UMLPetriNetPlace.defaultCapacity = Number.POSITIVE_INFINITY;
    return UMLPetriNetPlace;
}(uml_element_1.UMLElement));
exports.UMLPetriNetPlace = UMLPetriNetPlace;
//# sourceMappingURL=uml-petri-net-place.js.map