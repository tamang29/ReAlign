import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { UMLElementRepository } from '../../../services/uml-element/uml-element-repository';
import { UMLContainer } from '../../../services/uml-container/uml-container';
const enhance = connect((state, props) => {
    return {
        // cannot emmit hover events when the selection box is active
        // or (any object is moving and the object is not a UMLContainer)
        cannotBeHovered: state.editor.selectionBoxActive ||
            (state.moving.length > 0 && !UMLContainer.isUMLContainer(state.elements[props.id])),
    };
}, {
    hover: UMLElementRepository.hover,
    leave: UMLElementRepository.leave,
});
export const hoverable = (WrappedComponent) => {
    class Hoverable extends Component {
        constructor() {
            super(...arguments);
            this.enter = (event) => {
                if (!this.props.cannotBeHovered)
                    this.props.hover(this.props.id);
                event.stopPropagation();
            };
            this.leave = (event) => {
                if (!this.props.cannotBeHovered)
                    this.props.leave(this.props.id);
                event.stopPropagation();
            };
        }
        componentDidMount() {
            const node = findDOMNode(this);
            node.addEventListener('pointerenter', this.enter);
            node.addEventListener('pointerleave', this.leave);
        }
        componentWillUnmount() {
            const node = findDOMNode(this);
            node.removeEventListener('pointerenter', this.enter);
            node.removeEventListener('pointerleave', this.leave);
        }
        render() {
            const { hover, leave, cannotBeHovered, ...props } = this.props;
            return React.createElement(WrappedComponent, { ...props });
        }
    }
    return enhance(Hoverable);
};
//# sourceMappingURL=hoverable.js.map