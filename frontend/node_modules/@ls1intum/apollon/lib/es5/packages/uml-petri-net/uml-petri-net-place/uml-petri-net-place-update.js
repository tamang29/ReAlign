"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLPetriNetPlaceUpdate = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var button_1 = require("../../../components/controls/button/button");
var divider_1 = require("../../../components/controls/divider/divider");
var trash_1 = require("../../../components/controls/icon/trash");
var textfield_1 = require("../../../components/controls/textfield/textfield");
var localized_1 = require("../../../components/i18n/localized");
var styles_1 = require("../../../components/theme/styles");
var uml_element_repository_1 = require("../../../services/uml-element/uml-element-repository");
var typography_1 = require("../../../components/controls/typography/typography");
var infinite_1 = require("../../../components/controls/icon/infinite");
var color_button_1 = require("../../../components/controls/color-button/color-button");
var style_pane_1 = require("../../../components/style-pane/style-pane");
var enhance = (0, redux_1.compose)(localized_1.localized, (0, react_redux_1.connect)(null, {
    update: uml_element_repository_1.UMLElementRepository.update,
    delete: uml_element_repository_1.UMLElementRepository.delete,
}));
var Flex = styles_1.styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n"], ["\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n"])));
var UmlPetriNetPlaceUpdateComponent = /** @class */ (function (_super) {
    tslib_1.__extends(UmlPetriNetPlaceUpdateComponent, _super);
    function UmlPetriNetPlaceUpdateComponent() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.state = { colorOpen: false };
        _this.toggleColor = function () {
            _this.setState(function (state) { return ({
                colorOpen: !state.colorOpen,
            }); });
        };
        _this.rename = function (id) { return function (value) {
            _this.props.update(id, { name: value });
        }; };
        _this.changeTokenAmount = function (id) { return function (value) {
            _this.props.update(id, { amountOfTokens: value });
        }; };
        _this.changeCapacity = function (id) { return function (value) {
            _this.props.update(id, { capacity: value });
        }; };
        _this.delete = function (id) { return function () {
            _this.props.delete(id);
        }; };
        return _this;
    }
    UmlPetriNetPlaceUpdateComponent.prototype.render = function () {
        var _this = this;
        var element = this.props.element;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("section", null,
                react_1.default.createElement(Flex, null,
                    react_1.default.createElement(textfield_1.Textfield, { value: element.name, onChange: this.rename(element.id), autoFocus: true }),
                    react_1.default.createElement(color_button_1.ColorButton, { onClick: this.toggleColor }),
                    react_1.default.createElement(button_1.Button, { color: "link", tabIndex: -1, onClick: this.delete(element.id) },
                        react_1.default.createElement(trash_1.TrashIcon, null))),
                react_1.default.createElement(style_pane_1.StylePane, { open: this.state.colorOpen, element: element, onColorChange: this.props.update, lineColor: true, textColor: true, fillColor: true }),
                react_1.default.createElement(divider_1.Divider, null)),
            react_1.default.createElement("section", null,
                react_1.default.createElement(Flex, null,
                    react_1.default.createElement(typography_1.Body, { style: { marginRight: '0.5em', minWidth: '70px' } }, this.props.translate('popup.tokens')),
                    react_1.default.createElement(textfield_1.Textfield, { style: { minWidth: 0 }, value: element.amountOfTokens, type: "number", onChange: this.changeTokenAmount(element.id) }))),
            react_1.default.createElement("section", null,
                react_1.default.createElement(Flex, { style: { marginTop: '0.5em', alignItems: 'center' } },
                    react_1.default.createElement(typography_1.Body, { style: { marginRight: '0.5em', minWidth: '70px' } }, this.props.translate('popup.capacity')),
                    react_1.default.createElement("div", { style: { position: 'relative' } },
                        react_1.default.createElement(textfield_1.Textfield, { value: element.capacity, type: "number", onChange: this.changeCapacity(element.id) }),
                        !isFinite(element.capacity) && (react_1.default.createElement(infinite_1.InfiniteIcon, { style: { position: 'absolute', top: '25%', left: '5%' }, key: element.capacity }))),
                    react_1.default.createElement(button_1.Button, { color: "link", type: "reset", tabIndex: -1, onClick: function (event) { return _this.changeCapacity(element.id)(Number.POSITIVE_INFINITY); } },
                        react_1.default.createElement(infinite_1.InfiniteIcon, null))))));
    };
    return UmlPetriNetPlaceUpdateComponent;
}(react_1.Component));
exports.UMLPetriNetPlaceUpdate = enhance(UmlPetriNetPlaceUpdateComponent);
var templateObject_1;
//# sourceMappingURL=uml-petri-net-place-update.js.map