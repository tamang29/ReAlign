"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLCommunicationLinkUpdate = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var button_1 = require("../../../components/controls/button/button");
var divider_1 = require("../../../components/controls/divider/divider");
var arrow_left_1 = require("../../../components/controls/icon/arrow-left");
var arrow_right_1 = require("../../../components/controls/icon/arrow-right");
var trash_1 = require("../../../components/controls/icon/trash");
var textfield_1 = require("../../../components/controls/textfield/textfield");
var typography_1 = require("../../../components/controls/typography/typography");
var localized_1 = require("../../../components/i18n/localized");
var styles_1 = require("../../../components/theme/styles");
var uml_element_repository_1 = require("../../../services/uml-element/uml-element-repository");
var uml_relationship_repository_1 = require("../../../services/uml-relationship/uml-relationship-repository");
var uuid_1 = require("../../../utils/uuid");
var uml_communiction_link_message_1 = require("./uml-communiction-link-message");
var color_button_1 = require("../../../components/controls/color-button/color-button");
var style_pane_1 = require("../../../components/style-pane/style-pane");
var Flex = styles_1.styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n"], ["\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n"])));
var getInitialState = function () { return ({
    fieldToFocus: undefined,
    colorOpen: false,
}); };
var CommunicationLinkUpdate = /** @class */ (function (_super) {
    tslib_1.__extends(CommunicationLinkUpdate, _super);
    function CommunicationLinkUpdate() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.state = getInitialState();
        _this.newCommunicationLinkField = (0, react_1.createRef)();
        _this.messageRefs = [];
        _this.toggleColor = function () {
            _this.setState(function (state) { return ({
                colorOpen: !state.colorOpen,
            }); });
        };
        _this.create = function (value) {
            var _a = _this.props, element = _a.element, update = _a.update;
            if (!element.messages.find(function (message) { return message.name === value; })) {
                update(element.id, {
                    messages: tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(element.messages), false), [new uml_communiction_link_message_1.CommunicationLinkMessage({ id: (0, uuid_1.uuid)(), name: value, direction: 'source' })], false),
                });
            }
        };
        _this.rename = function (value) { return function (name) {
            var _a = _this.props, element = _a.element, update = _a.update;
            var messages = tslib_1.__spreadArray([], tslib_1.__read(element.messages), false);
            var index = messages.findIndex(function (message) { return message.name === value.name; });
            messages[index].name = name;
            update(element.id, { messages: messages });
        }; };
        _this.flip = function (value) { return function () {
            var _a = _this.props, element = _a.element, update = _a.update;
            var messages = tslib_1.__spreadArray([], tslib_1.__read(element.messages), false);
            var index = messages.findIndex(function (message) { return message.name === value.name; });
            messages[index].direction = messages[index].direction === 'source' ? 'target' : 'source';
            update(element.id, { messages: messages });
        }; };
        _this.delete = function (value) { return function () {
            var _a = _this.props, element = _a.element, update = _a.update;
            update(element.id, {
                messages: element.messages.filter(function (message) { return message.name !== value.name; }),
            });
        }; };
        return _this;
    }
    CommunicationLinkUpdate.prototype.componentDidMount = function () {
        this.setState({ fieldToFocus: this.newCommunicationLinkField.current });
    };
    CommunicationLinkUpdate.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) {
        if (this.state.fieldToFocus) {
            this.state.fieldToFocus.focus();
            this.setState({ fieldToFocus: undefined });
        }
    };
    CommunicationLinkUpdate.prototype.render = function () {
        var _this = this;
        var _a = this.props, element = _a.element, getById = _a.getById;
        var source = element.source && getById(element.source.element);
        var target = element.target && getById(element.target.element);
        if (!source || !target)
            return null;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("section", null,
                react_1.default.createElement(Flex, null,
                    react_1.default.createElement(typography_1.Header, { gutter: false }, this.props.translate('packages.CommunicationDiagram.CommunicationLink')),
                    react_1.default.createElement(color_button_1.ColorButton, { onClick: this.toggleColor }),
                    react_1.default.createElement(button_1.Button, { color: "link", onClick: function () { return _this.props.delete(element.id); } },
                        react_1.default.createElement(trash_1.TrashIcon, null))),
                react_1.default.createElement(style_pane_1.StylePane, { open: this.state.colorOpen, element: element, onColorChange: this.props.update, lineColor: true, textColor: true }),
                react_1.default.createElement(divider_1.Divider, null)),
            react_1.default.createElement("section", null,
                react_1.default.createElement(typography_1.Header, null,
                    this.props.translate('popup.messages'),
                    " (",
                    react_1.default.createElement("small", null,
                        source.name,
                        " \u27F6 ",
                        target.name),
                    ")"),
                element.messages.map(function (message, i) { return (react_1.default.createElement(Flex, { key: message.id },
                    react_1.default.createElement(textfield_1.Textfield, { ref: function (ref) { return (_this.messageRefs[i] = ref); }, gutter: true, value: message.name, onChange: _this.rename(message), onSubmitKeyUp: function () {
                            var _a;
                            return i === element.messages.length - 1
                                ? (_a = _this.newCommunicationLinkField.current) === null || _a === void 0 ? void 0 : _a.focus()
                                : _this.setState({
                                    fieldToFocus: _this.messageRefs[i + 1],
                                });
                        } }),
                    react_1.default.createElement(button_1.Button, { color: "link", tabIndex: -1, onClick: _this.flip(message) }, message.direction === 'source' ? react_1.default.createElement(arrow_right_1.ArrowRightIcon, null) : react_1.default.createElement(arrow_left_1.ArrowLeftIcon, null)),
                    react_1.default.createElement(button_1.Button, { color: "link", tabIndex: -1, onClick: _this.delete(message) },
                        react_1.default.createElement(trash_1.TrashIcon, null)))); }),
                react_1.default.createElement(textfield_1.Textfield, { ref: this.newCommunicationLinkField, outline: true, value: "", onSubmit: this.create, onSubmitKeyUp: function () {
                        return _this.setState({
                            fieldToFocus: _this.newCommunicationLinkField.current,
                        });
                    }, onKeyDown: function (event) {
                        // workaround when 'tab' key is pressed:
                        // prevent default and execute blur manually without switching to next tab index
                        // then set focus to newCommunicationLink field again (componentDidUpdate)
                        if (event.key === 'Tab' && event.currentTarget.value) {
                            event.preventDefault();
                            event.currentTarget.blur();
                            _this.setState({
                                fieldToFocus: _this.newCommunicationLinkField.current,
                            });
                        }
                    } }))));
    };
    return CommunicationLinkUpdate;
}(react_1.Component));
var enhance = (0, redux_1.compose)(localized_1.localized, (0, react_redux_1.connect)(null, {
    update: uml_element_repository_1.UMLElementRepository.update,
    delete: uml_element_repository_1.UMLElementRepository.delete,
    flip: uml_relationship_repository_1.UMLRelationshipRepository.flip,
    getById: uml_element_repository_1.UMLElementRepository.getById,
}));
exports.UMLCommunicationLinkUpdate = enhance(CommunicationLinkUpdate);
var templateObject_1;
//# sourceMappingURL=uml-communication-link-update.js.map