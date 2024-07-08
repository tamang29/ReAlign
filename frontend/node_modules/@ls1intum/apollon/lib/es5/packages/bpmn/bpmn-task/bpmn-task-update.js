"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNTaskUpdate = void 0;
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
var switch_1 = require("../../../components/controls/switch/switch");
var bpmn_loop_marker_icon_1 = require("../common/markers/bpmn-loop-marker-icon");
var bpmn_parallel_marker_icon_1 = require("../common/markers/bpmn-parallel-marker-icon");
var bpmn_sequential_marker_icon_1 = require("../common/markers/bpmn-sequential-marker-icon");
var enhance = (0, redux_1.compose)(localized_1.localized, (0, react_redux_1.connect)(null, {
    update: uml_element_repository_1.UMLElementRepository.update,
    delete: uml_element_repository_1.UMLElementRepository.delete,
}));
var Flex = styles_1.styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n"], ["\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n"])));
var BPMNTaskUpdateComponent = /** @class */ (function (_super) {
    tslib_1.__extends(BPMNTaskUpdateComponent, _super);
    function BPMNTaskUpdateComponent() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.state = { colorOpen: false };
        _this.toggleColor = function () {
            _this.setState(function (state) { return ({
                colorOpen: !state.colorOpen,
            }); });
        };
        /**
         * Rename the task
         * @param id The ID of the task that should be renamed
         */
        _this.rename = function (id) { return function (value) {
            _this.props.update(id, { name: value });
        }; };
        /**
         * Change the type of the task
         * @param id The ID of the task whose type should be changed
         */
        _this.changeTaskType = function (id) { return function (value) {
            _this.props.update(id, { taskType: value });
        }; };
        /**
         * Change the marker of the task
         * @param id The ID of the task whose marker should be changed
         */
        _this.changeMarker = function (id) { return function (value) {
            if (_this.props.element.marker === value) {
                _this.props.update(id, { marker: 'none' });
                return;
            }
            _this.props.update(id, { marker: value });
        }; };
        /**
         * Delete a task
         * @param id The ID of the task that should be deleted
         */
        _this.delete = function (id) { return function () {
            _this.props.delete(id);
        }; };
        return _this;
    }
    BPMNTaskUpdateComponent.prototype.render = function () {
        var element = this.props.element;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("section", null,
                react_1.default.createElement(Flex, null,
                    react_1.default.createElement(textfield_1.Textfield, { value: element.name, onChange: this.rename(element.id), autoFocus: true }),
                    react_1.default.createElement(color_button_1.ColorButton, { onClick: this.toggleColor }),
                    react_1.default.createElement(button_1.Button, { color: "link", tabIndex: -1, onClick: this.delete(element.id) },
                        react_1.default.createElement(trash_1.TrashIcon, null))),
                react_1.default.createElement("section", null,
                    react_1.default.createElement(style_pane_1.StylePane, { open: this.state.colorOpen, element: element, onColorChange: this.props.update, lineColor: true, textColor: true, fillColor: true }))),
            react_1.default.createElement("section", null,
                react_1.default.createElement(divider_1.Divider, null),
                react_1.default.createElement(dropdown_1.Dropdown, { value: element.taskType, onChange: this.changeTaskType(element.id) },
                    react_1.default.createElement(dropdown_1.Dropdown.Item, { value: 'default' }, this.props.translate('packages.BPMN.BPMNTask')),
                    react_1.default.createElement(dropdown_1.Dropdown.Item, { value: 'user' }, this.props.translate('packages.BPMN.BPMNUserTask')),
                    react_1.default.createElement(dropdown_1.Dropdown.Item, { value: 'send' }, this.props.translate('packages.BPMN.BPMNSendTask')),
                    react_1.default.createElement(dropdown_1.Dropdown.Item, { value: 'receive' }, this.props.translate('packages.BPMN.BPMNReceiveTask')),
                    react_1.default.createElement(dropdown_1.Dropdown.Item, { value: 'manual' }, this.props.translate('packages.BPMN.BPMNManualTask')),
                    react_1.default.createElement(dropdown_1.Dropdown.Item, { value: 'business-rule' }, this.props.translate('packages.BPMN.BPMNBusinessRuleTask')),
                    react_1.default.createElement(dropdown_1.Dropdown.Item, { value: 'script' }, this.props.translate('packages.BPMN.BPMNScriptTask')))),
            react_1.default.createElement("section", null,
                react_1.default.createElement(divider_1.Divider, null),
                react_1.default.createElement(switch_1.Switch, { value: element.marker, onChange: this.changeMarker(element.id), color: "primary" },
                    react_1.default.createElement(switch_1.Switch.Item, { value: 'parallel multi instance' },
                        react_1.default.createElement(bpmn_parallel_marker_icon_1.BPMNParallelMarkerIcon, { stroke: "currentColor" })),
                    react_1.default.createElement(switch_1.Switch.Item, { value: 'sequential multi instance' },
                        react_1.default.createElement(bpmn_sequential_marker_icon_1.BPMNSequentialMarkerIcon, { stroke: "currentColor" })),
                    react_1.default.createElement(switch_1.Switch.Item, { value: 'loop' },
                        react_1.default.createElement(bpmn_loop_marker_icon_1.BpmnLoopMarkerIcon, { stroke: "currentColor" }))))));
    };
    return BPMNTaskUpdateComponent;
}(react_1.Component));
exports.BPMNTaskUpdate = enhance(BPMNTaskUpdateComponent);
var templateObject_1;
//# sourceMappingURL=bpmn-task-update.js.map