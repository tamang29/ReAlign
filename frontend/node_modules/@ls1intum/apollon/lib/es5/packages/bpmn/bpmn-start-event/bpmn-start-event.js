"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNStartEvent = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var assign_1 = require("../../../utils/fx/assign");
var uml_container_1 = require("../../../services/uml-container/uml-container");
var BPMNStartEvent = /** @class */ (function (_super) {
    tslib_1.__extends(BPMNStartEvent, _super);
    function BPMNStartEvent(values) {
        var _this = _super.call(this, values) || this;
        _this.type = __1.BPMNElementType.BPMNStartEvent;
        _this.bounds = tslib_1.__assign(tslib_1.__assign({}, _this.bounds), { width: 40, height: 40 });
        (0, assign_1.assign)(_this, values);
        _this.eventType = (values === null || values === void 0 ? void 0 : values.eventType) || BPMNStartEvent.defaultEventType;
        return _this;
    }
    BPMNStartEvent.prototype.serialize = function (children) {
        return tslib_1.__assign(tslib_1.__assign({}, _super.prototype.serialize.call(this)), { type: this.type, eventType: this.eventType });
    };
    BPMNStartEvent.prototype.deserialize = function (values, children) {
        _super.prototype.deserialize.call(this, values, children);
        this.eventType = values.eventType || BPMNStartEvent.defaultEventType;
    };
    BPMNStartEvent.prototype.render = function (canvas) {
        return [this];
    };
    BPMNStartEvent.supportedRelationships = [__1.BPMNRelationshipType.BPMNFlow];
    BPMNStartEvent.features = tslib_1.__assign(tslib_1.__assign({}, uml_container_1.UMLContainer.features), { resizable: false });
    BPMNStartEvent.defaultEventType = 'default';
    return BPMNStartEvent;
}(uml_container_1.UMLContainer));
exports.BPMNStartEvent = BPMNStartEvent;
//# sourceMappingURL=bpmn-start-event.js.map