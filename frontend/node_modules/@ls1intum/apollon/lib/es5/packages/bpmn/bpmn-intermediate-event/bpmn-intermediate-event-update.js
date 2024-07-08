"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNIntermediateEventUpdate = void 0;
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
var dropdown_1 = require("../../../components/controls/dropdown/dropdown");
var style_pane_1 = require("../../../components/style-pane/style-pane");
var color_button_1 = require("../../../components/controls/color-button/color-button");
var enhance = (0, redux_1.compose)(localized_1.localized, (0, react_redux_1.connect)(null, {
    update: uml_element_repository_1.UMLElementRepository.update,
    delete: uml_element_repository_1.UMLElementRepository.delete,
}));
var Flex = styles_1.styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n"], ["\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n"])));
var BPMNIntermediateEventUpdateComponent = /** @class */ (function (_super) {
    tslib_1.__extends(BPMNIntermediateEventUpdateComponent, _super);
    function BPMNIntermediateEventUpdateComponent() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.state = { colorOpen: false };
        _this.toggleColor = function () {
            _this.setState(function (state) { return ({
                colorOpen: !state.colorOpen,
            }); });
        };
        /**
         * Rename the event
         * @param id The ID of the event that should be renamed
         */
        _this.rename = function (id) { return function (value) {
            _this.props.update(id, { name: value });
        }; };
        /**
         * Change the type of the event
         * @param id The ID of the event whose type should be changed
         */
        _this.changeEventType = function (id) { return function (value) {
            _this.props.update(id, { eventType: value });
        }; };
        /**
         * Delete an event
         * @param id The ID of the event that should be deleted
         */
        _this.delete = function (id) { return function () {
            _this.props.delete(id);
        }; };
        return _this;
    }
    BPMNIntermediateEventUpdateComponent.prototype.render = function () {
        var element = this.props.element;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("section", null,
                react_1.default.createElement(Flex, null,
                    react_1.default.createElement(textfield_1.Textfield, { value: element.name, onChange: this.rename(element.id), autoFocus: true }),
                    react_1.default.createElement(color_button_1.ColorButton, { onClick: this.toggleColor }),
                    react_1.default.createElement(button_1.Button, { color: "link", tabIndex: -1, onClick: this.delete(element.id) },
                        react_1.default.createElement(trash_1.TrashIcon, null)))),
            react_1.default.createElement("section", null,
                react_1.default.createElement(style_pane_1.StylePane, { open: this.state.colorOpen, element: element, onColorChange: this.props.update, lineColor: true, textColor: true, fillColor: true })),
            react_1.default.createElement("section", null,
                react_1.default.createElement(divider_1.Divider, null),
                react_1.default.createElement(dropdown_1.Dropdown, { value: element.eventType, onChange: this.changeEventType(element.id) },
                    react_1.default.createElement(dropdown_1.Dropdown.Item, { value: 'default' }, this.props.translate('packages.BPMN.BPMNIntermediateEvent')),
                    react_1.default.createElement(dropdown_1.Dropdown.Item, { value: 'message-catch' }, this.props.translate('packages.BPMN.BPMNMessageIntermediateCatchEvent')),
                    react_1.default.createElement(dropdown_1.Dropdown.Item, { value: 'message-throw' }, this.props.translate('packages.BPMN.BPMNMessageIntermediateThrowEvent')),
                    react_1.default.createElement(dropdown_1.Dropdown.Item, { value: 'timer-catch' }, this.props.translate('packages.BPMN.BPMNTimerIntermediateCatchEvent')),
                    react_1.default.createElement(dropdown_1.Dropdown.Item, { value: 'escalation-throw' }, this.props.translate('packages.BPMN.BPMNEscalationIntermediateThrowEvent')),
                    react_1.default.createElement(dropdown_1.Dropdown.Item, { value: 'conditional-catch' }, this.props.translate('packages.BPMN.BPMNConditionalIntermediateCatchEvent')),
                    react_1.default.createElement(dropdown_1.Dropdown.Item, { value: 'link-catch' }, this.props.translate('packages.BPMN.BPMNLinkIntermediateCatchEvent')),
                    react_1.default.createElement(dropdown_1.Dropdown.Item, { value: 'link-throw' }, this.props.translate('packages.BPMN.BPMNLinkIntermediateThrowEvent')),
                    react_1.default.createElement(dropdown_1.Dropdown.Item, { value: 'compensation-throw' }, this.props.translate('packages.BPMN.BPMNCompensationIntermediateThrowEvent')),
                    react_1.default.createElement(dropdown_1.Dropdown.Item, { value: 'signal-catch' }, this.props.translate('packages.BPMN.BPMNSignalIntermediateCatchEvent')),
                    react_1.default.createElement(dropdown_1.Dropdown.Item, { value: 'signal-throw' }, this.props.translate('packages.BPMN.BPMNSignalIntermediateThrowEvent'))))));
    };
    return BPMNIntermediateEventUpdateComponent;
}(react_1.Component));
exports.BPMNIntermediateEventUpdate = enhance(BPMNIntermediateEventUpdateComponent);
var templateObject_1;
//# sourceMappingURL=bpmn-intermediate-event-update.js.map