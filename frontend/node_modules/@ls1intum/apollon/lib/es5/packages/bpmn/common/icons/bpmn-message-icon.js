"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNMessageIcon = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var themedComponents_1 = require("../../../../components/theme/themedComponents");
var BPMNMessageIcon = function (props) { return (react_1.default.createElement("svg", tslib_1.__assign({}, props, { height: 20, width: 20 }),
    react_1.default.createElement(themedComponents_1.ThemedPolyline, { points: '0 3, 0 17, 20 17, 20 3, 10 11, 0 3, 20 3', strokeLinecap: "round", strokeLinejoin: "round", fillColor: "transparent" }))); };
exports.BPMNMessageIcon = BPMNMessageIcon;
//# sourceMappingURL=bpmn-message-icon.js.map