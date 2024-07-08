"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorSelector = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var style_pane_styles_1 = require("./style-pane-styles");
var styled_components_1 = tslib_1.__importDefault(require("styled-components"));
var colors = [
    '#fc5c65',
    '#fd9644',
    '#fed330',
    '#26de81',
    '#2bcbba',
    '#45aaf2',
    '#4b7bec',
    '#6a89cc',
    '#a55eea',
    '#d1d8e0',
    '#778ca3',
    'black',
];
var ColorContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  background-color: ", ";\n  width: 100%;\n  padding-bottom: 10px;\n"], ["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  background-color: ", ";\n  width: 100%;\n  padding-bottom: 10px;\n"])), function (props) { return props.theme.color.background; });
var Flex = styled_components_1.default.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-wrap: wrap;\n"], ["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-wrap: wrap;\n"])));
var Color = styled_components_1.default.button.attrs({})(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  height: 28px;\n  width: 28px;\n  background-color: ", ";\n  border-radius: 14px;\n  cursor: pointer;\n  border: none;\n  position: relative;\n  margin: 10px;\n  box-shadow: ", ";\n"], ["\n  height: 28px;\n  width: 28px;\n  background-color: ", ";\n  border-radius: 14px;\n  cursor: pointer;\n  border: none;\n  position: relative;\n  margin: 10px;\n  box-shadow: ", ";\n"])), function (_a) {
    var color = _a.color;
    return color || 'black';
}, function (_a) {
    var color = _a.color, selected = _a.selected;
    return (selected ? "0px 0px 10px ".concat(color) : 'none');
});
function ColorSelector(_a) {
    var onColorChange = _a.onColorChange, color = _a.color, open = _a.open, key = _a.key;
    var handleColorChange = function (newColor) {
        onColorChange(newColor);
    };
    var reset = function () {
        onColorChange(undefined);
    };
    if (!open)
        return null;
    return (react_1.default.createElement(react_1.default.Fragment, null, open ? (react_1.default.createElement(ColorContainer, null,
        react_1.default.createElement(Flex, null, colors.map(function (colorOption) { return (react_1.default.createElement(Color, { key: key, color: colorOption, onClick: function () { return handleColorChange(colorOption); }, selected: colorOption === color })); })),
        react_1.default.createElement(style_pane_styles_1.Button, { onClick: reset }, "Reset"))) : null));
}
exports.ColorSelector = ColorSelector;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=color-selector.js.map