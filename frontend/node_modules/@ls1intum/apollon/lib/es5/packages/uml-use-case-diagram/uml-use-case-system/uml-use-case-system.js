"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLUseCaseSystem = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_container_1 = require("../../../services/uml-container/uml-container");
var uml_package_1 = require("../../common/uml-package/uml-package");
var UMLUseCaseSystem = /** @class */ (function (_super) {
    tslib_1.__extends(UMLUseCaseSystem, _super);
    function UMLUseCaseSystem() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.UseCaseElementType.UseCaseSystem;
        return _this;
    }
    UMLUseCaseSystem.features = tslib_1.__assign(tslib_1.__assign({}, uml_container_1.UMLContainer.features), { connectable: false });
    return UMLUseCaseSystem;
}(uml_package_1.UMLPackage));
exports.UMLUseCaseSystem = UMLUseCaseSystem;
//# sourceMappingURL=uml-use-case-system.js.map