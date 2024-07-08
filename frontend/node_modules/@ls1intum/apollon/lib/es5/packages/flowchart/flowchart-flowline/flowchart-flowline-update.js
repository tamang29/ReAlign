"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowchartFlowlineUpdate = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var styled_components_1 = tslib_1.__importDefault(require("styled-components"));
var button_1 = require("../../../components/controls/button/button");
var color_button_1 = require("../../../components/controls/color-button/color-button");
var divider_1 = require("../../../components/controls/divider/divider");
var exchange_1 = require("../../../components/controls/icon/exchange");
var trash_1 = require("../../../components/controls/icon/trash");
var textfield_1 = require("../../../components/controls/textfield/textfield");
var typography_1 = require("../../../components/controls/typography/typography");
var localized_1 = require("../../../components/i18n/localized");
var style_pane_1 = require("../../../components/style-pane/style-pane");
var uml_element_repository_1 = require("../../../services/uml-element/uml-element-repository");
var uml_relationship_repository_1 = require("../../../services/uml-relationship/uml-relationship-repository");
var Flex = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n"], ["\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n"])));
var FlowchartFlowlineUpdateComponent = /** @class */ (function (_super) {
    tslib_1.__extends(FlowchartFlowlineUpdateComponent, _super);
    function FlowchartFlowlineUpdateComponent() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.state = { colorOpen: false };
        _this.toggleColor = function () {
            _this.setState(function (state) { return ({
                colorOpen: !state.colorOpen,
            }); });
        };
        _this.rename = function (name) {
            _this.props.update(_this.props.element.id, { name: name });
        };
        return _this;
    }
    FlowchartFlowlineUpdateComponent.prototype.render = function () {
        var _this = this;
        var element = this.props.element;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("section", null,
                react_1.default.createElement(Flex, null,
                    react_1.default.createElement(typography_1.Header, { gutter: false, style: { flexGrow: 1 } }, this.props.translate('packages.Flowchart.FlowchartFlowline')),
                    react_1.default.createElement(color_button_1.ColorButton, { onClick: this.toggleColor }),
                    react_1.default.createElement(button_1.Button, { color: "link", onClick: function () { return _this.props.flip(element.id); } },
                        react_1.default.createElement(exchange_1.ExchangeIcon, null)),
                    react_1.default.createElement(button_1.Button, { color: "link", onClick: function () { return _this.props.delete(element.id); } },
                        react_1.default.createElement(trash_1.TrashIcon, null))),
                react_1.default.createElement(style_pane_1.StylePane, { open: this.state.colorOpen, element: element, onColorChange: this.props.update, lineColor: true, textColor: true }),
                react_1.default.createElement(divider_1.Divider, null)),
            react_1.default.createElement("section", null,
                react_1.default.createElement(textfield_1.Textfield, { value: element.name, onChange: this.rename, autoFocus: true }))));
    };
    return FlowchartFlowlineUpdateComponent;
}(react_1.Component));
var enhance = (0, redux_1.compose)(localized_1.localized, (0, react_redux_1.connect)(null, {
    update: uml_element_repository_1.UMLElementRepository.update,
    delete: uml_element_repository_1.UMLElementRepository.delete,
    flip: uml_relationship_repository_1.UMLRelationshipRepository.flip,
}));
exports.FlowchartFlowlineUpdate = enhance(FlowchartFlowlineUpdateComponent);
var templateObject_1;
//# sourceMappingURL=flowchart-flowline-update.js.map