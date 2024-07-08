"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLUseCaseAssociationComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var text_1 = require("../../../components/controls/text/text");
var point_1 = require("../../../utils/geometry/point");
var themedComponents_1 = require("../../../components/theme/themedComponents");
var UMLUseCaseAssociationComponent = function (_a) {
    var element = _a.element;
    var _b = tslib_1.__read(element.path.map(function (p) { return new point_1.Point(p.x, p.y); }), 2), start = _b[0], end = _b[1];
    var line = end.subtract(start);
    var norm = line.normalize();
    var center = start.add(norm.scale(0.5 * line.length));
    return (react_1.default.createElement("g", null,
        react_1.default.createElement("path", { id: "textpath-".concat(element.id), d: "\n        M ".concat(start.x, " ").concat(start.y - 10, "\n        L ").concat(end.x, " ").concat(end.y - 10, "\n    ") }),
        react_1.default.createElement(text_1.Text, { dy: "20px", noX: true, noY: true, fill: element.textColor, transform: norm.x < 0
                ? "\n            translate(".concat(center.x, ", ").concat(center.y, ")\n            rotate(180)\n            translate(").concat(-center.x, ", ").concat(-center.y, ")\n          ")
                : undefined },
            react_1.default.createElement("textPath", { xlinkHref: "#textpath-".concat(element.id), startOffset: "50%" }, element.name)),
        react_1.default.createElement(themedComponents_1.ThemedPolyline, { points: element.path.map(function (point) { return "".concat(point.x, " ").concat(point.y); }).join(','), strokeColor: element.strokeColor, fillColor: "none", strokeWidth: 1 })));
};
exports.UMLUseCaseAssociationComponent = UMLUseCaseAssociationComponent;
//# sourceMappingURL=uml-use-case-association-component.js.map