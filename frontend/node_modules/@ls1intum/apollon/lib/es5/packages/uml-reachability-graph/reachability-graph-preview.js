"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeReachabilityGraphPreview = void 0;
var uml_reachability_graph_marking_1 = require("./uml-reachability-graph-marking/uml-reachability-graph-marking");
var composeReachabilityGraphPreview = function (layer, translate) {
    var elements = [];
    var umlReachabilityGraphMarking = new uml_reachability_graph_marking_1.UMLReachabilityGraphMarking({
        name: translate('packages.ReachabilityGraph.ReachabilityGraphMarking'),
        bounds: { x: 0, y: 0, width: 160, height: 100 },
    });
    elements.push(umlReachabilityGraphMarking);
    return elements;
};
exports.composeReachabilityGraphPreview = composeReachabilityGraphPreview;
//# sourceMappingURL=reachability-graph-preview.js.map