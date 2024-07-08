import { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { withDraggable } from './with-draggable';
import isMobile from 'is-mobile';
import { convertTouchEndIntoPointerUp } from '../../utils/touch-event';
const enhance = withDraggable;
class DraggableComponent extends Component {
    constructor() {
        super(...arguments);
        /**
         * connects drag start to drop event. After the promise of onDragStart is resolved -> the onDrop method given to this component is invoked
         * @param event pointer event which starts the dragging
         */
        this.onDragStart = async (event) => {
            try {
                const dropEvent = await this.props.onDragStart(event);
                if (this.props.onDrop) {
                    this.props.onDrop(dropEvent);
                }
            }
            catch (error) { }
        };
    }
    componentDidMount() {
        const node = findDOMNode(this);
        if (isMobile({ tablet: true })) {
            node.addEventListener('touchstart', this.onDragStart);
            node.addEventListener('touchend', convertTouchEndIntoPointerUp);
        }
        else {
            node.addEventListener('pointerdown', this.onDragStart);
        }
    }
    componentWillUnmount() {
        const node = findDOMNode(this);
        if (isMobile({ tablet: true })) {
            node.removeEventListener('touchstart', this.onDragStart);
        }
        else {
            node.removeEventListener('pointerdown', this.onDragStart);
        }
    }
    render() {
        return this.props.children;
    }
}
export const Draggable = enhance(DraggableComponent);
//# sourceMappingURL=draggable.js.map