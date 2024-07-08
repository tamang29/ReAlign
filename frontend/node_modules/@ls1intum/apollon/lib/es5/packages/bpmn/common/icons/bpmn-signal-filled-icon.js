"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNSignalFilledIcon = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var themedComponents_1 = require("../../../../components/theme/themedComponents");
var BPMNSignalFilledIcon = function (props) { return (react_1.default.createElement("svg", tslib_1.__assign({}, props, { height: 20, width: 20 }),
    react_1.default.createElement(themedComponents_1.ThemedPolyline, { points: '10 3, 3 15, 17 15, 10 3', strokeLinecap: "round", strokeLinejoin: "round", fillColor: "currentColor", fillRule: "evenodd" }))); };
exports.BPMNSignalFilledIcon = BPMNSignalFilledIcon;
//# sourceMappingURL=bpmn-signal-filled-icon.js.map