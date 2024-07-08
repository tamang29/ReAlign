"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeBPMNPreview = void 0;
var bpmn_task_1 = require("./bpmn-task/bpmn-task");
var bpmn_subprocess_1 = require("./bpmn-subprocess/bpmn-subprocess");
var bpmn_start_event_1 = require("./bpmn-start-event/bpmn-start-event");
var bpmn_intermediate_event_1 = require("./bpmn-intermediate-event/bpmn-intermediate-event");
var bpmn_end_event_1 = require("./bpmn-end-event/bpmn-end-event");
var bpmn_gateway_1 = require("./bpmn-gateway/bpmn-gateway");
var bpmn_transaction_1 = require("./bpmn-transaction/bpmn-transaction");
var bpmn_call_activity_1 = require("./bpmn-call-activity/bpmn-call-activity");
var bpmn_annotation_1 = require("./bpmn-annotation/bpmn-annotation");
var bpmn_pool_1 = require("./bpmn-pool/bpmn-pool");
var bpmn_data_object_1 = require("./bpmn-data-object/bpmn-data-object");
var bpmn_group_1 = require("./bpmn-group/bpmn-group");
var bpmn_data_store_1 = require("./bpmn-data-store/bpmn-data-store");
var composeBPMNPreview = function (layer, translate) {
    var elements = [];
    var defaultBounds = { x: 0, y: 0, width: 160, height: 60 };
    elements.push(new bpmn_task_1.BPMNTask({
        name: translate('packages.BPMN.BPMNTask'),
        bounds: defaultBounds,
    }));
    elements.push(new bpmn_subprocess_1.BPMNSubprocess({
        name: translate('packages.BPMN.BPMNSubprocess'),
        bounds: defaultBounds,
    }));
    elements.push(new bpmn_transaction_1.BPMNTransaction({
        name: translate('packages.BPMN.BPMNTransaction'),
        bounds: defaultBounds,
    }));
    elements.push(new bpmn_call_activity_1.BPMNCallActivity({
        name: translate('packages.BPMN.BPMNCallActivity'),
        bounds: defaultBounds,
    }));
    elements.push(new bpmn_group_1.BPMNGroup({
        bounds: defaultBounds,
    }));
    elements.push(new bpmn_annotation_1.BPMNAnnotation({
        name: translate('packages.BPMN.BPMNAnnotation'),
        bounds: defaultBounds,
    }));
    elements.push(new bpmn_start_event_1.BPMNStartEvent({
        bounds: { x: 0, y: 0, width: 40, height: 40 },
    }));
    elements.push(new bpmn_intermediate_event_1.BPMNIntermediateEvent({
        bounds: { x: 0, y: 0, width: 40, height: 40 },
    }));
    elements.push(new bpmn_end_event_1.BPMNEndEvent({
        bounds: { x: 0, y: 0, width: 40, height: 40 },
    }));
    elements.push(new bpmn_gateway_1.BPMNGateway({
        bounds: { x: 0, y: 0, width: 40, height: 40 },
    }));
    elements.push(new bpmn_data_object_1.BPMNDataObject({
        bounds: { x: 0, y: 0, width: 40, height: 60 },
    }));
    elements.push(new bpmn_data_store_1.BPMNDataStore({
        bounds: { x: 0, y: 0, width: 60, height: 60 },
    }));
    elements.push(new bpmn_pool_1.BPMNPool({
        name: translate('packages.BPMN.BPMNPool'),
        bounds: { x: 0, y: 0, width: 160, height: 80 },
    }));
    return elements;
};
exports.composeBPMNPreview = composeBPMNPreview;
//# sourceMappingURL=bpmn-diagram-preview.js.map