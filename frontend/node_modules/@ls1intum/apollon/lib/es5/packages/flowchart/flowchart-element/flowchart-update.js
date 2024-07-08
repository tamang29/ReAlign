"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enhance = exports.FlowchartUpdateComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var button_1 = require("../../../components/controls/button/button");
var color_button_1 = require("../../../components/controls/color-button/color-button");
var trash_1 = require("../../../components/controls/icon/trash");
var textfield_1 = require("../../../components/controls/textfield/textfield");
var localized_1 = require("../../../components/i18n/localized");
var style_pane_1 = require("../../../components/style-pane/style-pane");
var styles_1 = require("../../../components/theme/styles");
var uml_element_repository_1 = require("../../../services/uml-element/uml-element-repository");
var Flex = styles_1.styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n"], ["\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n"])));
var FlowchartUpdateComponent = /** @class */ (function (_super) {
    tslib_1.__extends(FlowchartUpdateComponent, _super);
    function FlowchartUpdateComponent() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.state = { colorOpen: false };
        _this.toggleColor = function () {
            _this.setState(function (state) { return ({
                colorOpen: !state.colorOpen,
            }); });
        };
        _this.onUpdate = function (name) {
            var _a = _this.props, element = _a.element, update = _a.update;
            update(element.id, { name: name });
        };
        return _this;
    }
    FlowchartUpdateComponent.prototype.render = function () {
        var _this = this;
        var element = this.props.element;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("section", null,
                react_1.default.createElement(Flex, null,
                    react_1.default.createElement(textfield_1.Textfield, { value: element.name, placeholder: this.props.translate('packages.Flowchart.FlowchartDecision'), onChange: this.onUpdate, autoFocus: true }),
                    react_1.default.createElement(color_button_1.ColorButton, { onClick: this.toggleColor }),
                    react_1.default.createElement(button_1.Button, { color: "link", tabIndex: -1, onClick: function () { return _this.props.delete(element.id); } },
                        react_1.default.createElement(trash_1.TrashIcon, null)))),
            react_1.default.createElement(style_pane_1.StylePane, { open: this.state.colorOpen, element: element, onColorChange: this.props.update, lineColor: true, textColor: true, fillColor: true })));
    };
    return FlowchartUpdateComponent;
}(react_1.Component));
exports.FlowchartUpdateComponent = FlowchartUpdateComponent;
exports.enhance = (0, redux_1.compose)(localized_1.localized, (0, react_redux_1.connect)(null, {
    update: uml_element_repository_1.UMLElementRepository.update,
    delete: uml_element_repository_1.UMLElementRepository.delete,
}));
var templateObject_1;
//# sourceMappingURL=flowchart-update.js.map