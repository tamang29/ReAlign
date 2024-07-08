"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowchartFlowline = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_relationship_1 = require("../../../services/uml-relationship/uml-relationship");
var FlowchartFlowline = /** @class */ (function (_super) {
    tslib_1.__extends(FlowchartFlowline, _super);
    function FlowchartFlowline() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.type = __1.FlowchartRelationshipType.FlowchartFlowline;
        return _this;
    }
    return FlowchartFlowline;
}(uml_relationship_1.UMLRelationship));
exports.FlowchartFlowline = FlowchartFlowline;
//# sourceMappingURL=flowchart-flowline.js.map