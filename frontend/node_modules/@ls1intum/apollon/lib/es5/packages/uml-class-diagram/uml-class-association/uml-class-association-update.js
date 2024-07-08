"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLClassAssociationUpdate = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var __1 = require("..");
var button_1 = require("../../../components/controls/button/button");
var color_button_1 = require("../../../components/controls/color-button/color-button");
var divider_1 = require("../../../components/controls/divider/divider");
var dropdown_1 = require("../../../components/controls/dropdown/dropdown");
var exchange_1 = require("../../../components/controls/icon/exchange");
var trash_1 = require("../../../components/controls/icon/trash");
var textfield_1 = require("../../../components/controls/textfield/textfield");
var typography_1 = require("../../../components/controls/typography/typography");
var localized_1 = require("../../../components/i18n/localized");
var style_pane_1 = require("../../../components/style-pane/style-pane");
var styles_1 = require("../../../components/theme/styles");
var uml_element_repository_1 = require("../../../services/uml-element/uml-element-repository");
var uml_relationship_repository_1 = require("../../../services/uml-relationship/uml-relationship-repository");
var enhance = (0, redux_1.compose)(localized_1.localized, (0, react_redux_1.connect)(null, {
    update: uml_element_repository_1.UMLElementRepository.update,
    delete: uml_element_repository_1.UMLElementRepository.delete,
    flip: uml_relationship_repository_1.UMLRelationshipRepository.flip,
    getById: uml_element_repository_1.UMLElementRepository.getById,
}));
var Flex = styles_1.styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n"], ["\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n"])));
var ClassAssociationComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ClassAssociationComponent, _super);
    function ClassAssociationComponent() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.state = { colorOpen: false };
        _this.toggleColor = function () {
            _this.setState(function (state) { return ({
                colorOpen: !state.colorOpen,
            }); });
        };
        _this.onChange = function (type) {
            var _a = _this.props, element = _a.element, update = _a.update;
            update(element.id, { type: type });
        };
        _this.onUpdate = function (type, end) { return function (value) {
            var _a, _b;
            var _c = _this.props, element = _c.element, update = _c.update;
            update(element.id, (_a = {}, _a[end] = tslib_1.__assign(tslib_1.__assign({}, element[end]), (_b = {}, _b[type] = value, _b)), _a));
        }; };
        return _this;
    }
    ClassAssociationComponent.prototype.render = function () {
        var _this = this;
        var _a = this.props, element = _a.element, getById = _a.getById;
        var source = element.source && getById(element.source.element);
        var target = element.target && getById(element.target.element);
        if (!source || !target)
            return null;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("section", null,
                react_1.default.createElement(Flex, null,
                    react_1.default.createElement(typography_1.Header, { gutter: false, style: { flexGrow: 1 } }, this.props.translate('popup.association')),
                    react_1.default.createElement(color_button_1.ColorButton, { onClick: this.toggleColor }),
                    react_1.default.createElement(button_1.Button, { color: "link", onClick: function () { return _this.props.flip(element.id); } },
                        react_1.default.createElement(exchange_1.ExchangeIcon, null)),
                    react_1.default.createElement(button_1.Button, { color: "link", onClick: function () { return _this.props.delete(element.id); } },
                        react_1.default.createElement(trash_1.TrashIcon, null))),
                react_1.default.createElement(style_pane_1.StylePane, { open: this.state.colorOpen, element: element, onColorChange: this.props.update, lineColor: true, textColor: true }),
                react_1.default.createElement(divider_1.Divider, null)),
            react_1.default.createElement("section", null,
                react_1.default.createElement(dropdown_1.Dropdown, { value: element.type, onChange: this.onChange },
                    react_1.default.createElement(dropdown_1.Dropdown.Item, { value: __1.ClassRelationshipType.ClassAggregation }, this.props.translate('packages.ClassDiagram.ClassAggregation')),
                    react_1.default.createElement(dropdown_1.Dropdown.Item, { value: __1.ClassRelationshipType.ClassUnidirectional }, this.props.translate('packages.ClassDiagram.ClassUnidirectional')),
                    react_1.default.createElement(dropdown_1.Dropdown.Item, { value: __1.ClassRelationshipType.ClassBidirectional }, this.props.translate('packages.ClassDiagram.ClassBidirectional')),
                    react_1.default.createElement(dropdown_1.Dropdown.Item, { value: __1.ClassRelationshipType.ClassComposition }, this.props.translate('packages.ClassDiagram.ClassComposition')),
                    react_1.default.createElement(dropdown_1.Dropdown.Item, { value: __1.ClassRelationshipType.ClassDependency }, this.props.translate('packages.ClassDiagram.ClassDependency')),
                    react_1.default.createElement(dropdown_1.Dropdown.Item, { value: __1.ClassRelationshipType.ClassInheritance }, this.props.translate('packages.ClassDiagram.ClassInheritance')),
                    react_1.default.createElement(dropdown_1.Dropdown.Item, { value: __1.ClassRelationshipType.ClassRealization }, this.props.translate('packages.ClassDiagram.ClassRealization'))),
                react_1.default.createElement(divider_1.Divider, null)),
            react_1.default.createElement("section", null,
                react_1.default.createElement(typography_1.Header, null, source.name),
                react_1.default.createElement(Flex, null,
                    react_1.default.createElement(typography_1.Body, { style: { marginRight: '0.5em' } }, this.props.translate('popup.multiplicity')),
                    react_1.default.createElement(textfield_1.Textfield, { style: { minWidth: 0 }, gutter: true, value: element.source.multiplicity, onChange: this.onUpdate('multiplicity', 'source'), autoFocus: true })),
                react_1.default.createElement(Flex, null,
                    react_1.default.createElement(typography_1.Body, { style: { marginRight: '0.5em' } }, this.props.translate('popup.role')),
                    react_1.default.createElement(textfield_1.Textfield, { value: element.source.role, onChange: this.onUpdate('role', 'source') })),
                react_1.default.createElement(divider_1.Divider, null)),
            react_1.default.createElement("section", null,
                react_1.default.createElement(typography_1.Header, null, target.name),
                react_1.default.createElement(Flex, null,
                    react_1.default.createElement(typography_1.Body, { style: { marginRight: '0.5em' } }, this.props.translate('popup.multiplicity')),
                    react_1.default.createElement(textfield_1.Textfield, { style: { minWidth: 0 }, gutter: true, value: element.target.multiplicity, onChange: this.onUpdate('multiplicity', 'target') })),
                react_1.default.createElement(Flex, null,
                    react_1.default.createElement(typography_1.Body, { style: { marginRight: '0.5em' } }, this.props.translate('popup.role')),
                    react_1.default.createElement(textfield_1.Textfield, { value: element.target.role, onChange: this.onUpdate('role', 'target') })))));
    };
    return ClassAssociationComponent;
}(react_1.Component));
exports.UMLClassAssociationUpdate = enhance(ClassAssociationComponent);
var templateObject_1;
//# sourceMappingURL=uml-class-association-update.js.map