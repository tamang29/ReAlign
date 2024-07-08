"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLObjectNameUpdate = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var styled_components_1 = tslib_1.__importDefault(require("styled-components"));
var button_1 = require("../../../components/controls/button/button");
var color_button_1 = require("../../../components/controls/color-button/color-button");
var divider_1 = require("../../../components/controls/divider/divider");
var trash_1 = require("../../../components/controls/icon/trash");
var textfield_1 = require("../../../components/controls/textfield/textfield");
var typography_1 = require("../../../components/controls/typography/typography");
var localized_1 = require("../../../components/i18n/localized");
var style_pane_1 = require("../../../components/style-pane/style-pane");
var uml_element_repository_1 = require("../../../services/uml-element/uml-element-repository");
var not_empty_1 = require("../../../utils/not-empty");
var uml_object_attribute_1 = require("../uml-object-attribute/uml-object-attribute");
var uml_object_method_1 = require("../uml-object-method/uml-object-method");
var uml_classifier_attribute_update_1 = tslib_1.__importDefault(require("../../common/uml-classifier/uml-classifier-attribute-update"));
var Flex = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n"], ["\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n"])));
var getInitialState = function () { return ({
    fieldToFocus: undefined,
    colorOpen: false,
}); };
var ObjectNameComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ObjectNameComponent, _super);
    function ObjectNameComponent() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.state = getInitialState();
        _this.newMethodField = (0, react_1.createRef)();
        _this.newAttributeField = (0, react_1.createRef)();
        _this.toggleColor = function () {
            _this.setState(function (state) { return ({
                colorOpen: !state.colorOpen,
            }); });
        };
        _this.create = function (Clazz) { return function (value) {
            var _a = _this.props, element = _a.element, create = _a.create;
            var member = new Clazz();
            member.name = value;
            create(member, element.id);
        }; };
        _this.rename = function (id) { return function (name) {
            _this.props.update(id, { name: name });
        }; };
        _this.delete = function (id) { return function () {
            _this.props.delete(id);
        }; };
        return _this;
    }
    ObjectNameComponent.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) {
        if (this.state.fieldToFocus) {
            this.state.fieldToFocus.focus();
            this.setState({ fieldToFocus: undefined });
        }
    };
    ObjectNameComponent.prototype.render = function () {
        var _this = this;
        var _a = this.props, element = _a.element, getById = _a.getById;
        var children = element.ownedElements.map(function (id) { return getById(id); }).filter(not_empty_1.notEmpty);
        var attributes = children.filter(function (child) { return child instanceof uml_object_attribute_1.UMLObjectAttribute; });
        var methods = children.filter(function (child) { return child instanceof uml_object_method_1.UMLObjectMethod; });
        var attributeRefs = [];
        var methodRefs = [];
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("section", null,
                react_1.default.createElement(Flex, null,
                    react_1.default.createElement(textfield_1.Textfield, { value: element.name, onChange: this.rename(element.id), autoFocus: true }),
                    react_1.default.createElement(color_button_1.ColorButton, { onClick: this.toggleColor }),
                    react_1.default.createElement(button_1.Button, { color: "link", tabIndex: -1, onClick: this.delete(element.id) },
                        react_1.default.createElement(trash_1.TrashIcon, null))),
                react_1.default.createElement(style_pane_1.StylePane, { open: this.state.colorOpen, element: element, onColorChange: this.props.update, fillColor: true, lineColor: true, textColor: true }),
                react_1.default.createElement(divider_1.Divider, null)),
            react_1.default.createElement("section", null,
                react_1.default.createElement(typography_1.Header, null, this.props.translate('popup.attributes')),
                attributes.map(function (attribute, index) { return (react_1.default.createElement(uml_classifier_attribute_update_1.default, { id: attribute.id, key: attribute.id, value: attribute.name, onChange: _this.props.update, onSubmitKeyUp: function () {
                        var _a;
                        return index === attributes.length - 1
                            ? (_a = _this.newAttributeField.current) === null || _a === void 0 ? void 0 : _a.focus()
                            : _this.setState({
                                fieldToFocus: attributeRefs[index + 1],
                            });
                    }, onDelete: _this.delete, onRefChange: function (ref) { return (attributeRefs[index] = ref); }, element: attribute })); }),
                react_1.default.createElement(textfield_1.Textfield, { ref: this.newAttributeField, outline: true, value: "", onSubmit: this.create(uml_object_attribute_1.UMLObjectAttribute), onSubmitKeyUp: function (key, value) {
                        // if we have a value -> navigate to next field in case we want to create a new element
                        if (value) {
                            _this.setState({
                                fieldToFocus: _this.newAttributeField.current,
                            });
                        }
                        else {
                            // if we submit with empty value -> focus next element (either next method field or newMethodfield)
                            if (methodRefs && methodRefs.length > 0) {
                                _this.setState({
                                    fieldToFocus: methodRefs[0],
                                });
                            }
                            else {
                                _this.setState({
                                    fieldToFocus: _this.newMethodField.current,
                                });
                            }
                        }
                    }, onKeyDown: function (event) {
                        // workaround when 'tab' key is pressed:
                        // prevent default and execute blur manually without switching to next tab index
                        // then set focus to newAttributeField field again (componentDidUpdate)
                        if (event.key === 'Tab' && event.currentTarget.value) {
                            event.preventDefault();
                            event.currentTarget.blur();
                            _this.setState({
                                fieldToFocus: _this.newAttributeField.current,
                            });
                        }
                    } })),
            react_1.default.createElement("section", null,
                react_1.default.createElement(divider_1.Divider, null),
                react_1.default.createElement(typography_1.Header, null, this.props.translate('popup.methods')),
                methods.map(function (method, index) { return (react_1.default.createElement(uml_classifier_attribute_update_1.default, { id: method.id, key: method.id, value: method.name, onChange: _this.props.update, onSubmitKeyUp: function () {
                        var _a;
                        return index === methods.length - 1
                            ? (_a = _this.newMethodField.current) === null || _a === void 0 ? void 0 : _a.focus()
                            : _this.setState({
                                fieldToFocus: methodRefs[index + 1],
                            });
                    }, onDelete: _this.delete, onRefChange: function (ref) { return (methodRefs[index] = ref); }, element: method })); }),
                react_1.default.createElement(textfield_1.Textfield, { ref: this.newMethodField, outline: true, value: "", onSubmit: this.create(uml_object_method_1.UMLObjectMethod), onSubmitKeyUp: function () {
                        return _this.setState({
                            fieldToFocus: _this.newMethodField.current,
                        });
                    }, onKeyDown: function (event) {
                        // workaround when 'tab' key is pressed:
                        // prevent default and execute blur manually without switching to next tab index
                        // then set focus to newMethodField field again (componentDidUpdate)
                        if (event.key === 'Tab' && event.currentTarget.value) {
                            event.preventDefault();
                            event.currentTarget.blur();
                            _this.setState({
                                fieldToFocus: _this.newMethodField.current,
                            });
                        }
                    } }))));
    };
    return ObjectNameComponent;
}(react_1.Component));
var enhance = (0, redux_1.compose)(localized_1.localized, (0, react_redux_1.connect)(null, {
    create: uml_element_repository_1.UMLElementRepository.create,
    update: uml_element_repository_1.UMLElementRepository.update,
    delete: uml_element_repository_1.UMLElementRepository.delete,
    getById: uml_element_repository_1.UMLElementRepository.getById,
}));
exports.UMLObjectNameUpdate = enhance(ObjectNameComponent);
var templateObject_1;
//# sourceMappingURL=uml-object-name-update.js.map