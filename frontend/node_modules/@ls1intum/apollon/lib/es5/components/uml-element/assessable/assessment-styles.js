"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarningIcon = exports.FeedbackIcon = exports.WrongIcon = exports.CorrectIcon = exports.Triangle = exports.Container = exports.ICON_SIZE = void 0;
var tslib_1 = require("tslib");
var check_1 = require("../../controls/icon/check");
var exclamation_1 = require("../../controls/icon/exclamation");
var times_1 = require("../../controls/icon/times");
var styles_1 = require("../../theme/styles");
exports.ICON_SIZE = 24;
exports.Container = styles_1.styled.circle.attrs(function (props) { return ({
    r: exports.ICON_SIZE / 2 + 4,
    fillOpacity: 0.8,
    fill: props.theme.color.gray,
}); })(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""])));
exports.Triangle = styles_1.styled.polygon.attrs(function (props) { return ({
    points: '-10,8 0,-10 10,8',
    fill: props.theme.color.warningYellow,
}); })(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject([""], [""])));
var icon = {
    x: -exports.ICON_SIZE / 2,
    y: -exports.ICON_SIZE / 2,
    width: exports.ICON_SIZE,
    height: exports.ICON_SIZE,
};
var smallIcon = {
    x: -exports.ICON_SIZE / 4,
    y: -exports.ICON_SIZE / 4 + 1,
    width: exports.ICON_SIZE / 2,
    height: exports.ICON_SIZE / 2,
};
exports.CorrectIcon = (0, styles_1.styled)(check_1.CheckIcon).attrs(icon)(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  fill: green;\n"], ["\n  fill: green;\n"])));
exports.WrongIcon = (0, styles_1.styled)(times_1.TimesIcon).attrs(icon)(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  fill: red;\n"], ["\n  fill: red;\n"])));
exports.FeedbackIcon = (0, styles_1.styled)(exclamation_1.ExclamationIcon).attrs(icon)(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n  fill: blue;\n"], ["\n  fill: blue;\n"])));
exports.WarningIcon = (0, styles_1.styled)(exclamation_1.ExclamationIcon).attrs(smallIcon)(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n  fill: black;\n"], ["\n  fill: black;\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=assessment-styles.js.map