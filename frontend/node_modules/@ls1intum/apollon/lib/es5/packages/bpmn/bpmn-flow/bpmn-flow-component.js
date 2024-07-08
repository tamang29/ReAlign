"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNFlowComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var point_1 = require("../../../utils/geometry/point");
var themedComponents_1 = require("../../../components/theme/themedComponents");
var BPMNFlowComponent = function (_a) {
    var element = _a.element;
    var position = { x: 0, y: 0 };
    var direction = 'vertical';
    var path = element.path.map(function (point) { return new point_1.Point(point.x, point.y); });
    var distance = path.reduce(function (length, point, i, points) { return (i + 1 < points.length ? length + points[i + 1].subtract(point).length : length); }, 0) / 2;
    for (var index = 0; index < path.length - 1; index++) {
        var vector = path[index + 1].subtract(path[index]);
        if (vector.length > distance) {
            var normalized = vector.normalize();
            direction = Math.abs(normalized.x) > Math.abs(normalized.y) ? 'horizontal' : 'vertical';
            position = path[index].add(normalized.scale(distance));
            break;
        }
        distance -= vector.length;
    }
    /**
     * Layout the flow's label according to its direction
     * @param direction The direction according to which the label should be layouted
     */
    var layoutText = function (direction) {
        switch (direction) {
            case 'vertical':
                return {
                    dx: 5,
                    dominantBaseline: 'middle',
                    textAnchor: 'start',
                };
            case 'horizontal':
                return {
                    dy: -5,
                    dominantBaseline: 'text-after-edge',
                    textAnchor: 'middle',
                };
        }
    };
    return (react_1.default.createElement("g", null,
        element.flowType === 'message' && (react_1.default.createElement("marker", { id: "marker-start-".concat(element.id), viewBox: "0 0 ".concat(10, " ").concat(10), markerWidth: 10, markerHeight: 10, refX: 0, refY: 0, orient: "auto", markerUnits: "strokeWidth" },
            react_1.default.createElement(themedComponents_1.ThemedCircle, { cx: "0%", cy: "0%", r: 5, strokeColor: element.fillColor, strokeWidth: 1 }))),
        (element.flowType === 'sequence' || element.flowType === 'message') && (react_1.default.createElement("marker", { id: "marker-end-".concat(element.id), viewBox: "0 0 ".concat(10, " ").concat(5), markerWidth: 10, markerHeight: 10, refX: 11, refY: 5, orient: "auto", markerUnits: "strokeWidth" },
            react_1.default.createElement(themedComponents_1.ThemedPath, { d: "M0,0 L10,5 L0,10, L0,0 z", fillRule: "evenodd", fillColor: "strokeColor", strokeLinejoin: "round" }))),
        element.flowType === 'data association' && (react_1.default.createElement("marker", { id: "marker-end-".concat(element.id), viewBox: "0 0 ".concat(10, " ").concat(5), markerWidth: 10, markerHeight: 10, refX: 11, refY: 5, orient: "auto", markerUnits: "strokeWidth" },
            react_1.default.createElement(themedComponents_1.ThemedPath, { d: "M5,0 L10,5 L5,10", fillRule: "evenodd", strokeLinejoin: "round", strokeLinecap: "round", fillColor: "transparent" }))),
        react_1.default.createElement(themedComponents_1.ThemedPolyline, { points: element.path.map(function (point) { return "".concat(point.x, " ").concat(point.y); }).join(','), strokeColor: element.strokeColor, fillColor: "none", strokeWidth: 1, markerStart: element.flowType === 'message' ? "url(#marker-start-".concat(element.id, ")") : undefined, markerEnd: element.flowType !== 'association' ? "url(#marker-end-".concat(element.id, ")") : undefined, strokeDasharray: element.flowType !== 'sequence' ? 4 : undefined }),
        react_1.default.createElement("text", tslib_1.__assign({ x: position.x, y: position.y }, layoutText(direction), { pointerEvents: "none", style: { fill: element.textColor } }), element.name)));
};
exports.BPMNFlowComponent = BPMNFlowComponent;
//# sourceMappingURL=bpmn-flow-component.js.map