"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNGroup = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_package_1 = require("../../common/uml-package/uml-package");
var BPMNGroup = /** @class */ (function (_super) {
    tslib_1.__extends(BPMNGroup, _super);
    function BPMNGroup() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.BPMNElementType.BPMNGroup;
        return _this;
    }
    BPMNGroup.prototype.render = function (canvas, children) {
        if (children === void 0) { children = []; }
        return tslib_1.__spreadArray([this], tslib_1.__read(children), false);
    };
    BPMNGroup.features = tslib_1.__assign(tslib_1.__assign({}, uml_package_1.UMLPackage.features), { connectable: false });
    return BPMNGroup;
}(uml_package_1.UMLPackage));
exports.BPMNGroup = BPMNGroup;
//# sourceMappingURL=bpmn-group.js.map