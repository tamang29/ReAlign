"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLActivityInitialNodeComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var styles_1 = require("../../../components/theme/styles");
var themedComponents_1 = require("../../../components/theme/themedComponents");
var enhance = (0, redux_1.compose)(styles_1.withTheme, (0, react_redux_1.connect)(function (state, props) { return ({
    interactive: state.interactive.includes(props.element.id),
    interactable: state.editor.view === "Exporting" /* ApollonView.Exporting */ || state.editor.view === "Highlight" /* ApollonView.Highlight */,
}); }));
var UMLActivityInitialNodeC = function (_a) {
    var element = _a.element, interactive = _a.interactive, interactable = _a.interactable, theme = _a.theme;
    return (react_1.default.createElement("g", null,
        react_1.default.createElement(themedComponents_1.ThemedCircleContrast, { cx: "50%", cy: "50%", r: Math.min(element.bounds.width, element.bounds.height) / 2, strokeColor: "none", fillColor: interactive && interactable ? theme.interactive.normal : element.fillColor, fillOpacity: 1 })));
};
exports.UMLActivityInitialNodeComponent = enhance(UMLActivityInitialNodeC);
//# sourceMappingURL=uml-activity-initial-node-component.js.map