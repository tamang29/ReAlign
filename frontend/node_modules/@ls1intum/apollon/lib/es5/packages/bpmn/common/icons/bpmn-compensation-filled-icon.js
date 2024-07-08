"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNCompensationFilledIcon = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var themedComponents_1 = require("../../../../components/theme/themedComponents");
var BPMNCompensationFilledIcon = function (props) { return (react_1.default.createElement("svg", tslib_1.__assign({}, props, { height: 20, width: 20 }),
    react_1.default.createElement(themedComponents_1.ThemedPolyline, { points: '3 10, 9 6, 9 14, 3 10', strokeLinecap: "round", strokeLinejoin: "round", fillColor: "currentColor", fillRule: "evenodd" }),
    react_1.default.createElement(themedComponents_1.ThemedPolyline, { points: '10 10, 16 6, 16 14, 10 10', strokeLinecap: "round", strokeLinejoin: "round", fillColor: "currentColor", fillRule: "evenodd" }))); };
exports.BPMNCompensationFilledIcon = BPMNCompensationFilledIcon;
//# sourceMappingURL=bpmn-compensation-filled-icon.js.map