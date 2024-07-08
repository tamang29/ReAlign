"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowchartFlowlineComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var point_1 = require("../../../utils/geometry/point");
var themedComponents_1 = require("../../../components/theme/themedComponents");
var FlowchartFlowlineComponent = function (_a) {
    var element = _a.element;
    var position = { x: 0, y: 0 };
    var direction = 'v';
    var path = element.path.map(function (point) { return new point_1.Point(point.x, point.y); });
    var distance = path.reduce(function (length, point, i, points) { return (i + 1 < points.length ? length + points[i + 1].subtract(point).length : length); }, 0) / 2;
    for (var index = 0; index < path.length - 1; index++) {
        var vector = path[index + 1].subtract(path[index]);
        if (vector.length > distance) {
            var norm = vector.normalize();
            direction = Math.abs(norm.x) > Math.abs(norm.y) ? 'h' : 'v';
            position = path[index].add(norm.scale(distance));
            break;
        }
        distance -= vector.length;
    }
    var layoutText = function (dir) {
        switch (dir) {
            case 'v':
                return {
                    dx: 5,
                    dominantBaseline: 'middle',
                    textAnchor: 'start',
                };
            case 'h':
                return {
                    dy: -5,
                    dominantBaseline: 'text-after-edge',
                    textAnchor: 'middle',
                };
        }
    };
    var fill = element.textColor ? { fill: element.textColor } : {};
    return (react_1.default.createElement("g", null,
        react_1.default.createElement("marker", { id: "marker-".concat(element.id), viewBox: "0 0 30 30", markerWidth: "22", markerHeight: "30", refX: "30", refY: "15", orient: "auto", markerUnits: "strokeWidth" },
            react_1.default.createElement(themedComponents_1.ThemedPath, { d: "M0,29 L30,15 L0,1", fillColor: "none", strokeColor: element.strokeColor })),
        react_1.default.createElement(themedComponents_1.ThemedPolyline, { points: element.path.map(function (point) { return "".concat(point.x, " ").concat(point.y); }).join(','), strokeColor: element.strokeColor, fillColor: "none", strokeWidth: 1, markerEnd: "url(#marker-".concat(element.id, ")") }),
        react_1.default.createElement("text", tslib_1.__assign({ x: position.x, y: position.y }, layoutText(direction), { pointerEvents: "none", style: tslib_1.__assign({}, fill) }), element.name)));
};
exports.FlowchartFlowlineComponent = FlowchartFlowlineComponent;
//# sourceMappingURL=flowchart-flowline-component.js.map