"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Body = exports.Header = exports.defaultProps = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var typography_styles_1 = require("./typography-styles");
exports.defaultProps = {
    gutter: true,
};
var Header = function (props) { return react_1.default.createElement(typography_styles_1.Typography, tslib_1.__assign({ variant: "header", as: "h1" }, props)); };
exports.Header = Header;
exports.Header.defaultProps = exports.defaultProps;
var Body = function (props) {
    var gutter = props.gutter, typographyProps = tslib_1.__rest(props, ["gutter"]);
    return react_1.default.createElement(typography_styles_1.Typography, tslib_1.__assign({ variant: "body", as: "span", gutter: false }, typographyProps));
};
exports.Body = Body;
exports.Body.defaultProps = {
    gutter: false,
};
//# sourceMappingURL=typography.js.map