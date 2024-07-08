import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { UMLElementRepository } from '../../../services/uml-element/uml-element-repository';
import { Point } from '../../../utils/geometry/point';
import isMobile from 'is-mobile';
import { getClientEventCoordinates } from '../../../utils/touch-event';
import { debounce } from '../../../utils/debounce';
const initialState = {
    offset: new Point(),
};
const enhance = connect((state, props) => ({
    movable: state.selected.includes(props.id) && !state.resizing.includes(props.id) && !state.connecting.length,
    moving: state.moving.includes(props.id),
    zoomFactor: state.editor.zoomFactor,
    selectionBoxActive: state.editor.selectionBoxActive,
}), {
    start: UMLElementRepository.startMoving,
    move: UMLElementRepository.move,
    end: UMLElementRepository.endMoving,
});
export const movable = (WrappedComponent) => {
    class Movable extends Component {
        constructor() {
            super(...arguments);
            this.state = initialState;
            this.moveWindow = { x: 0, y: 0 };
            this.move = (x, y) => {
                const { zoomFactor = 1 } = this.props;
                x = Math.round(x / 10) * 10;
                y = Math.round(y / 10) * 10;
                if (x === 0 && y === 0)
                    return;
                this.setState((state) => ({ offset: state.offset.add(x * zoomFactor, y * zoomFactor) }));
                this.moveWindow = { x: this.moveWindow.x + x, y: this.moveWindow.y + y };
                this.debouncedMove(this.moveWindow);
            };
            this.debouncedMove = debounce(() => {
                this.props.move(this.moveWindow);
                this.moveWindow = { x: 0, y: 0 };
            }, 2);
            this.onPointerDown = (event) => {
                const { zoomFactor = 1 } = this.props;
                if (event.which && event.which !== 1) {
                    return;
                }
                const clientEventCoordinates = getClientEventCoordinates(event);
                this.setState({ offset: new Point(clientEventCoordinates.clientX, clientEventCoordinates.clientY) });
                if (isMobile({ tablet: true })) {
                    document.addEventListener('touchmove', this.onPointerMove);
                    document.addEventListener('touchend', this.onPointerUp, { once: true });
                }
                else {
                    document.addEventListener('pointermove', this.onPointerMove);
                    document.addEventListener('pointerup', this.onPointerUp, { once: true });
                }
                setTimeout(() => !this.props.movable && this.onPointerUp(), 0);
            };
            this.onPointerMove = (event) => {
                const { zoomFactor = 1 } = this.props;
                const clientEventCoordinates = getClientEventCoordinates(event);
                const x = (clientEventCoordinates.clientX - this.state.offset.x) / zoomFactor;
                const y = (clientEventCoordinates.clientY - this.state.offset.y) / zoomFactor;
                if (!this.props.moving) {
                    if (Math.abs(x) > 5 || Math.abs(y) > 5) {
                        this.props.start();
                    }
                }
                else {
                    this.move(x, y);
                }
            };
            this.onPointerUp = () => {
                if (isMobile({ tablet: true })) {
                    document.removeEventListener('touchmove', this.onPointerMove);
                }
                else {
                    document.removeEventListener('pointermove', this.onPointerMove);
                }
                if (!this.props.moving) {
                    return;
                }
                this.setState(initialState);
                this.props.end();
            };
        }
        componentDidMount() {
            const node = findDOMNode(this);
            node.style.cursor = 'move';
            const child = node.firstChild;
            if (isMobile({ tablet: true })) {
                child.addEventListener('touchstart', this.onPointerDown);
            }
            else {
                child.addEventListener('pointerdown', this.onPointerDown);
            }
        }
        componentDidUpdate(prevProps, prevState, snapshot) {
            const node = findDOMNode(this);
            if (this.props.selectionBoxActive) {
                node.style.cursor = 'default';
            }
            else {
                node.style.cursor = 'move';
            }
        }
        componentWillUnmount() {
            const node = findDOMNode(this);
            const child = node.firstChild;
            if (isMobile({ tablet: true })) {
                child.removeEventListener('touchstart', this.onPointerDown);
                document.removeEventListener('touchmove', this.onPointerMove);
                document.removeEventListener('touchend', this.onPointerUp);
            }
            else {
                child.removeEventListener('pointerdown', this.onPointerDown);
                document.removeEventListener('pointermove', this.onPointerMove);
                document.removeEventListener('pointerup', this.onPointerUp);
            }
        }
        render() {
            const { movable: _movable, zoomFactor: _zoomFactor, start, move, end, ...props } = this.props;
            return React.createElement(WrappedComponent, { ...props });
        }
    }
    return enhance(Movable);
};
//# sourceMappingURL=movable.js.map