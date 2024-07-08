"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLReachabilityGraphMarking = void 0;
var tslib_1 = require("tslib");
var uml_element_1 = require("../../../services/uml-element/uml-element");
var __1 = require("..");
var name_bounds_1 = require("../../../utils/name-bounds");
var UMLReachabilityGraphMarking = /** @class */ (function (_super) {
    tslib_1.__extends(UMLReachabilityGraphMarking, _super);
    function UMLReachabilityGraphMarking(values) {
        var _this = _super.call(this, values) || this;
        _this.type = __1.ReachabilityGraphElementType.ReachabilityGraphMarking;
        _this.isInitialMarking = (values === null || values === void 0 ? void 0 : values.isInitialMarking) || false;
        return _this;
    }
    UMLReachabilityGraphMarking.prototype.serialize = function (children) {
        return tslib_1.__assign(tslib_1.__assign({}, _super.prototype.serialize.call(this)), { type: this.type, isInitialMarking: this.isInitialMarking });
    };
    UMLReachabilityGraphMarking.prototype.deserialize = function (values, children) {
        var assert = function (v) {
            return v.type === __1.ReachabilityGraphElementType.ReachabilityGraphMarking;
        };
        if (!assert(values)) {
            return;
        }
        _super.prototype.deserialize.call(this, values, children);
        this.isInitialMarking = values.isInitialMarking;
    };
    UMLReachabilityGraphMarking.prototype.render = function (canvas) {
        this.bounds = (0, name_bounds_1.calculateNameBounds)(this, canvas);
        return [this];
    };
    return UMLReachabilityGraphMarking;
}(uml_element_1.UMLElement));
exports.UMLReachabilityGraphMarking = UMLReachabilityGraphMarking;
//# sourceMappingURL=uml-reachability-graph-marking.js.map