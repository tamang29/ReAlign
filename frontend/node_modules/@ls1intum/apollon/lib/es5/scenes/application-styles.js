"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layout = void 0;
var tslib_1 = require("tslib");
var styles_1 = require("../components/theme/styles");
var svg_styles_1 = require("./svg-styles");
exports.Layout = styles_1.styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  width: 100%;\n  height: 100%;\n  min-width: inherit;\n  min-height: inherit;\n  max-width: inherit;\n  max-height: inherit;\n  box-sizing: border-box;\n  user-select: none;\n  position: relative;\n  touch-action: none;\n\n  font-family: ", ", sans-serif;\n  font-size: ", "px;\n  color: ", ";\n  font-weight: 400;\n  line-height: 1.5;\n  text-size-adjust: 100%;\n  -webkit-tap-highlight-color: transparent;\n\n  *,\n  *:before,\n  *:after {\n    box-sizing: inherit;\n  }\n\n  svg {\n    ", "\n  }\n"], ["\n  display: flex;\n  width: 100%;\n  height: 100%;\n  min-width: inherit;\n  min-height: inherit;\n  max-width: inherit;\n  max-height: inherit;\n  box-sizing: border-box;\n  user-select: none;\n  position: relative;\n  touch-action: none;\n\n  font-family: ", ", sans-serif;\n  font-size: ", "px;\n  color: ", ";\n  font-weight: 400;\n  line-height: 1.5;\n  text-size-adjust: 100%;\n  -webkit-tap-highlight-color: transparent;\n\n  *,\n  *:before,\n  *:after {\n    box-sizing: inherit;\n  }\n\n  svg {\n    ", "\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.font.family;
}, function (_a) {
    var theme = _a.theme;
    return theme.font.size;
}, function (_a) {
    var theme = _a.theme;
    return theme.font.color;
}, svg_styles_1.Style);
var templateObject_1;
//# sourceMappingURL=application-styles.js.map