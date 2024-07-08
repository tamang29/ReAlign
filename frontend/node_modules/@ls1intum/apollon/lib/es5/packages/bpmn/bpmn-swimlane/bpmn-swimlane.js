"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNSwimlane = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_element_1 = require("../../../services/uml-element/uml-element");
var uml_container_1 = require("../../../services/uml-container/uml-container");
var BPMNSwimlane = /** @class */ (function (_super) {
    tslib_1.__extends(BPMNSwimlane, _super);
    function BPMNSwimlane() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.BPMNElementType.BPMNSwimlane;
        return _this;
    }
    BPMNSwimlane.prototype.render = function (layer, children) {
        if (children === void 0) { children = []; }
        if (this.bounds.height < BPMNSwimlane.MIN_HEIGHT) {
            this.bounds.height = BPMNSwimlane.MIN_HEIGHT;
        }
        return tslib_1.__spreadArray([this], tslib_1.__read(children), false);
    };
    BPMNSwimlane.DEFAULT_HEIGHT = 80;
    BPMNSwimlane.MIN_HEIGHT = 80;
    BPMNSwimlane.features = tslib_1.__assign(tslib_1.__assign({}, uml_element_1.UMLElement.features), { droppable: true, movable: false, connectable: false, updatable: false, resizable: 'HEIGHT' });
    return BPMNSwimlane;
}(uml_container_1.UMLContainer));
exports.BPMNSwimlane = BPMNSwimlane;
//# sourceMappingURL=bpmn-swimlane.js.map