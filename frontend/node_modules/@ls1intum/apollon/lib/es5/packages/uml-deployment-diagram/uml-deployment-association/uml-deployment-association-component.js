"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLDeploymentAssociationComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var text_1 = require("../../../components/controls/text/text");
var point_1 = require("../../../utils/geometry/point");
var themedComponents_1 = require("../../../components/theme/themedComponents");
var UMLDeploymentAssociationComponent = function (_a) {
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
    return (react_1.default.createElement("g", null,
        react_1.default.createElement(themedComponents_1.ThemedPolyline, { points: element.path.map(function (point) { return "".concat(point.x, " ").concat(point.y); }).join(','), strokeColor: element.strokeColor, fillColor: "none", strokeWidth: 1 }),
        react_1.default.createElement(text_1.Text, tslib_1.__assign({ fill: element.textColor, x: position.x, y: position.y }, layoutText(direction), { pointerEvents: "none" }), element.name)));
};
exports.UMLDeploymentAssociationComponent = UMLDeploymentAssociationComponent;
//# sourceMappingURL=uml-deployment-association-component.js.map