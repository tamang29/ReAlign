"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLContainer = void 0;
var tslib_1 = require("tslib");
var assign_1 = require("../../utils/fx/assign");
var uml_element_1 = require("../uml-element/uml-element");
var UMLContainer = /** @class */ (function (_super) {
    tslib_1.__extends(UMLContainer, _super);
    function UMLContainer(values) {
        var _this = _super.call(this) || this;
        _this.ownedElements = [];
        (0, assign_1.assign)(_this, values);
        return _this;
    }
    /**
     * reorders children -> default, do nothing
     */
    UMLContainer.prototype.reorderChildren = function (children) {
        return children.map(function (child) { return child.id; });
    };
    /** Serializes an `UMLElement` to an `Apollon.UMLElement` */
    UMLContainer.prototype.serialize = function (children) {
        return tslib_1.__assign(tslib_1.__assign({}, _super.prototype.serialize.call(this, children)), { type: this.type });
    };
    UMLContainer.prototype.deserialize = function (values, children) {
        if (children === void 0) { children = []; }
        _super.prototype.deserialize.call(this, values);
        this.ownedElements = children.map(function (child) { return child.id; });
    };
    UMLContainer.features = tslib_1.__assign(tslib_1.__assign({}, uml_element_1.UMLElement.features), { droppable: true });
    UMLContainer.isUMLContainer = function (element) { return 'ownedElements' in element; };
    return UMLContainer;
}(uml_element_1.UMLElement));
exports.UMLContainer = UMLContainer;
//# sourceMappingURL=uml-container.js.map