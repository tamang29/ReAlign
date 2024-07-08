"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNLinkIcon = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var themedComponents_1 = require("../../../../components/theme/themedComponents");
var BPMNLinkIcon = function (props) { return (react_1.default.createElement("svg", tslib_1.__assign({}, props, { height: 20, width: 20 }),
    react_1.default.createElement(themedComponents_1.ThemedPolyline, { points: '3 7, 13 7, 13 4, 18 10, 13 16, 13 13, 3 13, 3 7', strokeLinecap: "round", strokeLinejoin: "round", fillColor: "transparent" }))); };
exports.BPMNLinkIcon = BPMNLinkIcon;
//# sourceMappingURL=bpmn-link-icon.js.map