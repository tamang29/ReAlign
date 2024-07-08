"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNMessageFilledIcon = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var themedComponents_1 = require("../../../../components/theme/themedComponents");
var BPMNMessageFilledIcon = function (props) { return (react_1.default.createElement("svg", tslib_1.__assign({}, props, { height: 20, width: 20 }),
    react_1.default.createElement(themedComponents_1.ThemedPolyline, { points: '0.2 3, 19.8 3, 10 11, 0.2 3', strokeLinecap: "round", strokeLinejoin: "round", fillColor: "currentColor" }),
    react_1.default.createElement(themedComponents_1.ThemedPolyline, { points: '0 5.5, 0 17, 20 17, 20 5.5, 10 13.5, 0 5.5', strokeLinecap: "round", strokeLinejoin: "round", fillColor: "currentColor" }))); };
exports.BPMNMessageFilledIcon = BPMNMessageFilledIcon;
//# sourceMappingURL=bpmn-message-filled-icon.js.map