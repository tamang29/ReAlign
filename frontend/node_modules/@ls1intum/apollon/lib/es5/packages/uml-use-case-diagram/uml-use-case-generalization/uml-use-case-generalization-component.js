"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLUseCaseGeneralizationComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var themedComponents_1 = require("../../../components/theme/themedComponents");
var UMLUseCaseGeneralizationComponent = function (_a) {
    var element = _a.element;
    return (react_1.default.createElement("g", null,
        react_1.default.createElement("marker", { id: "marker-".concat(element.id), viewBox: "0 0 30 30", markerWidth: "22", markerHeight: "30", refX: "30", refY: "15", orient: "auto", markerUnits: "strokeWidth" },
            react_1.default.createElement(themedComponents_1.ThemedPath, { d: "M0,1 L0,29 L30,15 z", strokeColor: element.strokeColor })),
        react_1.default.createElement(themedComponents_1.ThemedPolyline, { points: element.path.map(function (point) { return "".concat(point.x, " ").concat(point.y); }).join(','), strokeColor: element.strokeColor, fillColor: "none", strokeWidth: 1, markerEnd: "url(#marker-".concat(element.id, ")") })));
};
exports.UMLUseCaseGeneralizationComponent = UMLUseCaseGeneralizationComponent;
//# sourceMappingURL=uml-use-case-generalization-component.js.map