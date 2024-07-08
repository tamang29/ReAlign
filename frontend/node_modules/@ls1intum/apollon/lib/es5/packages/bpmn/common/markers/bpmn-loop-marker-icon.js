"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BpmnLoopMarkerIcon = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var themedComponents_1 = require("../../../../components/theme/themedComponents");
var BpmnLoopMarkerIcon = function (props) { return (react_1.default.createElement("svg", tslib_1.__assign({}, props, { height: 14, width: 14 }),
    react_1.default.createElement(themedComponents_1.ThemedPath, { d: "M7,3 A 4 4 30 1 1 3.535 5", strokeColor: props.stroke, fillColor: "transparent", strokeLinejoin: "round", strokeLinecap: "round" }),
    react_1.default.createElement(themedComponents_1.ThemedPath, { d: "M9.5,1.5 L7,3 L8,6", strokeColor: props.stroke, fillColor: "transparent", strokeLinejoin: "round", strokeLinecap: "round" }))); };
exports.BpmnLoopMarkerIcon = BpmnLoopMarkerIcon;
//# sourceMappingURL=bpmn-loop-marker-icon.js.map