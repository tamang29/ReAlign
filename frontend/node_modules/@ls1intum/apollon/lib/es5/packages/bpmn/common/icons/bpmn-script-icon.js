"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNScriptIcon = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var themedComponents_1 = require("../../../../components/theme/themedComponents");
var BPMNScriptIcon = function (props) { return (react_1.default.createElement("svg", tslib_1.__assign({}, props, { height: 20, width: 20 }),
    react_1.default.createElement(themedComponents_1.ThemedRect, { height: 16, width: 16, x: 2, y: 2, strokeLinejoin: "round", fillColor: "transparent" }),
    react_1.default.createElement(themedComponents_1.ThemedPolyline, { points: '6 6, 12 6', strokeLinecap: "round", strokeLinejoin: "round" }),
    react_1.default.createElement(themedComponents_1.ThemedPolyline, { points: '6 10, 14 10', strokeLinecap: "round", strokeLinejoin: "round" }),
    react_1.default.createElement(themedComponents_1.ThemedPolyline, { points: '6 14, 10 14', strokeLinecap: "round", strokeLinejoin: "round" }))); };
exports.BPMNScriptIcon = BPMNScriptIcon;
//# sourceMappingURL=bpmn-script-icon.js.map