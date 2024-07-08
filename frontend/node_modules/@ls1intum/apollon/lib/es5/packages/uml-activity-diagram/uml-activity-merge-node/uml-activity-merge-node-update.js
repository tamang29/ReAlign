"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLActivityMergeNodeUpdate = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var button_1 = require("../../../components/controls/button/button");
var color_button_1 = require("../../../components/controls/color-button/color-button");
var divider_1 = require("../../../components/controls/divider/divider");
var arrow_right_1 = require("../../../components/controls/icon/arrow-right");
var textfield_1 = require("../../../components/controls/textfield/textfield");
var typography_1 = require("../../../components/controls/typography/typography");
var localized_1 = require("../../../components/i18n/localized");
var style_pane_1 = require("../../../components/style-pane/style-pane");
var styles_1 = require("../../../components/theme/styles");
var uml_element_repository_1 = require("../../../services/uml-element/uml-element-repository");
var uml_relationship_1 = require("../../../services/uml-relationship/uml-relationship");
var Flex = styles_1.styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n"], ["\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n"])));
var ActivityMergeNodeUpdate = /** @class */ (function (_super) {
    tslib_1.__extends(ActivityMergeNodeUpdate, _super);
    function ActivityMergeNodeUpdate() {
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
        _this.onUpdateOption = function (id) { return function (name) {
            var update = _this.props.update;
            update(id, { name: name });
        }; };
        return _this;
    }
    ActivityMergeNodeUpdate.prototype.render = function () {
        var _this = this;
        var _a = this.props, element = _a.element, decisions = _a.decisions, targets = _a.targets, update = _a.update;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("section", null,
                react_1.default.createElement(Flex, null,
                    react_1.default.createElement(textfield_1.Textfield, { value: element.name, onChange: this.onUpdate }),
                    react_1.default.createElement(color_button_1.ColorButton, { onClick: this.toggleColor })),
                react_1.default.createElement(style_pane_1.StylePane, { open: this.state.colorOpen, element: element, onColorChange: update, fillColor: true, lineColor: true, textColor: true })),
            react_1.default.createElement("section", null, decisions.length > 0 && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(divider_1.Divider, null),
                react_1.default.createElement(typography_1.Header, null, this.props.translate('popup.condition')),
                decisions.map(function (decision, i) { return (react_1.default.createElement(Flex, { key: decision.id },
                    react_1.default.createElement(textfield_1.Textfield, { gutter: i < decisions.length - 1, value: decision.name, onChange: _this.onUpdateOption(decision.id) }),
                    react_1.default.createElement(button_1.Button, { color: "link", disabled: true },
                        react_1.default.createElement(arrow_right_1.ArrowRightIcon, null)),
                    react_1.default.createElement(typography_1.Body, null, targets[i].name))); }))))));
    };
    return ActivityMergeNodeUpdate;
}(react_1.Component));
var enhance = (0, redux_1.compose)(localized_1.localized, (0, react_redux_1.connect)(function (state, props) {
    var decisions = Object.values(state.elements)
        .filter(function (x) { return uml_relationship_1.UMLRelationship.isUMLRelationship(x); })
        .filter(function (x) { return x.source.element === props.element.id; });
    return {
        decisions: decisions,
        targets: decisions.map(function (relationship) { return state.elements[relationship.target.element]; }),
    };
}, {
    update: uml_element_repository_1.UMLElementRepository.update,
    getById: uml_element_repository_1.UMLElementRepository.getById,
}));
exports.UMLActivityMergeNodeUpdate = enhance(ActivityMergeNodeUpdate);
var templateObject_1;
//# sourceMappingURL=uml-activity-merge-node-update.js.map