"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLUseCaseIncludeComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var text_1 = require("../../../components/controls/text/text");
var point_1 = require("../../../utils/geometry/point");
var themedComponents_1 = require("../../../components/theme/themedComponents");
var Arrow = function (_a) {
    var id = _a.id, color = _a.color, d = _a.d;
    return (react_1.default.createElement("g", null,
        react_1.default.createElement("marker", { id: "marker-".concat(id), viewBox: "0 0 30 30", markerWidth: "22", markerHeight: "30", refX: "30", refY: "15", orient: "auto", markerUnits: "strokeWidth" },
            react_1.default.createElement(themedComponents_1.ThemedPath, { d: "M0,29 L30,15 L0,1", fillColor: "none", strokeColor: color })),
        react_1.default.createElement(themedComponents_1.ThemedPath, { d: d, strokeColor: color, strokeDasharray: 7, markerEnd: "url(#marker-".concat(id, ")") })));
};
var UMLUseCaseIncludeComponent = function (_a) {
    var element = _a.element;
    var _b = tslib_1.__read(element.path.map(function (p) { return new point_1.Point(p.x, p.y); }), 2), start = _b[0], end = _b[1];
    var line = end.subtract(start);
    if (line.length <= 100) {
        return react_1.default.createElement(Arrow, { id: element.id, color: element.strokeColor, d: "M ".concat(start.x, " ").concat(start.y, " L ").concat(end.x, " ").concat(end.y) });
    }
    var norm = line.normalize();
    var center = start.add(norm.scale(0.5 * line.length));
    var startSection = start.add(norm.scale(0.5 * line.length - 40));
    var endSection = end.subtract(norm.scale(0.5 * line.length - 40));
    return (react_1.default.createElement("g", null,
        react_1.default.createElement(Arrow, { id: element.id, color: element.strokeColor, d: "\n          M ".concat(start.x, " ").concat(start.y, " L ").concat(startSection.x, " ").concat(startSection.y, "\n          M ").concat(endSection.x, " ").concat(endSection.y, " L ").concat(end.x, " ").concat(end.y, "\n        ") }),
        react_1.default.createElement("path", { id: "textpath-".concat(element.id), d: "\n          M ".concat(startSection.x, " ").concat(startSection.y, "\n          L ").concat(endSection.x, " ").concat(endSection.y, "\n        ") }),
        react_1.default.createElement(text_1.Text, { noX: true, noY: true, fill: element.textColor, transform: norm.x < 0
                ? "\n              translate(".concat(center.x, ", ").concat(center.y, ")\n              rotate(180)\n              translate(").concat(-center.x, ", ").concat(-center.y, ")\n            ")
                : undefined },
            react_1.default.createElement("textPath", { xlinkHref: "#textpath-".concat(element.id), startOffset: "50%" }, "\u00ABinclude\u00BB"))));
};
exports.UMLUseCaseIncludeComponent = UMLUseCaseIncludeComponent;
//# sourceMappingURL=uml-use-case-include-component.js.map