"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLUseCaseActorComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var text_1 = require("../../../components/controls/text/text");
var themedComponents_1 = require("../../../components/theme/themedComponents");
var boundary_1 = require("../../../utils/geometry/boundary");
var UMLUseCaseActorComponent = function (_a) {
    var element = _a.element, fillColor = _a.fillColor;
    return (react_1.default.createElement("g", null,
        react_1.default.createElement("rect", { width: "100%", height: "100%", fill: "none" }),
        react_1.default.createElement("g", { stroke: element.strokeColor || 'black', strokeWidth: 2 },
            react_1.default.createElement(themedComponents_1.ThemedCircle, { cx: (0, boundary_1.computeDimension)(1.0, 40, true), cy: (0, boundary_1.computeDimension)(1.0, 25, true), r: (0, boundary_1.computeDimension)(1.0, 15, true), fillColor: fillColor || element.fillColor, strokeColor: element.fillColor }),
            react_1.default.createElement(themedComponents_1.ThemedLine, { x1: (0, boundary_1.computeDimension)(1.0, 40), y1: (0, boundary_1.computeDimension)(1.0, 40), x2: (0, boundary_1.computeDimension)(1.0, 40), y2: (0, boundary_1.computeDimension)(1.0, 75), strokeColor: element.fillColor }),
            react_1.default.createElement(themedComponents_1.ThemedLine, { x1: (0, boundary_1.computeDimension)(1.0, 10), y1: 50, x2: (0, boundary_1.computeDimension)(1.0, 65), y2: 50, strokeColor: element.fillColor }),
            react_1.default.createElement(themedComponents_1.ThemedLine, { x1: (0, boundary_1.computeDimension)(1.0, 40), y1: (0, boundary_1.computeDimension)(1.0, 75), x2: (0, boundary_1.computeDimension)(1.0, 10), y2: (0, boundary_1.computeDimension)(1.0, 110), strokeColor: element.fillColor }),
            react_1.default.createElement(themedComponents_1.ThemedLine, { x1: (0, boundary_1.computeDimension)(1.0, 40), y1: (0, boundary_1.computeDimension)(1.0, 75), x2: (0, boundary_1.computeDimension)(1.0, 65), y2: (0, boundary_1.computeDimension)(1.0, 110), strokeColor: element.fillColor })),
        react_1.default.createElement(text_1.Text, { fill: element.textColor, x: (0, boundary_1.computeDimension)(1.0, 40), y: (0, boundary_1.computeDimension)(1.0, 130) }, element.name)));
};
exports.UMLUseCaseActorComponent = UMLUseCaseActorComponent;
//# sourceMappingURL=uml-use-case-actor-component.js.map