"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNTimerIcon = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var themedComponents_1 = require("../../../../components/theme/themedComponents");
var BPMNTimerIcon = function (props) { return (react_1.default.createElement("svg", tslib_1.__assign({}, props, { height: 20, width: 20 }),
    react_1.default.createElement(themedComponents_1.ThemedCircle, { cx: "50%", cy: "50%", r: 10, fillColor: "transparent" }),
    react_1.default.createElement(themedComponents_1.ThemedPolyline, { points: '10 4, 10 10, 13 13', strokeLinecap: "round", strokeLinejoin: "round" }))); };
exports.BPMNTimerIcon = BPMNTimerIcon;
//# sourceMappingURL=bpmn-timer-icon.js.map