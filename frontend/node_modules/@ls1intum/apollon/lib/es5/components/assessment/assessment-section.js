"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssessmentSection = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var assessment_repository_1 = require("../../services/assessment/assessment-repository");
var divider_1 = require("../controls/divider/divider");
var textfield_1 = require("../controls/textfield/textfield");
var trash_1 = require("../controls/icon/trash");
var help_1 = require("../controls/icon/help");
var button_1 = require("../controls/button/button");
var typography_1 = require("../controls/typography/typography");
var localized_1 = require("../i18n/localized");
var styles_1 = require("../theme/styles");
var uml_element_repository_1 = require("../../services/uml-element/uml-element-repository");
var assessment_dropInfo_tooltip_1 = require("./assessment-dropInfo-tooltip");
var react_tooltip_1 = tslib_1.__importDefault(require("react-tooltip"));
var Flex = styles_1.styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n"], ["\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n"])));
var Action = styles_1.styled.span(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  margin-top: 10px;\n  font-size: 12px;\n"], ["\n  margin-top: 10px;\n  font-size: 12px;\n"])));
var Badge = styles_1.styled.div(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  color: white;\n  background-color: ", ";\n  text-align: center;\n  margin: 0.4rem auto 0 auto;\n  padding: 0.25em 0.4em;\n  border-radius: 0.15rem;\n  font-size: 12px;\n  font-weight: bold;\n"], ["\n  color: white;\n  background-color: ", ";\n  text-align: center;\n  margin: 0.4rem auto 0 auto;\n  padding: 0.25em 0.4em;\n  border-radius: 0.15rem;\n  font-size: 12px;\n  font-weight: bold;\n"])), function (props) { return props.color || 'grey'; });
var enhance = (0, redux_1.compose)(localized_1.localized, (0, react_redux_1.connect)(function (state, props) { return ({
    readonly: state.editor.readonly,
    assessment: assessment_repository_1.AssessmentRepository.getById(state.assessments)(props.element.id),
    diagramType: state.diagram.type,
}); }, {
    assess: assessment_repository_1.AssessmentRepository.assess,
    delete: assessment_repository_1.AssessmentRepository.delete,
    updateEndAll: uml_element_repository_1.UMLElementRepository.updateEndAll,
}));
var AssessmentSectionComponent = /** @class */ (function (_super) {
    tslib_1.__extends(AssessmentSectionComponent, _super);
    function AssessmentSectionComponent() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.updateScore = function (value) {
            var _a = _this.props, element = _a.element, assessment = _a.assessment;
            var score = parseFloat(value) || 0;
            var newCorrectionStatus = {
                description: undefined,
                status: 'NOT_VALIDATED',
            };
            _this.props.assess(element.id, tslib_1.__assign(tslib_1.__assign({}, assessment), { correctionStatus: newCorrectionStatus, score: score }));
        };
        _this.updateFeedback = function (value) {
            var _a = _this.props, element = _a.element, assessment = _a.assessment;
            var feedback = value.length ? value : undefined;
            var assessmentType = (assessment === null || assessment === void 0 ? void 0 : assessment.dropInfo) ? 'DROPPED' : 'MANUAL';
            _this.props.assess(element.id, tslib_1.__assign(tslib_1.__assign({ score: 0 }, assessment), { feedback: feedback }), assessmentType);
        };
        _this.deleteFeedback = function () {
            _this.props.updateEndAll();
            _this.props.delete(_this.props.element.id);
        };
        return _this;
    }
    AssessmentSectionComponent.prototype.render = function () {
        var _a;
        var _b = this.props, element = _b.element, assessment = _b.assessment, readonly = _b.readonly, diagramType = _b.diagramType;
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("section", null,
                react_1.default.createElement(typography_1.Header, null,
                    this.props.translate('assessment.assessment'),
                    ' ',
                    this.props.translate("packages.".concat(diagramType, ".").concat(element.type)),
                    element.name ? (react_1.default.createElement(react_1.default.Fragment, null,
                        ' ',
                        react_1.default.createElement("span", { style: { display: 'inline-block' } }, "\"".concat(element.name, "\"")))) : ('')),
                (assessment === null || assessment === void 0 ? void 0 : assessment.dropInfo) ? (react_1.default.createElement(assessment_dropInfo_tooltip_1.AssessmentDropInfoTooltip, { assessment: assessment, element: element, readonly: readonly })) : null),
            react_1.default.createElement("section", null,
                react_1.default.createElement(Flex, null,
                    react_1.default.createElement("span", { style: { marginRight: '0.5em' } },
                        this.props.translate('assessment.score'),
                        ":"),
                    readonly ? (react_1.default.createElement("span", null, (assessment && assessment.score) || '-')) : (react_1.default.createElement(textfield_1.Textfield, { gutter: true, type: "number", step: 0.5, onChange: this.updateScore, value: assessment ? String(assessment.score) : '' })),
                    !readonly ? (react_1.default.createElement(button_1.Button, { color: "link", onClick: this.deleteFeedback },
                        react_1.default.createElement(trash_1.TrashIcon, null))) : null)),
            react_1.default.createElement("span", { style: { display: 'inline' } }, this.props.translate('assessment.feedback')),
            (assessment === null || assessment === void 0 ? void 0 : assessment.dropInfo) && (assessment === null || assessment === void 0 ? void 0 : assessment.dropInfo.instruction) ? (react_1.default.createElement("div", { style: { display: 'inline' } },
                react_1.default.createElement(button_1.Button, { color: "link", tabIndex: -1, "data-tip": true, "data-for": "tooltip-feedback-hint" },
                    react_1.default.createElement(help_1.HelpIcon, null)),
                react_1.default.createElement(react_tooltip_1.default, { id: "tooltip-feedback-hint", place: "right", effect: "solid" }, assessment.dropInfo.feedbackHint),
                assessment.dropInfo.instruction.feedback)) : null,
            readonly ? (assessment && assessment.feedback && react_1.default.createElement("section", null, assessment.feedback)) : (react_1.default.createElement("section", null,
                react_1.default.createElement(textfield_1.Textfield, { multiline: true, placeholder: (assessment === null || assessment === void 0 ? void 0 : assessment.dropInfo)
                        ? this.props.translate('assessment.additionalFeedbackPlaceholder')
                        : this.props.translate('assessment.feedbackPlaceholder'), onChange: this.updateFeedback, enterToSubmit: false, value: assessment && assessment.feedback ? assessment.feedback : '' }),
                (assessment === null || assessment === void 0 ? void 0 : assessment.label) ? (react_1.default.createElement(Flex, null,
                    react_1.default.createElement(Badge, { color: assessment === null || assessment === void 0 ? void 0 : assessment.labelColor }, assessment === null || assessment === void 0 ? void 0 : assessment.label))) : null,
                (element === null || element === void 0 ? void 0 : element.assessmentNote) ? (react_1.default.createElement(Flex, null,
                    react_1.default.createElement(Action, null, element.assessmentNote))) : null,
                ((_a = assessment === null || assessment === void 0 ? void 0 : assessment.correctionStatus) === null || _a === void 0 ? void 0 : _a.description) ? (react_1.default.createElement(Flex, null,
                    react_1.default.createElement("span", null, assessment.correctionStatus.description))) : null)),
            react_1.default.createElement(divider_1.Divider, null)));
    };
    return AssessmentSectionComponent;
}(react_1.Component));
exports.AssessmentSection = enhance(AssessmentSectionComponent);
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=assessment-section.js.map