"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLInterfaceProvided = void 0;
var tslib_1 = require("tslib");
var uml_relationship_1 = require("../../../services/uml-relationship/uml-relationship");
var UMLInterfaceProvided = /** @class */ (function (_super) {
    tslib_1.__extends(UMLInterfaceProvided, _super);
    function UMLInterfaceProvided() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UMLInterfaceProvided.features = tslib_1.__assign(tslib_1.__assign({}, uml_relationship_1.UMLRelationship.features), { variable: false });
    return UMLInterfaceProvided;
}(uml_relationship_1.UMLRelationship));
exports.UMLInterfaceProvided = UMLInterfaceProvided;
//# sourceMappingURL=uml-interface-provided.js.map