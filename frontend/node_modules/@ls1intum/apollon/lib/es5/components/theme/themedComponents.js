"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemedLine = exports.ThemedEllipse = exports.ThemedCircleContrast = exports.ThemedCircle = exports.ThemedRectContrast = exports.ThemedRect = exports.ThemedPathContrast = exports.ThemedPath = exports.ThemedPolyline = void 0;
var tslib_1 = require("tslib");
var styles_1 = require("./styles");
exports.ThemedPolyline = styles_1.styled.polyline.attrs(function (props) { return ({
    fillColor: props.fillColor,
    strokeColor: props.strokeColor,
    stroke: props.strokeColor || 'black',
    fill: props.fillColor || 'white',
}); })(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  fill: ", ";\n  stroke: ", ";\n"], ["\n  fill: ", ";\n  stroke: ", ";\n"])), function (props) { return props.fillColor || props.theme.color.background; }, function (props) { return props.strokeColor || props.theme.color.primaryContrast; });
exports.ThemedPath = styles_1.styled.path.attrs(function (props) { return ({
    fillColor: props.fillColor,
    strokeColor: props.strokeColor,
    stroke: props.strokeColor || 'black',
    fill: props.fillColor || 'white',
}); })(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  fill: ", ";\n  stroke: ", ";\n"], ["\n  fill: ", ";\n  stroke: ", ";\n"])), function (props) { return props.fillColor || props.theme.color.background; }, function (props) { return props.strokeColor || props.theme.color.primaryContrast; });
exports.ThemedPathContrast = styles_1.styled.path.attrs(function (props) { return ({
    fillColor: props.fillColor,
    strokeColor: props.strokeColor,
    stroke: props.strokeColor || 'white',
    fill: props.fillColor || 'black',
}); })(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  fill: ", ";\n  stroke: ", ";\n"], ["\n  fill: ", ";\n  stroke: ", ";\n"])), function (props) { return props.fillColor || props.theme.color.primaryContrast; }, function (props) { return props.strokeColor || props.theme.color.background; });
exports.ThemedRect = styles_1.styled.rect.attrs(function (props) { return ({
    fillColor: props.fillColor,
    strokeColor: props.strokeColor,
    stroke: props.strokeColor || 'black',
    fill: props.fillColor || 'white',
}); })(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  fill: ", ";\n  stroke: ", ";\n"], ["\n  fill: ", ";\n  stroke: ", ";\n"])), function (props) { return props.fillColor || props.theme.color.background; }, function (props) { return props.strokeColor || props.theme.color.primaryContrast; });
exports.ThemedRectContrast = styles_1.styled.rect.attrs(function (props) { return ({
    fillColor: props.fillColor,
    strokeColor: props.strokeColor,
    stroke: props.strokeColor || 'white',
    fill: props.fillColor || 'black',
}); })(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n  fill: ", ";\n  stroke: ", ";\n"], ["\n  fill: ", ";\n  stroke: ", ";\n"])), function (props) { return props.fillColor || props.theme.color.primaryContrast; }, function (props) { return props.strokeColor || props.theme.color.background; });
exports.ThemedCircle = styles_1.styled.circle.attrs(function (props) { return ({
    fillColor: props.fillColor,
    strokeColor: props.strokeColor,
    stroke: props.strokeColor || 'black',
    fill: props.fillColor || 'white',
}); })(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n  fill: ", ";\n  stroke: ", ";\n"], ["\n  fill: ", ";\n  stroke: ", ";\n"])), function (props) { return props.fillColor || props.theme.color.background; }, function (props) { return props.strokeColor || props.theme.color.primaryContrast; });
exports.ThemedCircleContrast = styles_1.styled.circle.attrs(function (props) { return ({
    fillColor: props.fillColor,
    strokeColor: props.strokeColor,
    stroke: props.strokeColor || 'white',
    fill: props.fillColor || 'black',
}); })(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["\n  fill: ", ";\n  stroke: ", ";\n"], ["\n  fill: ", ";\n  stroke: ", ";\n"])), function (props) { return props.fillColor || props.theme.color.primaryContrast; }, function (props) { return props.strokeColor || props.theme.color.background; });
exports.ThemedEllipse = styles_1.styled.ellipse.attrs(function (props) { return ({
    fillColor: props.fillColor,
    strokeColor: props.strokeColor,
    stroke: props.strokeColor || 'black',
    fill: props.fillColor || 'white',
}); })(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["\n  fill: ", ";\n  stroke: ", ";\n"], ["\n  fill: ", ";\n  stroke: ", ";\n"])), function (props) { return props.fillColor || props.theme.color.background; }, function (props) { return props.strokeColor || props.theme.color.primaryContrast; });
exports.ThemedLine = styles_1.styled.line.attrs(function (props) { return ({
    strokeColor: props.strokeColor,
    stroke: props.strokeColor || 'black',
}); })(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["\n  stroke: ", ";\n"], ["\n  stroke: ", ";\n"])), function (props) { return props.strokeColor || props.theme.color.primaryContrast; });
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
//# sourceMappingURL=themedComponents.js.map