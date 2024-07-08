import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UMLRelationship } from '../../../services/uml-relationship/uml-relationship';
import { Path } from '../../../utils/geometry/path';
import { Point } from '../../../utils/geometry/point';
import { Container, CorrectIcon, FeedbackIcon, ICON_SIZE, Triangle, WarningIcon, WrongIcon } from './assessment-styles';
import { findDOMNode } from 'react-dom';
import { UMLElementRepository } from '../../../services/uml-element/uml-element-repository';
import { AssessmentRepository } from '../../../services/assessment/assessment-repository';
const enhance = connect((state, props) => {
    const element = state.elements[props.id];
    return {
        assessment: state.assessments[props.id],
        bounds: element.bounds,
        path: UMLRelationship.isUMLRelationship(element) ? element.path : undefined,
        readonly: state.editor.readonly,
    };
}, {
    select: UMLElementRepository.select,
    deselect: UMLElementRepository.deselect,
    assess: AssessmentRepository.assess,
    updateStart: UMLElementRepository.updateStart,
});
export const assessable = (WrappedComponent) => {
    class Assessable extends Component {
        constructor() {
            super(...arguments);
            // TODO: the following code is Artemis specific and should be refactored
            // TODO: extend the API so that external application can create a Apollon Draggable element
            // TODO: extend the API so that callbacks can be registered which should be called when a draggable element was dropped
            // TODO: the benefit of that would be, that we could remove the artemis specific code from apollon
            this.onDragOver = (ev) => {
                // prevent default to allow drop
                ev.preventDefault();
                // don't propagate to parents, so that most accurate element is selected only
                ev.stopPropagation();
                this.props.select(this.props.id);
            };
            this.onDragLeave = () => {
                this.props.deselect(this.props.id);
            };
            /**
             * Artemis instruction object can be dropped on assessment sections to automatically fill assessment
             * @param ev DropEvent
             */
            this.onDrop = (ev) => {
                // prevent default action (open as link for some elements)
                ev.preventDefault();
                // unselect current element
                this.props.deselect(this.props.id);
                // don't propagate to parents, so that most accurate element is selected only
                ev.stopPropagation();
                if (!!ev.dataTransfer) {
                    const data = ev.dataTransfer.getData('text/plain');
                    if (!data) {
                        // tslint:disable-next-line:no-console
                        console.warn('Could not get artemis sgi element from drop element');
                        return;
                    }
                    let instruction;
                    try {
                        instruction = JSON.parse(data);
                    }
                    catch (e) {
                        // tslint:disable-next-line:no-console
                        console.error('Could not parse artemis sgi', e);
                        return;
                    }
                    // TODO: following messages should be received from Artemis
                    const removeMessage = 'Do you want to remove the link to the assessment instruction?';
                    const tooltipMessage = 'Assessment Instruction: ' + instruction.instructionDescription;
                    const feedbackHint = 'This feedback is associated with the assessment instruction. You can provide additional feedback for this submission element. Student will see combined feedback during the review.';
                    const { id: elementId, assessment } = this.props;
                    const score = instruction.credits;
                    const dropInfo = { instruction, removeMessage, tooltipMessage, feedbackHint };
                    this.props.assess(elementId, { ...assessment, score, dropInfo }, 'DROPPED');
                    this.props.updateStart(elementId);
                }
            };
        }
        componentDidMount() {
            if (!this.props.readonly) {
                const node = findDOMNode(this);
                node.addEventListener('dragover', this.onDragOver.bind(this));
                node.addEventListener('dragleave', this.onDragLeave.bind(this));
                node.addEventListener('drop', this.onDrop.bind(this));
            }
        }
        componentWillUnmount() {
            const node = findDOMNode(this);
            node.removeEventListener('dragover', this.onDragOver);
            node.removeEventListener('dragleave', this.onDragLeave);
            node.removeEventListener('drop', this.onDrop);
        }
        render() {
            const { assessment, assess, select, deselect, updateStart, bounds, path: ipath, readonly, ...props } = this.props;
            let position;
            let assessmentWarningPosition;
            if (ipath) {
                const path = new Path(ipath);
                position = path.position(path.length / 2);
                assessmentWarningPosition = path.position(path.length / 2 - ICON_SIZE * 2);
            }
            else {
                position = new Point(bounds.width, 0);
                assessmentWarningPosition = new Point(position.x - ICON_SIZE * 2, position.y);
            }
            return (React.createElement(WrappedComponent, { ...props },
                assessment && assessment.correctionStatus && assessment.correctionStatus.status === 'INCORRECT' && (React.createElement("g", { transform: `translate(${assessmentWarningPosition.x} ${assessmentWarningPosition.y})`, pointerEvents: 'none' },
                    React.createElement(React.Fragment, null,
                        React.createElement(Container, null),
                        React.createElement(Triangle, null),
                        React.createElement(WarningIcon, null)))),
                assessment && (React.createElement("g", { transform: `translate(${position.x} ${position.y})`, pointerEvents: 'none' },
                    assessment.score === 0 && !!assessment.feedback && (React.createElement(React.Fragment, null,
                        React.createElement(Container, null),
                        React.createElement(FeedbackIcon, null))),
                    assessment.score > 0 && (React.createElement(React.Fragment, null,
                        React.createElement(Container, null),
                        React.createElement(CorrectIcon, null))),
                    assessment.score < 0 && (React.createElement(React.Fragment, null,
                        React.createElement(Container, null),
                        React.createElement(WrongIcon, null)))))));
        }
    }
    return enhance(Assessable);
};
//# sourceMappingURL=assessable.js.map