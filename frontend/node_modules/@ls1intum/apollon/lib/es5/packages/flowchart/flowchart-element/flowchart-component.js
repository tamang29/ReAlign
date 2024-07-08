"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowchartComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var multiline_1 = require("../../../utils/svg/multiline");
var FlowchartComponent = function (_a) {
    var element = _a.element, children = _a.children;
    return (react_1.default.createElement("g", null,
        children,
        react_1.default.createElement(multiline_1.Multiline, { x: element.bounds.width / 2, y: element.bounds.height / 2, width: element.bounds.width, height: element.bounds.height, fontWeight: "bold", fill: element.textColor, lineHeight: 16, capHeight: 11 }, element.name)));
};
exports.FlowchartComponent = FlowchartComponent;
//# sourceMappingURL=flowchart-component.js.map