"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLEnumeration = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_classifier_1 = require("../../common/uml-classifier/uml-classifier");
var UMLEnumeration = /** @class */ (function (_super) {
    tslib_1.__extends(UMLEnumeration, _super);
    function UMLEnumeration() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.ClassElementType.Enumeration;
        _this.stereotype = 'enumeration';
        return _this;
    }
    UMLEnumeration.prototype.reorderChildren = function (children) {
        var attributes = children.filter(function (x) { return x.type === __1.ClassElementType.ClassAttribute; });
        var methods = children.filter(function (x) { return x.type === __1.ClassElementType.ClassMethod; });
        return tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(attributes.map(function (element) { return element.id; })), false), tslib_1.__read(methods.map(function (element) { return element.id; })), false);
    };
    return UMLEnumeration;
}(uml_classifier_1.UMLClassifier));
exports.UMLEnumeration = UMLEnumeration;
//# sourceMappingURL=uml-enumeration.js.map