"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssessmentDropInfoTooltip = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var button_1 = require("../controls/button/button");
var link_1 = require("../controls/icon/link");
var trash_1 = require("../controls/icon/trash");
var react_tooltip_1 = tslib_1.__importDefault(require("react-tooltip"));
var assessment_repository_1 = require("../../services/assessment/assessment-repository");
var redux_1 = require("redux");
var localized_1 = require("../i18n/localized");
var react_redux_1 = require("react-redux");
var enhance = (0, redux_1.compose)(localized_1.localized, (0, react_redux_1.connect)(null, { assess: assessment_repository_1.AssessmentRepository.assess }));
var initialState = Object.freeze({
    showLinkIcon: true,
});
var AssessmentDropInfoTooltipComponent = /** @class */ (function (_super) {
    tslib_1.__extends(AssessmentDropInfoTooltipComponent, _super);
    function AssessmentDropInfoTooltipComponent() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.state = initialState;
        _this.toggle = function () {
            _this.setState({ showLinkIcon: !_this.state.showLinkIcon });
        };
        _this.removeLink = function () {
            var _a = _this.props, element = _a.element, assessment = _a.assessment;
            _this.props.assess(element.id, tslib_1.__assign({}, assessment), 'MANUAL');
        };
        return _this;
    }
    AssessmentDropInfoTooltipComponent.prototype.render = function () {
        var _a = this.props, assessment = _a.assessment, readonly = _a.readonly;
        var message = assessment === null || assessment === void 0 ? void 0 : assessment.dropInfo.tooltipMessage;
        return (react_1.default.createElement("div", null,
            readonly ? (react_1.default.createElement(button_1.Button, { color: "link", tabIndex: -1, "data-tip": true, "data-for": "tooltip" },
                react_1.default.createElement(link_1.LinkIcon, null))) : this.state.showLinkIcon ? (react_1.default.createElement(button_1.Button, { color: "link", tabIndex: -1, "data-tip": true, "data-for": "tooltip", onClick: this.toggle },
                react_1.default.createElement(link_1.LinkIcon, null))) : (react_1.default.createElement(button_1.Button, { color: "link", tabIndex: -1, "data-tip": true, "data-for": "tooltip", onClick: this.removeLink, onMouseLeave: this.toggle },
                react_1.default.createElement(trash_1.TrashIcon, null))),
            react_1.default.createElement(react_tooltip_1.default, { id: "tooltip", place: "right", effect: "solid" }, this.state.showLinkIcon ? message : assessment === null || assessment === void 0 ? void 0 : assessment.dropInfo.removeMessage)));
    };
    return AssessmentDropInfoTooltipComponent;
}(react_1.Component));
exports.AssessmentDropInfoTooltip = enhance(AssessmentDropInfoTooltipComponent);
//# sourceMappingURL=assessment-dropInfo-tooltip.js.map