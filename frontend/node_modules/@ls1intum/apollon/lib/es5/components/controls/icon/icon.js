"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Icon = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var styles_1 = require("../../theme/styles");
var Svg = styles_1.styled.svg(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  height: 1em;\n  vertical-align: middle;\n  width: 1em;\n"], ["\n  height: 1em;\n  vertical-align: middle;\n  width: 1em;\n"])));
var Icon = function (props) { return (react_1.default.createElement(Svg, tslib_1.__assign({ width: "16px", height: "16px", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, props))); };
exports.Icon = Icon;
var templateObject_1;
//# sourceMappingURL=icon.js.map