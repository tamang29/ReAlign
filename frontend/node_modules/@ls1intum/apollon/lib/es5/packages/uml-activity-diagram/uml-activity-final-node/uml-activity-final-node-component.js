"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLActivityFinalNodeComponent = exports.UMLActivityFinalNodeC = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var styles_1 = require("../../../components/theme/styles");
var redux_1 = require("redux");
var react_redux_1 = require("react-redux");
var themedComponents_1 = require("../../../components/theme/themedComponents");
var enhance = (0, redux_1.compose)(styles_1.withTheme, (0, react_redux_1.connect)(function (state, props) { return ({
    interactive: state.interactive.includes(props.element.id),
    interactable: state.editor.view === "Exporting" /* ApollonView.Exporting */ || state.editor.view === "Highlight" /* ApollonView.Highlight */,
}); }));
var UMLActivityFinalNodeC = function (_a) {
    var element = _a.element, interactive = _a.interactive, interactable = _a.interactable, theme = _a.theme;
    return (react_1.default.createElement("g", null,
        react_1.default.createElement(themedComponents_1.ThemedCircle, { cx: "50%", cy: "50%", r: Math.min(element.bounds.width, element.bounds.height) / 2 - 2.5, strokeColor: interactable && interactive ? theme.interactive.normal : element.fillColor, strokeWidth: 5 }),
        react_1.default.createElement(themedComponents_1.ThemedCircleContrast, { cx: "50%", cy: "50%", r: Math.min(element.bounds.width, element.bounds.height) / 2 - 7.5, strokeColor: "none", fillColor: interactive && interactable ? theme.interactive.normal : element.fillColor, fillOpacity: 1 })));
};
exports.UMLActivityFinalNodeC = UMLActivityFinalNodeC;
exports.UMLActivityFinalNodeComponent = enhance(exports.UMLActivityFinalNodeC);
//# sourceMappingURL=uml-activity-final-node-component.js.map