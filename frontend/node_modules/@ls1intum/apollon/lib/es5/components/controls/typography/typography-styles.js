"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Typography = void 0;
var tslib_1 = require("tslib");
var styles_1 = require("../../theme/styles");
exports.Typography = styles_1.styled.p(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  margin-top: 0;\n\n  ", "\n\n  ", "\n\n  ", "\n"], ["\n  margin-top: 0;\n\n  ", "\n\n  ", "\n\n  ", "\n"])), function (props) {
    return props.variant === 'header' && (0, styles_1.css)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n      font-size: 1.25em;\n      font-weight: 500;\n      line-height: 1.2;\n      margin-bottom: 0.5em;\n    "], ["\n      font-size: 1.25em;\n      font-weight: 500;\n      line-height: 1.2;\n      margin-bottom: 0.5em;\n    "])));
}, function (props) {
    return props.variant === 'body' && (0, styles_1.css)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n      margin-bottom: 1em;\n    "], ["\n      margin-bottom: 1em;\n    "])));
}, function (props) {
    return !props.gutter && (0, styles_1.css)(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n      margin-bottom: 0;\n    "], ["\n      margin-bottom: 0;\n    "])));
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=typography-styles.js.map