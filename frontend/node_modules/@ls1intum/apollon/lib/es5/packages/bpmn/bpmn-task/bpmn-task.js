"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNTask = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var uml_container_1 = require("../../../services/uml-container/uml-container");
var assign_1 = require("../../../utils/fx/assign");
var BPMNTask = /** @class */ (function (_super) {
    tslib_1.__extends(BPMNTask, _super);
    function BPMNTask(values) {
        var _this = _super.call(this, values) || this;
        _this.type = __1.BPMNElementType.BPMNTask;
        (0, assign_1.assign)(_this, values);
        _this.taskType = (values === null || values === void 0 ? void 0 : values.taskType) || BPMNTask.defaultTaskType;
        _this.marker = (values === null || values === void 0 ? void 0 : values.marker) || BPMNTask.defaultMarker;
        return _this;
    }
    BPMNTask.prototype.serialize = function (children) {
        return tslib_1.__assign(tslib_1.__assign({}, _super.prototype.serialize.call(this)), { type: this.type, taskType: this.taskType, marker: this.marker });
    };
    BPMNTask.prototype.deserialize = function (values, children) {
        _super.prototype.deserialize.call(this, values, children);
        this.taskType = values.taskType || BPMNTask.defaultTaskType;
        this.marker = values.marker || BPMNTask.defaultMarker;
    };
    BPMNTask.prototype.render = function (canvas) {
        return [this];
    };
    BPMNTask.defaultTaskType = 'default';
    BPMNTask.defaultMarker = 'none';
    return BPMNTask;
}(uml_container_1.UMLContainer));
exports.BPMNTask = BPMNTask;
//# sourceMappingURL=bpmn-task.js.map