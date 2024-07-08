"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNDataStoreComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var themedComponents_1 = require("../../../components/theme/themedComponents");
var multiline_1 = require("../../../utils/svg/multiline");
var BPMNDataStoreComponent = function (_a) {
    var element = _a.element, fillColor = _a.fillColor, strokeColor = _a.strokeColor, textColor = _a.textColor;
    return (react_1.default.createElement("g", null,
        react_1.default.createElement(themedComponents_1.ThemedPath, { d: "M 0 10 L 0 ".concat(element.bounds.height - 10, " A ").concat(element.bounds.width / 2, " 10 0 0 0 ").concat(element.bounds.width, " ").concat(element.bounds.height - 10, " L ").concat(element.bounds.width, " 10 A ").concat(element.bounds.width / 2, " 10 180 0 0 0 10"), strokeColor: strokeColor || element.strokeColor, fillColor: fillColor || element.fillColor }),
        react_1.default.createElement(themedComponents_1.ThemedPath, { d: "M 0 30 A ".concat(element.bounds.width / 2, " 10 0 0 0 ").concat(element.bounds.width, " 30"), strokeColor: strokeColor || element.strokeColor, fillColor: "transparent" }),
        react_1.default.createElement(themedComponents_1.ThemedPath, { d: "M 0 20 A ".concat(element.bounds.width / 2, " 10 0 0 0 ").concat(element.bounds.width, " 20"), strokeColor: strokeColor || element.strokeColor, fillColor: "transparent" }),
        react_1.default.createElement(themedComponents_1.ThemedPath, { d: "M 0 10 A ".concat(element.bounds.width / 2, " 10 0 0 0 ").concat(element.bounds.width, " 10"), strokeColor: strokeColor || element.strokeColor, fillColor: "transparent" }),
        react_1.default.createElement(multiline_1.Multiline, { x: element.bounds.width / 2, y: element.bounds.height + 20, width: element.bounds.width * 2, fill: textColor || element.textColor, lineHeight: 16, capHeight: 11, verticalAnchor: "start" }, element.name)));
};
exports.BPMNDataStoreComponent = BPMNDataStoreComponent;
//# sourceMappingURL=bpmn-data-store-component.js.map