"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLReachabilityGraphMarkingComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var multiline_1 = require("../../../utils/svg/multiline");
var themedComponents_1 = require("../../../components/theme/themedComponents");
var UMLReachabilityGraphMarkingComponent = function (_a) {
    var element = _a.element, fillColor = _a.fillColor;
    return (react_1.default.createElement("g", null,
        react_1.default.createElement(themedComponents_1.ThemedRect, { rx: 10, ry: 10, width: "100%", height: "100%", strokeColor: element.strokeColor, fillColor: fillColor || element.fillColor }),
        react_1.default.createElement(multiline_1.Multiline, { x: element.bounds.width / 2, y: element.bounds.height / 2, width: element.bounds.width, height: element.bounds.height, fontWeight: "bold", fill: element.textColor, lineHeight: 16, capHeight: 11 }, element.name),
        element.isInitialMarking && (react_1.default.createElement("g", null,
            react_1.default.createElement("marker", { id: "marker-".concat(element.id), viewBox: "0 0 ".concat(30, " ").concat(30), markerWidth: 22, markerHeight: 30, refX: 30, refY: 15, orient: "auto", markerUnits: "strokeWidth" },
                react_1.default.createElement(themedComponents_1.ThemedPath, { d: "M0,".concat(29, " L").concat(30, ",").concat(15, " L0,").concat(1), fillColor: "none", strokeColor: element.strokeColor })),
            react_1.default.createElement(themedComponents_1.ThemedPolyline, { points: "-".concat(50, ",-").concat(50, " ").concat(3, ",").concat(3), strokeColor: element.strokeColor, fillColor: "none", strokeWidth: 1, markerEnd: "url(#marker-".concat(element.id, ")") })))));
};
exports.UMLReachabilityGraphMarkingComponent = UMLReachabilityGraphMarkingComponent;
//# sourceMappingURL=uml-reachability-graph-marking-component.js.map