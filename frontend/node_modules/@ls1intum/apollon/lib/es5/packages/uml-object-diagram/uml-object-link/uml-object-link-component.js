"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLObjectLinkComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var themedComponents_1 = require("../../../components/theme/themedComponents");
var UMLObjectLinkComponent = function (_a) {
    var element = _a.element;
    return (react_1.default.createElement("g", null,
        react_1.default.createElement(themedComponents_1.ThemedPolyline, { points: element.path.map(function (point) { return "".concat(point.x, " ").concat(point.y); }).join(','), strokeColor: element.strokeColor, fillColor: "none", strokeWidth: 1 })));
};
exports.UMLObjectLinkComponent = UMLObjectLinkComponent;
//# sourceMappingURL=uml-object-link-component.js.map