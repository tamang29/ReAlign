"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = exports.defaultProps = void 0;
var tslib_1 = require("tslib");
var react_1 = require("react");
var button_styles_1 = require("./button-styles");
exports.defaultProps = Object.freeze({
    block: false,
    color: 'secondary',
    disabled: false,
    outline: false,
    size: 'sm',
});
exports.Button = (0, react_1.forwardRef)(function (props, ref) {
    return (0, react_1.createElement)(button_styles_1.StyledButton, tslib_1.__assign(tslib_1.__assign({}, props), { ref: ref }));
});
exports.Button.defaultProps = exports.defaultProps;
//# sourceMappingURL=button.js.map