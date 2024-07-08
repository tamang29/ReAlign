"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoomPane = exports.ZoomPaneComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var clamp_1 = require("../../utils/clamp");
var styles_1 = require("../theme/styles");
var ZoomButton = styles_1.styled.button(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  background: var(--apollon-background);\n  color: var(--apollon-primary-contrast);\n  border: 1px solid var(--apollon-gray);\n  margin: 0;\n  outline: none;\n  border-radius: 0.25rem;\n  width: 2.25em;\n  height: 2.25em;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  :hover {\n    background-color: var(--apollon-gray);\n    border-color: var(--apollon-gray-variant);\n  }\n\n  :active {\n    background-color: var(--apollon-gray);\n    border-color: var(--apollon-gray-variant);\n  }\n"], ["\n  background: var(--apollon-background);\n  color: var(--apollon-primary-contrast);\n  border: 1px solid var(--apollon-gray);\n  margin: 0;\n  outline: none;\n  border-radius: 0.25rem;\n  width: 2.25em;\n  height: 2.25em;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  :hover {\n    background-color: var(--apollon-gray);\n    border-color: var(--apollon-gray-variant);\n  }\n\n  :active {\n    background-color: var(--apollon-gray);\n    border-color: var(--apollon-gray-variant);\n  }\n"])));
var ZoomPaneComponent = function (props) {
    var _a = props.min, min = _a === void 0 ? 0.5 : _a, _b = props.max, max = _b === void 0 ? 5 : _b, _c = props.step, step = _c === void 0 ? 0.5 : _c, value = props.value, onChange = props.onChange, style = props.style;
    return (react_1.default.createElement("div", { style: tslib_1.__assign({ display: 'flex', flexDirection: 'column', position: 'absolute', right: '0.75em', bottom: '0.75em' }, style) },
        react_1.default.createElement(ZoomButton, { style: { marginBottom: '0.5em' }, onClick: function () { return onChange((0, clamp_1.clamp)(value + step, min, max)); } }, "+"),
        react_1.default.createElement(ZoomButton, { onClick: function () { return onChange((0, clamp_1.clamp)(value - step, min, max)); } }, "-")));
};
exports.ZoomPaneComponent = ZoomPaneComponent;
exports.ZoomPane = exports.ZoomPaneComponent;
var templateObject_1;
//# sourceMappingURL=zoom-pane.js.map