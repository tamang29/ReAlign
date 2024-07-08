"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLPackage = void 0;
var tslib_1 = require("tslib");
var uml_container_1 = require("../../../services/uml-container/uml-container");
var boundary_1 = require("../../../utils/geometry/boundary");
var name_bounds_1 = require("../../../utils/name-bounds");
var UMLPackage = /** @class */ (function (_super) {
    tslib_1.__extends(UMLPackage, _super);
    function UMLPackage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UMLPackage.prototype.render = function (layer, children, calculateWithoutChildren) {
        var _this = this;
        if (children === void 0) { children = []; }
        var calculatedNamedBounds = (0, name_bounds_1.calculateNameBounds)(this, layer);
        var absoluteElements = children.map(function (element) {
            element.bounds.x += _this.bounds.x;
            element.bounds.y += _this.bounds.y;
            return element;
        });
        var bounds = (0, boundary_1.computeBoundingBoxForElements)(tslib_1.__spreadArray([{ bounds: calculatedNamedBounds }], tslib_1.__read(absoluteElements), false));
        if (calculateWithoutChildren) {
            bounds = calculatedNamedBounds;
        }
        var relativeElements = absoluteElements.map(function (element) {
            element.bounds.x -= _this.bounds.x;
            element.bounds.y -= _this.bounds.y;
            return element;
        });
        var deltaX = bounds.x - this.bounds.x;
        var deltaY = bounds.y - this.bounds.y;
        relativeElements.forEach(function (child) {
            child.bounds.x -= deltaX;
            child.bounds.y -= deltaY;
        });
        this.bounds = bounds;
        return tslib_1.__spreadArray([this], tslib_1.__read(relativeElements), false);
    };
    return UMLPackage;
}(uml_container_1.UMLContainer));
exports.UMLPackage = UMLPackage;
//# sourceMappingURL=uml-package.js.map