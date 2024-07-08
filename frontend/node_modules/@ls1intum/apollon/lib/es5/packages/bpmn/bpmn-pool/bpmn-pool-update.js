"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPMNPoolUpdate = void 0;
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
var bpmn_swimlane_1 = require("../bpmn-swimlane/bpmn-swimlane");
var bpmn_pool_1 = require("./bpmn-pool");
var uuid_1 = require("../../../utils/uuid");
var not_empty_1 = require("../../../utils/not-empty");
var index_1 = require("../index");
var typography_1 = require("../../../components/controls/typography/typography");
var uml_classifier_attribute_update_1 = tslib_1.__importDefault(require("../../common/uml-classifier/uml-classifier-attribute-update"));
var color_button_1 = require("../../../components/controls/color-button/color-button");
var style_pane_1 = require("../../../components/style-pane/style-pane");
var enhance = (0, redux_1.compose)(localized_1.localized, (0, react_redux_1.connect)(null, {
    create: uml_element_repository_1.UMLElementRepository.create,
    update: uml_element_repository_1.UMLElementRepository.update,
    delete: uml_element_repository_1.UMLElementRepository.delete,
    getById: uml_element_repository_1.UMLElementRepository.getById,
}));
var Flex = styles_1.styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n"], ["\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n"])));
var BPMNPoolUpdateComponent = /** @class */ (function (_super) {
    tslib_1.__extends(BPMNPoolUpdateComponent, _super);
    function BPMNPoolUpdateComponent() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.state = { colorOpen: false };
        _this.newSwimlaneField = (0, react_1.createRef)();
        _this.toggleColor = function () {
            _this.setState(function (state) { return ({
                colorOpen: !state.colorOpen,
            }); });
        };
        /**
         * Rename the gateway
         * @param id The ID of the pool that should be renamed
         * @param name The name the pool should be renamed to
         */
        _this.rename = function (id, name) {
            _this.props.update(id, { name: name });
        };
        /**
         * Delete a pool
         * @param id The ID of the pool that should be deleted
         */
        _this.delete = function (id) {
            _this.props.delete(id);
        };
        /**
         * Insert a new lane into the pool. If there are already elements in the pool other than swimlanes, all existing
         * elements will be moved to the newly created swimlane.
         *
         * @param owner The ID of the pool into which a new swimlane should be inserted in.
         * @param name Optional name for the newly created swimlane.
         */
        _this.insertSwimlane = function (owner, name) {
            // We resolve all non-empty children of the current pool from the redux store
            var children = _this.props.element.ownedElements.map(function (id) { return _this.props.getById(id); }).filter(not_empty_1.notEmpty);
            // We then check if there is currently any direct children within the pool to determine whether we need to convert
            // the pool to a swimlane-based pool or if we just need to insert a new swimlane.
            var convertToSwimlaneBased = children.every(function (child) { return child.type !== index_1.BPMNElementType.BPMNSwimlane; });
            // We then create a new swimlane object. If the pool is converted, the transfer the pools children to the swimlane
            // and size the swimlane accordingly to fit all child elements.
            var swimlane = new bpmn_swimlane_1.BPMNSwimlane({
                id: (0, uuid_1.uuid)(),
                name: name !== null && name !== void 0 ? name : _this.props.translate('packages.BPMN.BPMNSwimlane'),
                bounds: {
                    x: bpmn_pool_1.BPMNPool.HEADER_WIDTH,
                    width: _this.props.element.bounds.width - bpmn_pool_1.BPMNPool.HEADER_WIDTH,
                    height: convertToSwimlaneBased ? _this.props.element.bounds.height : bpmn_swimlane_1.BPMNSwimlane.DEFAULT_HEIGHT,
                },
                ownedElements: convertToSwimlaneBased ? _this.props.element.ownedElements : [],
            });
            _this.props.create(swimlane, owner);
            // We then update the pool element and remove the child elements that have been transferred to the newly created
            // swim lane
            var pool = new bpmn_pool_1.BPMNPool(tslib_1.__assign(tslib_1.__assign({}, _this.props.element), { ownedElements: convertToSwimlaneBased ? [swimlane.id] : tslib_1.__spreadArray([swimlane.id], tslib_1.__read(_this.props.element.ownedElements), false) }));
            _this.props.update(owner, pool);
            // As the last step, all child elements that were transferred from the pool to a swimlane then have their owner
            // field set to the new swimlane element.
            if (convertToSwimlaneBased) {
                children.forEach(function (child) { return _this.props.update(child.id, { owner: swimlane.id }); });
            }
        };
        return _this;
    }
    BPMNPoolUpdateComponent.prototype.render = function () {
        var _this = this;
        var _a = this.props, element = _a.element, getById = _a.getById;
        var swimlaneRefs = [];
        var swimlanes = element.ownedElements
            .map(function (id) { return getById(id); })
            .filter(not_empty_1.notEmpty)
            .filter(function (element) { return element.type === index_1.BPMNElementType.BPMNSwimlane; });
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("section", null,
                react_1.default.createElement(Flex, null,
                    react_1.default.createElement(textfield_1.Textfield, { value: element.name, onChange: function (value) { return _this.rename(element.id, value); }, autoFocus: true }),
                    react_1.default.createElement(color_button_1.ColorButton, { onClick: this.toggleColor }),
                    react_1.default.createElement(button_1.Button, { color: "link", tabIndex: -1, onClick: function () { return _this.delete(element.id); } },
                        react_1.default.createElement(trash_1.TrashIcon, null)))),
            react_1.default.createElement("section", null,
                react_1.default.createElement(style_pane_1.StylePane, { open: this.state.colorOpen, element: element, onColorChange: this.props.update, lineColor: true, textColor: true, fillColor: true })),
            react_1.default.createElement("section", null,
                react_1.default.createElement(divider_1.Divider, null),
                react_1.default.createElement(typography_1.Header, null, this.props.translate('packages.BPMN.BPMNSwimlanes')),
                swimlanes.reverse().map(function (swimlane, index) { return (react_1.default.createElement(uml_classifier_attribute_update_1.default, { id: swimlane.id, key: swimlane.id, value: swimlane.name, onChange: _this.props.update, onSubmitKeyUp: function () {
                        var _a;
                        return index === swimlanes.length - 1
                            ? (_a = _this.newSwimlaneField.current) === null || _a === void 0 ? void 0 : _a.focus()
                            : _this.setState({
                                fieldToFocus: swimlaneRefs[index + 1],
                            });
                    }, onDelete: function (id) { return function () { return _this.delete(id); }; }, onRefChange: function (ref) { return (swimlaneRefs[index] = ref); }, element: swimlane })); }),
                react_1.default.createElement(textfield_1.Textfield, { ref: this.newSwimlaneField, outline: true, value: "", onSubmit: function (name) { return _this.insertSwimlane(element.id, name); }, onSubmitKeyUp: function () {
                        return _this.setState({
                            fieldToFocus: _this.newSwimlaneField.current,
                        });
                    }, onKeyDown: function (event) {
                        // workaround when 'tab' key is pressed:
                        // prevent default and execute blur manually without switching to next tab index
                        // then set focus to newMethodField field again (componentDidUpdate)
                        if (event.key === 'Tab' && event.currentTarget.value) {
                            event.preventDefault();
                            event.currentTarget.blur();
                            _this.setState({
                                fieldToFocus: _this.newSwimlaneField.current,
                            });
                        }
                    } }))));
    };
    return BPMNPoolUpdateComponent;
}(react_1.Component));
exports.BPMNPoolUpdate = enhance(BPMNPoolUpdateComponent);
var templateObject_1;
//# sourceMappingURL=bpmn-pool-update.js.map