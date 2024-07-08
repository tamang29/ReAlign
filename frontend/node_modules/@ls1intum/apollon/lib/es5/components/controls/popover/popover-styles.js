"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arrow = exports.PopoverBody = exports.PopoverContainer = void 0;
var tslib_1 = require("tslib");
var styles_1 = require("../../theme/styles");
exports.PopoverContainer = styles_1.styled.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  background-clip: padding-box;\n  background-color: ", ";\n  border: 1px solid ", "33;\n  border-radius: 0.3em;\n  box-sizing: border-box;\n  display: block;\n  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.2));\n  font-family: ", ", sans-serif;\n  font-size: ", "px;\n  font-style: normal;\n  font-weight: 400;\n  left: 0;\n  letter-spacing: normal;\n  line-break: auto;\n  line-height: 1.5;\n  max-width: 276px;\n  position: absolute;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-transform: none;\n  text-shadow: none;\n  top: 0;\n  will-change: transform;\n  white-space: normal;\n  word-break: normal;\n  word-spacing: normal;\n  word-wrap: break-word;\n\n  *,\n  *:before,\n  *:after {\n    box-sizing: inherit;\n  }\n\n  ", "\n"], ["\n  background-clip: padding-box;\n  background-color: ", ";\n  border: 1px solid ", "33;\n  border-radius: 0.3em;\n  box-sizing: border-box;\n  display: block;\n  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.2));\n  font-family: ", ", sans-serif;\n  font-size: ", "px;\n  font-style: normal;\n  font-weight: 400;\n  left: 0;\n  letter-spacing: normal;\n  line-break: auto;\n  line-height: 1.5;\n  max-width: 276px;\n  position: absolute;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-transform: none;\n  text-shadow: none;\n  top: 0;\n  will-change: transform;\n  white-space: normal;\n  word-break: normal;\n  word-spacing: normal;\n  word-wrap: break-word;\n\n  *,\n  *:before,\n  *:after {\n    box-sizing: inherit;\n  }\n\n  ", "\n"])), function (props) { return props.theme.color.backgroundVariant; }, function (props) { return props.theme.color.primaryContrast; }, function (props) { return props.theme.font.family; }, function (props) { return props.theme.font.size; }, function (props) {
    var x = "".concat(props.position.x, "px");
    var y = "".concat(props.position.y, "px");
    var alignment = props.alignment === 'start' ? 0 : props.alignment === 'end' ? 100 : 50;
    switch (props.placement) {
        case 'top':
            x += " - ".concat(alignment, "%");
            y += " - 100% - 0.5em";
            break;
        case 'right':
            x += " + 0.5em";
            y += " - ".concat(alignment, "%");
            break;
        case 'bottom':
            x += " - ".concat(alignment, "%");
            y += " + 0.5em";
            break;
        case 'left':
            x += " - 100% - 0.5em";
            y += " - ".concat(alignment, "%");
            break;
    }
    return (0, styles_1.css)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n      transform: translate(calc(", "), calc(", "));\n    "], ["\n      transform: translate(calc(", "), calc(", "));\n    "])), x, y);
});
exports.PopoverBody = styles_1.styled.div(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  color: ", ";\n  padding: 0.5em 0.75em;\n\n  ", "\n"], ["\n  color: ", ";\n  padding: 0.5em 0.75em;\n\n  ", "\n"])), function (props) { return props.theme.font.color; }, function (props) {
    return props.maxHeight && (0, styles_1.css)(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n      max-height: ", "px;\n      overflow: auto;\n    "], ["\n      max-height: ", "px;\n      overflow: auto;\n    "])), props.maxHeight);
});
var ArrowTop = (0, styles_1.css)(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n  bottom: calc((0.5em + 1px) * -1);\n\n  &::before {\n    border-top-color: ", "33;\n    border-width: 0.5em 0.5em 0;\n    bottom: 0;\n  }\n\n  &::after {\n    border-top-color: ", ";\n    border-width: 0.5em 0.5em 0;\n    bottom: 1px;\n  }\n"], ["\n  bottom: calc((0.5em + 1px) * -1);\n\n  &::before {\n    border-top-color: ", "33;\n    border-width: 0.5em 0.5em 0;\n    bottom: 0;\n  }\n\n  &::after {\n    border-top-color: ", ";\n    border-width: 0.5em 0.5em 0;\n    bottom: 1px;\n  }\n"])), function (props) { return props.theme.color.primaryContrast; }, function (props) { return props.theme.color.gray; });
var ArrowRight = (0, styles_1.css)(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n  height: 1em;\n  left: calc((0.5em + 1px) * -1);\n  width: 0.5em;\n\n  &::before {\n    border-right-color: ", "33;\n    border-width: 0.5em 0.5em 0.5em 0;\n    left: 0;\n  }\n\n  &::after {\n    border-right-color: ", ";\n    border-width: 0.5em 0.5em 0.5em 0;\n    left: 1px;\n  }\n"], ["\n  height: 1em;\n  left: calc((0.5em + 1px) * -1);\n  width: 0.5em;\n\n  &::before {\n    border-right-color: ", "33;\n    border-width: 0.5em 0.5em 0.5em 0;\n    left: 0;\n  }\n\n  &::after {\n    border-right-color: ", ";\n    border-width: 0.5em 0.5em 0.5em 0;\n    left: 1px;\n  }\n"])), function (props) { return props.theme.color.primaryContrast; }, function (props) { return props.theme.color.gray; });
var ArrowBottom = (0, styles_1.css)(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["\n  top: calc((0.5em + 1px) * -1);\n\n  &::before {\n    border-bottom-color: ", "33;\n    border-width: 0 0.5em 0.5em 0.5em;\n    top: 0;\n  }\n\n  &::after {\n    border-bottom-color: ", ";\n    border-width: 0 0.5em 0.5em 0.5em;\n    top: 1px;\n  }\n"], ["\n  top: calc((0.5em + 1px) * -1);\n\n  &::before {\n    border-bottom-color: ", "33;\n    border-width: 0 0.5em 0.5em 0.5em;\n    top: 0;\n  }\n\n  &::after {\n    border-bottom-color: ", ";\n    border-width: 0 0.5em 0.5em 0.5em;\n    top: 1px;\n  }\n"])), function (props) { return props.theme.color.primaryContrast; }, function (props) { return props.theme.color.gray; });
var ArrowLeft = (0, styles_1.css)(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["\n  height: 1em;\n  right: calc((0.5em + 1px) * -1);\n  width: 0.5em;\n\n  &::before {\n    border-left-color: ", "33;\n    border-width: 0.5em 0 0.5em 0.5em;\n    right: 0;\n  }\n\n  &::after {\n    border-left-color: ", ";\n    border-width: 0.5em 0 0.5em 0.5em;\n    right: 1px;\n  }\n"], ["\n  height: 1em;\n  right: calc((0.5em + 1px) * -1);\n  width: 0.5em;\n\n  &::before {\n    border-left-color: ", "33;\n    border-width: 0.5em 0 0.5em 0.5em;\n    right: 0;\n  }\n\n  &::after {\n    border-left-color: ", ";\n    border-width: 0.5em 0 0.5em 0.5em;\n    right: 1px;\n  }\n"])), function (props) { return props.theme.color.primaryContrast; }, function (props) { return props.theme.color.gray; });
exports.Arrow = styles_1.styled.div(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["\n  display: block;\n  height: 0.5em;\n  position: absolute;\n  width: 1em;\n\n  &::before,\n  &::after {\n    content: '';\n    border-color: transparent;\n    border-style: solid;\n    display: block;\n    position: absolute;\n  }\n\n  ", "\n  ", "\n  ", "\n  ", "\n\n  ", "\n"], ["\n  display: block;\n  height: 0.5em;\n  position: absolute;\n  width: 1em;\n\n  &::before,\n  &::after {\n    content: '';\n    border-color: transparent;\n    border-style: solid;\n    display: block;\n    position: absolute;\n  }\n\n  ", "\n  ", "\n  ", "\n  ", "\n\n  ", "\n"])), function (props) { return props.placement === 'top' && ArrowTop; }, function (props) { return props.placement === 'right' && ArrowRight; }, function (props) { return props.placement === 'bottom' && ArrowBottom; }, function (props) { return props.placement === 'left' && ArrowLeft; }, function (props) {
    return props.placement === 'top' || props.placement === 'bottom'
        ? props.alignment === 'start'
            ? 'left: 0.3em;'
            : props.alignment === 'end'
                ? 'right: 0.3em;'
                : 'left: 50%; transform: translate(-50%, 0);'
        : props.alignment === 'start'
            ? 'top: 0.3em;'
            : props.alignment === 'end'
                ? 'bottom: 0.3em;'
                : 'top: 50%; transform: translate(0, -50%);';
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
//# sourceMappingURL=popover-styles.js.map