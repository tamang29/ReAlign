"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLComponentInterface = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_interface_1 = require("../../common/uml-interface/uml-interface");
var UMLComponentInterface = /** @class */ (function (_super) {
    tslib_1.__extends(UMLComponentInterface, _super);
    function UMLComponentInterface() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.ComponentElementType.ComponentInterface;
        return _this;
    }
    UMLComponentInterface.supportedRelationships = [
        __1.ComponentRelationshipType.ComponentInterfaceProvided,
        __1.ComponentRelationshipType.ComponentInterfaceRequired,
    ];
    return UMLComponentInterface;
}(uml_interface_1.UMLInterface));
exports.UMLComponentInterface = UMLComponentInterface;
//# sourceMappingURL=uml-component-interface.js.map