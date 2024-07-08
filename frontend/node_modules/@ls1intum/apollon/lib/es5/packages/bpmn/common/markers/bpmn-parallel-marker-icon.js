"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNParallelMarkerIcon = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var themedComponents_1 = require("../../../../components/theme/themedComponents");
var BPMNParallelMarkerIcon = function (props) { return (react_1.default.createElement("svg", tslib_1.__assign({}, props, { height: 14, width: 14 }),
    react_1.default.createElement(themedComponents_1.ThemedPolyline, { points: '3 3, 3 11', strokeLinecap: "round", strokeLinejoin: "round", strokeColor: props.stroke, fillColor: "currentColor" }),
    react_1.default.createElement(themedComponents_1.ThemedPolyline, { points: '7 3, 7 11', strokeLinecap: "round", strokeLinejoin: "round", strokeColor: props.stroke, fillColor: "currentColor" }),
    react_1.default.createElement(themedComponents_1.ThemedPolyline, { points: '11 3, 11 11', strokeLinecap: "round", strokeLinejoin: "round", strokeColor: props.stroke, fillColor: "currentColor" }))); };
exports.BPMNParallelMarkerIcon = BPMNParallelMarkerIcon;
//# sourceMappingURL=bpmn-parallel-marker-icon.js.map