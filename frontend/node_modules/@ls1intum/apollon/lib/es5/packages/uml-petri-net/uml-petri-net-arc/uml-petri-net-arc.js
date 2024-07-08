"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLPetriNetArc = void 0;
var tslib_1 = require("tslib");
var index_1 = require("../index");
var uml_relationship_1 = require("../../../services/uml-relationship/uml-relationship");
var UMLPetriNetArc = /** @class */ (function (_super) {
    tslib_1.__extends(UMLPetriNetArc, _super);
    function UMLPetriNetArc(values) {
        var _this = _super.call(this, values) || this;
        _this.type = index_1.PetriNetRelationshipType.PetriNetArc;
        _this.name = UMLPetriNetArc.defaultMultiplicity;
        _this.name = (values && values.name) || _this.name;
        return _this;
    }
    UMLPetriNetArc.features = tslib_1.__assign(tslib_1.__assign({}, uml_relationship_1.UMLRelationship.features), { straight: true });
    UMLPetriNetArc.defaultMultiplicity = '1';
    return UMLPetriNetArc;
}(uml_relationship_1.UMLRelationship));
exports.UMLPetriNetArc = UMLPetriNetArc;
//# sourceMappingURL=uml-petri-net-arc.js.map