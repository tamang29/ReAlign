"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNInclusiveGatewayComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var themedComponents_1 = require("../../../../components/theme/themedComponents");
var multiline_1 = require("../../../../utils/svg/multiline");
var BPMNInclusiveGatewayComponent = function (_a) {
    var element = _a.element, fillColor = _a.fillColor;
    return (react_1.default.createElement("g", null,
        react_1.default.createElement(themedComponents_1.ThemedPolyline, { points: "".concat(element.bounds.width / 2, " 0, ").concat(element.bounds.width, " ").concat(element.bounds.height / 2, ", ").concat(element.bounds.width / 2, " ").concat(element.bounds.height, ", 0 ").concat(element.bounds.height / 2, ", ").concat(element.bounds.width / 2, " 0"), strokeColor: element.strokeColor, fillColor: fillColor || element.fillColor }),
        react_1.default.createElement(themedComponents_1.ThemedCircle, { cx: element.bounds.width / 2, cy: element.bounds.height / 2, r: Math.min(element.bounds.width, element.bounds.height) / 2 - 12, strokeColor: element.strokeColor, fillColor: "transparent" }),
        react_1.default.createElement(multiline_1.Multiline, { x: element.bounds.width / 2, y: element.bounds.height + 20, width: element.bounds.width * 2, height: element.bounds.height, fill: element.textColor, lineHeight: 16, capHeight: 11, verticalAnchor: "start" }, element.name)));
};
exports.BPMNInclusiveGatewayComponent = BPMNInclusiveGatewayComponent;
//# sourceMappingURL=bpmn-inclusive-gateway-component.js.map