"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNGroupComponent = exports.BPMNGroupC = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var themedComponents_1 = require("../../../components/theme/themedComponents");
var multiline_1 = require("../../../utils/svg/multiline");
var styles_1 = require("../../../components/theme/styles");
var redux_1 = require("redux");
var react_redux_1 = require("react-redux");
var enhance = (0, redux_1.compose)(styles_1.withTheme, (0, react_redux_1.connect)(function (state, props) { return ({
    hovered: state.hovered.includes(props.element.id),
    interactive: state.interactive.includes(props.element.id),
    interactable: state.editor.view === "Exporting" /* ApollonView.Exporting */ || state.editor.view === "Highlight" /* ApollonView.Highlight */,
}); }));
var BPMNGroupC = function (_a) {
    var element = _a.element, strokeColor = _a.strokeColor, textColor = _a.textColor, children = _a.children, interactive = _a.interactive, interactable = _a.interactable, hovered = _a.hovered, theme = _a.theme;
    return (react_1.default.createElement("g", null,
        react_1.default.createElement(themedComponents_1.ThemedRect, { rx: 10, ry: 10, width: "100%", height: "100%", strokeColor: strokeColor || element.strokeColor, fillColor: interactable && interactive
                ? theme.interactive.normal
                : interactable && hovered
                    ? theme.interactive.hovered
                    : 'transparent', strokeDasharray: "4" }),
        react_1.default.createElement(multiline_1.Multiline, { x: element.bounds.width / 2, y: element.bounds.height / 2, width: element.bounds.width, height: element.bounds.height, fontWeight: "bold", fill: textColor || element.textColor, lineHeight: 16, capHeight: 11 }, element.name),
        children));
};
exports.BPMNGroupC = BPMNGroupC;
exports.BPMNGroupComponent = enhance(exports.BPMNGroupC);
//# sourceMappingURL=bpmn-group-component.js.map