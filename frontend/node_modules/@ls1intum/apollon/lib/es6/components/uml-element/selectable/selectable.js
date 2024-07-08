import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { UMLElementRepository } from '../../../services/uml-element/uml-element-repository';
const enhance = connect((state, props) => ({
    hovered: state.hovered[0] === props.id,
    selected: state.selected.includes(props.id),
}), {
    select: UMLElementRepository.select,
    deselect: UMLElementRepository.deselect,
});
export const selectable = (WrappedComponent) => {
    class Selectable extends Component {
        constructor() {
            super(...arguments);
            this.select = (event) => {
                if ((event.which && event.which !== 1) || !this.props.hovered) {
                    return;
                }
                if (event.shiftKey && this.props.selected) {
                    this.props.deselect(this.props.id);
                    return;
                }
                if (!this.props.selected) {
                    if (!event.shiftKey) {
                        this.props.deselect();
                    }
                    this.props.select(this.props.id);
                }
            };
        }
        componentDidMount() {
            const node = findDOMNode(this);
            node.addEventListener('pointerdown', this.select);
        }
        componentWillUnmount() {
            const node = findDOMNode(this);
            node.removeEventListener('pointerdown', this.select);
        }
        render() {
            const { hovered, selected, select, deselect, ...props } = this.props;
            return React.createElement(WrappedComponent, { ...props });
        }
    }
    return enhance(Selectable);
};
//# sourceMappingURL=selectable.js.map