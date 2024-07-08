import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { UMLElementRepository } from '../../../services/uml-element/uml-element-repository';
import { UMLRelationship } from '../../../services/uml-relationship/uml-relationship';
import { FloatingButton } from './FloatingButton';
import { EditIcon } from './icons/EditIcon';
import { DeleteIcon } from './icons/DeleteIcon';
import { UMLRelationshipRepository } from '../../../services/uml-relationship/uml-relationship-repository';
const initialState = {};
const enhance = connect((state, props) => ({
    hovered: state.hovered[0] === props.id,
    selected: state.selected.includes(props.id),
}), {
    updateStart: UMLElementRepository.updateStart,
    deleteElement: UMLElementRepository.delete,
    getElementById: UMLElementRepository.getById,
    getRelationshipById: UMLRelationshipRepository.getById,
});
export const updatable = (WrappedComponent) => {
    class Updatable extends Component {
        constructor() {
            super(...arguments);
            this.state = initialState;
            /**
             * Show the update dialog of the wrapped element
             */
            this.onStartUpdate = () => {
                this.props.updateStart(this.props.id);
            };
            /**
             * Show the delete dialog of the wrapped element
             */
            this.onDelete = () => {
                this.props.deleteElement(this.props.id);
            };
        }
        componentDidMount() {
            const node = findDOMNode(this);
            node.addEventListener('dblclick', this.onStartUpdate);
        }
        componentWillUnmount() {
            const node = findDOMNode(this);
            node.removeEventListener('dblclick', this.onStartUpdate);
        }
        /**
         * Determine the rightmost point in a path
         * @param path The path for which the rightmost point should be determined
         */
        findRightmostPoint(path) {
            let rightmostPoint = undefined;
            for (const currentPoint of path) {
                if (rightmostPoint === undefined || currentPoint.x > rightmostPoint.x) {
                    rightmostPoint = currentPoint;
                }
            }
            return rightmostPoint;
        }
        /**
         * Helper function to determine the base coordinates for the context actions
         * @param element The element for which the context action base coordinates should be determined
         */
        getContextActionBaseCoordinates(element) {
            const isRelationship = UMLRelationship.isUMLRelationship(element);
            if (!isRelationship) {
                return {
                    x: element.bounds.width,
                    y: -30,
                };
            }
            const relationship = element;
            const rightmostPoint = this.findRightmostPoint(relationship.path);
            return {
                x: (rightmostPoint?.x ?? 0) - 40,
                y: (rightmostPoint?.y ?? 0) - 30,
            };
        }
        render() {
            const { updateStart, deleteElement, getElementById, getRelationshipById, hovered, selected, ...props } = this.props;
            const element = getElementById(props.id);
            const relationship = getRelationshipById(props.id);
            const baseCoordinates = this.getContextActionBaseCoordinates((element || relationship));
            return (React.createElement(WrappedComponent, { ...props },
                React.createElement(FloatingButton, { style: {
                        opacity: selected ? 1 : 0,
                        transform: `translate(${baseCoordinates.x}px, ${selected ? baseCoordinates.y - 10 : baseCoordinates.y}px)`,
                    }, onClick: this.onStartUpdate },
                    React.createElement(EditIcon, { x: 7, y: 7 })),
                React.createElement(FloatingButton, { style: {
                        opacity: selected ? 1 : 0,
                        transform: `translate(${baseCoordinates.x}px, ${selected ? baseCoordinates.y - 50 : baseCoordinates.y}px)`,
                    }, onClick: this.onDelete },
                    React.createElement(DeleteIcon, { x: 7, y: 7 }))));
        }
    }
    return enhance(Updatable);
};
//# sourceMappingURL=updatable.js.map