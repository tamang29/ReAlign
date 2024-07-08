"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StylePane = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var uml_element_repository_1 = require("../../services/uml-element/uml-element-repository");
var with_canvas_1 = require("../canvas/with-canvas");
var localized_1 = require("../i18n/localized");
var color_selector_1 = require("./color-selector");
var style_pane_styles_1 = require("./style-pane-styles");
var getInitialState = function () { return ({
    fillSelectOpen: false,
    strokeSelectOpen: false,
    textSelectOpen: false,
}); };
var enhance = (0, redux_1.compose)(localized_1.localized, with_canvas_1.withCanvas, (0, react_redux_1.connect)(function (state) { return ({
    type: state.diagram.type,
    selected: state.selected,
    elements: state.elements,
}); }, {
    updateStart: uml_element_repository_1.UMLElementRepository.updateStart,
    update: uml_element_repository_1.UMLElementRepository.update,
    updateEnd: uml_element_repository_1.UMLElementRepository.updateEnd,
}));
var StylePaneComponent = /** @class */ (function (_super) {
    tslib_1.__extends(StylePaneComponent, _super);
    function StylePaneComponent() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.state = getInitialState();
        _this.handleFillColorChange = function (color) {
            var _a = _this.props, element = _a.element, onColorChange = _a.onColorChange;
            onColorChange(element.id, { fillColor: color });
        };
        _this.handleLineColorChange = function (color) {
            var _a = _this.props, element = _a.element, onColorChange = _a.onColorChange;
            onColorChange(element.id, { strokeColor: color });
        };
        _this.handleTextColorChange = function (color) {
            var _a = _this.props, element = _a.element, onColorChange = _a.onColorChange;
            onColorChange(element.id, { textColor: color });
        };
        _this.toggleFillSelect = function () {
            _this.setState(function (prevState) { return ({
                fillSelectOpen: !prevState.fillSelectOpen,
                strokeSelectOpen: false,
                textSelectOpen: false,
            }); });
        };
        _this.toggleLineSelect = function () {
            _this.setState(function (prevState) { return ({
                strokeSelectOpen: !prevState.strokeSelectOpen,
                fillSelectOpen: false,
                textSelectOpen: false,
            }); });
        };
        _this.toggleTextSelect = function () {
            _this.setState(function (prevState) { return ({
                textSelectOpen: !prevState.textSelectOpen,
                strokeSelectOpen: false,
                fillSelectOpen: false,
            }); });
        };
        return _this;
    }
    StylePaneComponent.prototype.render = function () {
        var _a = this.state, fillSelectOpen = _a.fillSelectOpen, strokeSelectOpen = _a.strokeSelectOpen, textSelectOpen = _a.textSelectOpen;
        var _b = this.props, open = _b.open, element = _b.element, fillColor = _b.fillColor, lineColor = _b.lineColor, textColor = _b.textColor;
        var noneOpen = !fillSelectOpen && !strokeSelectOpen && !textSelectOpen;
        if (!open)
            return null;
        return (react_1.default.createElement(style_pane_styles_1.Container, null,
            react_1.default.createElement(ColorRow, { title: "Fill Color", condition: fillColor && (fillSelectOpen || noneOpen), color: element === null || element === void 0 ? void 0 : element.fillColor, open: fillSelectOpen, onToggle: this.toggleFillSelect, onColorChange: this.handleFillColorChange, noDivider: !textColor && !lineColor }),
            react_1.default.createElement(ColorRow, { title: "Line Color", condition: lineColor && (strokeSelectOpen || noneOpen), color: element === null || element === void 0 ? void 0 : element.strokeColor, open: strokeSelectOpen, onToggle: this.toggleLineSelect, onColorChange: this.handleLineColorChange, noDivider: !textColor }),
            react_1.default.createElement(ColorRow, { title: "Text Color", condition: textColor && (textSelectOpen || noneOpen), color: element === null || element === void 0 ? void 0 : element.textColor, open: textSelectOpen, onToggle: this.toggleTextSelect, onColorChange: this.handleTextColorChange, noDivider: true })));
    };
    return StylePaneComponent;
}(react_1.Component));
var ColorRow = function (_a) {
    var condition = _a.condition, title = _a.title, open = _a.open, onToggle = _a.onToggle, onColorChange = _a.onColorChange, color = _a.color, noDivider = _a.noDivider;
    if (!condition)
        return null;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(style_pane_styles_1.Row, null,
            react_1.default.createElement("span", null, title),
            react_1.default.createElement(style_pane_styles_1.Color, { color: color, selected: open, onClick: onToggle })),
        react_1.default.createElement(color_selector_1.ColorSelector, { open: open, color: color, onColorChange: onColorChange, key: title }),
        !open && !noDivider ? react_1.default.createElement(style_pane_styles_1.Divider, null) : null));
};
exports.StylePane = enhance(StylePaneComponent);
//# sourceMappingURL=style-pane.js.map