"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNUserIcon = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var themedComponents_1 = require("../../../../components/theme/themedComponents");
var BPMNUserIcon = function (props) { return (react_1.default.createElement("svg", tslib_1.__assign({}, props, { height: 20, width: 20 }),
    react_1.default.createElement(themedComponents_1.ThemedCircle, { cx: "10", cy: "4", r: 4, fillColor: "transparent" }),
    react_1.default.createElement(themedComponents_1.ThemedPolyline, { points: '4 16, 4 11, 16 11, 16 16', fillColor: "transparent" }))); };
exports.BPMNUserIcon = BPMNUserIcon;
//# sourceMappingURL=bpmn-user-icon.js.map