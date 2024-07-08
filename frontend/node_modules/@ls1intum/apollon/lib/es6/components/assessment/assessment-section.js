import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { AssessmentRepository } from '../../services/assessment/assessment-repository';
import { Divider } from '../controls/divider/divider';
import { Textfield } from '../controls/textfield/textfield';
import { TrashIcon } from '../controls/icon/trash';
import { HelpIcon } from '../controls/icon/help';
import { Button } from '../controls/button/button';
import { Header } from '../controls/typography/typography';
import { localized } from '../i18n/localized';
import { styled } from '../theme/styles';
import { UMLElementRepository } from '../../services/uml-element/uml-element-repository';
import { AssessmentDropInfoTooltip } from './assessment-dropInfo-tooltip';
import ReactTooltip from 'react-tooltip';
const Flex = styled.div `
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;
const Action = styled.span `
  margin-top: 10px;
  font-size: 12px;
`;
const Badge = styled.div `
  color: white;
  background-color: ${(props) => props.color || 'grey'};
  text-align: center;
  margin: 0.4rem auto 0 auto;
  padding: 0.25em 0.4em;
  border-radius: 0.15rem;
  font-size: 12px;
  font-weight: bold;
`;
const enhance = compose(localized, connect((state, props) => ({
    readonly: state.editor.readonly,
    assessment: AssessmentRepository.getById(state.assessments)(props.element.id),
    diagramType: state.diagram.type,
}), {
    assess: AssessmentRepository.assess,
    delete: AssessmentRepository.delete,
    updateEndAll: UMLElementRepository.updateEndAll,
}));
class AssessmentSectionComponent extends Component {
    constructor() {
        super(...arguments);
        this.updateScore = (value) => {
            const { element, assessment } = this.props;
            const score = parseFloat(value) || 0;
            const newCorrectionStatus = {
                description: undefined,
                status: 'NOT_VALIDATED',
            };
            this.props.assess(element.id, {
                ...assessment,
                correctionStatus: newCorrectionStatus,
                score,
            });
        };
        this.updateFeedback = (value) => {
            const { element, assessment } = this.props;
            const feedback = value.length ? value : undefined;
            const assessmentType = assessment?.dropInfo ? 'DROPPED' : 'MANUAL';
            this.props.assess(element.id, { score: 0, ...assessment, feedback }, assessmentType);
        };
        this.deleteFeedback = () => {
            this.props.updateEndAll();
            this.props.delete(this.props.element.id);
        };
    }
    render() {
        const { element, assessment, readonly, diagramType } = this.props;
        return (React.createElement(React.Fragment, null,
            React.createElement("section", null,
                React.createElement(Header, null,
                    this.props.translate('assessment.assessment'),
                    ' ',
                    this.props.translate(`packages.${diagramType}.${element.type}`),
                    element.name ? (React.createElement(React.Fragment, null,
                        ' ',
                        React.createElement("span", { style: { display: 'inline-block' } }, `\"${element.name}\"`))) : ('')),
                assessment?.dropInfo ? (React.createElement(AssessmentDropInfoTooltip, { assessment: assessment, element: element, readonly: readonly })) : null),
            React.createElement("section", null,
                React.createElement(Flex, null,
                    React.createElement("span", { style: { marginRight: '0.5em' } },
                        this.props.translate('assessment.score'),
                        ":"),
                    readonly ? (React.createElement("span", null, (assessment && assessment.score) || '-')) : (React.createElement(Textfield, { gutter: true, type: "number", step: 0.5, onChange: this.updateScore, value: assessment ? String(assessment.score) : '' })),
                    !readonly ? (React.createElement(Button, { color: "link", onClick: this.deleteFeedback },
                        React.createElement(TrashIcon, null))) : null)),
            React.createElement("span", { style: { display: 'inline' } }, this.props.translate('assessment.feedback')),
            assessment?.dropInfo && assessment?.dropInfo.instruction ? (React.createElement("div", { style: { display: 'inline' } },
                React.createElement(Button, { color: "link", tabIndex: -1, "data-tip": true, "data-for": "tooltip-feedback-hint" },
                    React.createElement(HelpIcon, null)),
                React.createElement(ReactTooltip, { id: "tooltip-feedback-hint", place: "right", effect: "solid" }, assessment.dropInfo.feedbackHint),
                assessment.dropInfo.instruction.feedback)) : null,
            readonly ? (assessment && assessment.feedback && React.createElement("section", null, assessment.feedback)) : (React.createElement("section", null,
                React.createElement(Textfield, { multiline: true, placeholder: assessment?.dropInfo
                        ? this.props.translate('assessment.additionalFeedbackPlaceholder')
                        : this.props.translate('assessment.feedbackPlaceholder'), onChange: this.updateFeedback, enterToSubmit: false, value: assessment && assessment.feedback ? assessment.feedback : '' }),
                assessment?.label ? (React.createElement(Flex, null,
                    React.createElement(Badge, { color: assessment?.labelColor }, assessment?.label))) : null,
                element?.assessmentNote ? (React.createElement(Flex, null,
                    React.createElement(Action, null, element.assessmentNote))) : null,
                assessment?.correctionStatus?.description ? (React.createElement(Flex, null,
                    React.createElement("span", null, assessment.correctionStatus.description))) : null)),
            React.createElement(Divider, null)));
    }
}
export const AssessmentSection = enhance(AssessmentSectionComponent);
//# sourceMappingURL=assessment-section.js.map