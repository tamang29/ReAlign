import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { UMLElementRepository } from '../../services/uml-element/uml-element-repository';
import { Button } from '../controls/button/button';
import { AssessmentSection } from './assessment-section';
const getInitialState = ({ element, getChildren }) => ({
    elements: getChildren(element.id),
});
const enhance = connect(null, {
    getChildren: UMLElementRepository.getChildren,
    assessNext: (current) => (dispatch, getState) => {
        const { elements } = getState();
        const children = dispatch(UMLElementRepository.getChildren(current.id));
        const last = children.length ? children[children.length - 1] : current;
        const index = Object.keys(elements).indexOf(last.id) + 1;
        const next = Object.keys(elements)[index % Object.keys(elements).length];
        dispatch(UMLElementRepository.updateEnd(current.id));
        dispatch(UMLElementRepository.deselect(current.id));
        dispatch(UMLElementRepository.updateStart(next));
        dispatch(UMLElementRepository.select(next));
    },
});
class AssessmentComponent extends Component {
    constructor() {
        super(...arguments);
        this.state = getInitialState(this.props);
        this.container = createRef();
        this.setFocus = () => {
            if (!this.container.current) {
                return;
            }
            const focusable = this.container.current.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (focusable) {
                focusable.focus();
            }
        };
        this.onKey = (event) => {
            if (event.key === 'Enter') {
                if (event.type === 'keydown') {
                    event.preventDefault();
                }
                else {
                    this.next();
                }
            }
        };
        this.next = () => {
            const { assessNext, element } = this.props;
            assessNext(element);
        };
    }
    componentDidMount() {
        this.setFocus();
    }
    componentDidUpdate(props) {
        if (props.element !== this.props.element) {
            this.setState(getInitialState(this.props), this.setFocus);
        }
    }
    render() {
        const { elements } = this.state;
        return (React.createElement("div", { ref: this.container, id: "modeling-assessment-container" },
            elements.map((element) => (React.createElement(AssessmentSection, { key: element.id, element: element }))),
            React.createElement("section", null,
                React.createElement(Button, { block: true, outline: true, color: "primary", onClick: this.next, onKeyDown: this.onKey, onKeyUp: this.onKey }, "Next Assessment"))));
    }
}
export const Assessment = enhance(AssessmentComponent);
//# sourceMappingURL=assessment.js.map