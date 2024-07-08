import React, { Component } from 'react';
import { Droppable as DragDroppable } from '../../draggable/droppable';
export const droppable = (WrappedComponent) => {
    return class Droppable extends Component {
        render() {
            return (React.createElement(DragDroppable, { owner: this.props.id },
                React.createElement(WrappedComponent, { ...this.props })));
        }
    };
};
//# sourceMappingURL=droppable.js.map