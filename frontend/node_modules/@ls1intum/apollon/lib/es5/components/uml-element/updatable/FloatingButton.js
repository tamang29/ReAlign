"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloatingButton = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var styles_1 = require("../../theme/styles");
var FloatingButtonContainer = styles_1.styled.g.attrs(function (props) { return (tslib_1.__assign({}, props)); })(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  transition: all 180ms ease-in-out;\n  pointer-events: all;\n\n  path {\n    pointer-events: all;\n    fill: var(--apollon-primary-contrast);\n  }\n  rect {\n    pointer-events: all;\n    fill: var(--apollon-background);\n    stroke: var(--apollon-gray);\n  }\n  :hover {\n    transform: translate(0px, -30px);\n  }\n  :active {\n    transform: translate(0px, -30px);\n  }\n  :hover rect {\n    fill: var(--apollon-gray);\n    stroke: var(--apollon-gray-variant);\n  }\n  :active rect {\n    fill: var(--apollon-gray);\n    stroke: var(--apollon-gray-variant);\n  }\n"], ["\n  transition: all 180ms ease-in-out;\n  pointer-events: all;\n\n  path {\n    pointer-events: all;\n    fill: var(--apollon-primary-contrast);\n  }\n  rect {\n    pointer-events: all;\n    fill: var(--apollon-background);\n    stroke: var(--apollon-gray);\n  }\n  :hover {\n    transform: translate(0px, -30px);\n  }\n  :active {\n    transform: translate(0px, -30px);\n  }\n  :hover rect {\n    fill: var(--apollon-gray);\n    stroke: var(--apollon-gray-variant);\n  }\n  :active rect {\n    fill: var(--apollon-gray);\n    stroke: var(--apollon-gray-variant);\n  }\n"])));
var FloatingButton = function (_a) {
    var children = _a.children, props = tslib_1.__rest(_a, ["children"]);
    return (react_1.default.createElement(FloatingButtonContainer, tslib_1.__assign({}, props),
        react_1.default.createElement("rect", { height: 30, width: 30, rx: "0.25rem", ry: "0.25rem" }),
        children));
};
exports.FloatingButton = FloatingButton;
var templateObject_1;
//# sourceMappingURL=FloatingButton.js.map