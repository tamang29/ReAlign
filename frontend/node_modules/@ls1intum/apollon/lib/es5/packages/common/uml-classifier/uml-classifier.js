"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLClassifier = void 0;
var tslib_1 = require("tslib");
var uml_container_1 = require("../../../services/uml-container/uml-container");
var assign_1 = require("../../../utils/fx/assign");
var text_1 = require("../../../utils/svg/text");
var uml_classifier_attribute_1 = require("./uml-classifier-attribute");
var uml_classifier_method_1 = require("./uml-classifier-method");
var UMLClassifier = /** @class */ (function (_super) {
    tslib_1.__extends(UMLClassifier, _super);
    function UMLClassifier(values) {
        var _this = _super.call(this) || this;
        _this.italic = false;
        _this.underline = false;
        _this.stereotype = null;
        _this.deviderPosition = 0;
        _this.hasAttributes = false;
        _this.hasMethods = false;
        (0, assign_1.assign)(_this, values);
        return _this;
    }
    Object.defineProperty(UMLClassifier.prototype, "headerHeight", {
        get: function () {
            return this.stereotype ? UMLClassifier.stereotypeHeaderHeight : UMLClassifier.nonStereotypeHeaderHeight;
        },
        enumerable: false,
        configurable: true
    });
    UMLClassifier.prototype.serialize = function (children) {
        if (children === void 0) { children = []; }
        return tslib_1.__assign(tslib_1.__assign({}, _super.prototype.serialize.call(this, children)), { type: this.type, attributes: children.filter(function (x) { return x instanceof uml_classifier_attribute_1.UMLClassifierAttribute; }).map(function (x) { return x.id; }), methods: children.filter(function (x) { return x instanceof uml_classifier_method_1.UMLClassifierMethod; }).map(function (x) { return x.id; }) });
    };
    UMLClassifier.prototype.render = function (layer, children) {
        var e_1, _a, e_2, _b;
        if (children === void 0) { children = []; }
        var attributes = children.filter(function (x) { return x instanceof uml_classifier_attribute_1.UMLClassifierAttribute; });
        var methods = children.filter(function (x) { return x instanceof uml_classifier_method_1.UMLClassifierMethod; });
        this.hasAttributes = attributes.length > 0;
        this.hasMethods = methods.length > 0;
        var radix = 10;
        this.bounds.width = tslib_1.__spreadArray(tslib_1.__spreadArray([this], tslib_1.__read(attributes), false), tslib_1.__read(methods), false).reduce(function (current, child, index) {
            return Math.max(current, Math.round((text_1.Text.size(layer, child.name, index === 0 ? { fontWeight: 'bold' } : undefined).width + 20) / radix) * radix);
        }, Math.round(this.bounds.width / radix) * radix);
        var y = this.headerHeight;
        try {
            for (var attributes_1 = tslib_1.__values(attributes), attributes_1_1 = attributes_1.next(); !attributes_1_1.done; attributes_1_1 = attributes_1.next()) {
                var attribute = attributes_1_1.value;
                attribute.bounds.x = 0.5;
                attribute.bounds.y = y + 0.5;
                attribute.bounds.width = this.bounds.width - 1;
                y += attribute.bounds.height;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (attributes_1_1 && !attributes_1_1.done && (_a = attributes_1.return)) _a.call(attributes_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.deviderPosition = y;
        try {
            for (var methods_1 = tslib_1.__values(methods), methods_1_1 = methods_1.next(); !methods_1_1.done; methods_1_1 = methods_1.next()) {
                var method = methods_1_1.value;
                method.bounds.x = 0.5;
                method.bounds.y = y + 0.5;
                method.bounds.width = this.bounds.width - 1;
                y += method.bounds.height;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (methods_1_1 && !methods_1_1.done && (_b = methods_1.return)) _b.call(methods_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        this.bounds.height = y;
        return tslib_1.__spreadArray(tslib_1.__spreadArray([this], tslib_1.__read(attributes), false), tslib_1.__read(methods), false);
    };
    UMLClassifier.features = tslib_1.__assign(tslib_1.__assign({}, uml_container_1.UMLContainer.features), { droppable: false, resizable: 'WIDTH' });
    UMLClassifier.stereotypeHeaderHeight = 50;
    UMLClassifier.nonStereotypeHeaderHeight = 40;
    return UMLClassifier;
}(uml_container_1.UMLContainer));
exports.UMLClassifier = UMLClassifier;
//# sourceMappingURL=uml-classifier.js.map