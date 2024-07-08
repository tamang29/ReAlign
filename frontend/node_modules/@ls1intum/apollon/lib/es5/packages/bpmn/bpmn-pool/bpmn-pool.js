"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNPool = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_element_1 = require("../../../services/uml-element/uml-element");
var uml_package_1 = require("../../common/uml-package/uml-package");
var BPMNPool = /** @class */ (function (_super) {
    tslib_1.__extends(BPMNPool, _super);
    function BPMNPool() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.BPMNElementType.BPMNPool;
        _this.hasSwimlanes = function (children) {
            return children.length > 0 &&
                children.every(function (child) { return child.type === __1.BPMNElementType.BPMNSwimlane; });
        };
        return _this;
    }
    BPMNPool.prototype.render = function (layer, children, calculateWithoutChildren) {
        var _this = this;
        if (children === void 0) { children = []; }
        if (this.bounds.width < BPMNPool.MIN_WIDTH) {
            this.bounds.width = BPMNPool.MIN_WIDTH;
        }
        // We determine if the current pool has swimlanes as a pool with lanes behaves different in regard to resizing
        // compared to a pool without lanes
        var hasSwimlanes = this.hasSwimlanes(children);
        if (!hasSwimlanes) {
            // If the pool does not have lanes, we simply return the pool and its child elements
            return tslib_1.__spreadArray([this], tslib_1.__read(children), false);
        }
        var calculatedContainerPoolHeight = children.reduce(function (acc, element) { return acc + element.bounds.height; }, 0);
        // We reverse the swim lane array to ensure that the lanes are rendered bottom to top, ensuring that
        // the resize handles are not overlapped by the following lane.
        var repositionedChildren = children.reverse().map(function (element, index) {
            // As all elements, including indirect descendents are passed as children for the export, we make sure
            // to only reposition swimlanes
            if (element.type !== __1.BPMNElementType.BPMNSwimlane) {
                return element;
            }
            element.bounds.x = BPMNPool.HEADER_WIDTH;
            element.bounds.y = index > 0 ? children[index - 1].bounds.y + children[index - 1].bounds.height : 0;
            element.bounds.width = _this.bounds.width - BPMNPool.HEADER_WIDTH;
            // This is crucial as otherwise we get run into issues with the layouter trying to layout
            // an automatically resized swimlane according to its own "resizeFrom" property
            element.resizeFrom = "bottomRight" /* ResizeFrom.BOTTOMRIGHT */;
            return element;
        });
        // If the pool has swimlanes, we set its height to the sum of the heights of the contained swimlanes
        if (hasSwimlanes) {
            this.bounds.height =
                calculatedContainerPoolHeight < BPMNPool.MIN_HEIGHT ? BPMNPool.MIN_HEIGHT : calculatedContainerPoolHeight;
        }
        return tslib_1.__spreadArray([this], tslib_1.__read(repositionedChildren), false);
    };
    BPMNPool.MIN_WIDTH = 80;
    BPMNPool.MIN_HEIGHT = 80;
    BPMNPool.HEADER_WIDTH = 40;
    BPMNPool.features = tslib_1.__assign(tslib_1.__assign({}, uml_element_1.UMLElement.features), { droppable: true, movable: true, resizable: true, connectable: true });
    return BPMNPool;
}(uml_package_1.UMLPackage));
exports.BPMNPool = BPMNPool;
//# sourceMappingURL=bpmn-pool.js.map