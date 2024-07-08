import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UMLRelationshipRepository } from '../../../services/uml-relationship/uml-relationship-repository';
import { Path } from '../../../utils/geometry/path';
import { Point } from '../../../utils/geometry/point';
import { styled } from '../../theme/styles';
import isMobile from 'is-mobile';
import { convertTouchEndIntoPointerUp, getClientEventCoordinates } from '../../../utils/touch-event';
const initialState = {
    offset: new Point(),
    endpoint: null,
};
const enhance = connect((state, props) => ({
    path: state.elements[props.id].path,
    reconnecting: !!state.reconnecting[props.id],
    disabled: !!Object.keys(state.reconnecting).length || !!Object.keys(state.connecting).length,
    selectionBoxActive: state.editor.selectionBoxActive,
}), {
    start: UMLRelationshipRepository.startReconnecting,
    reconnect: UMLRelationshipRepository.reconnect,
});
const Handle = styled.line.attrs({
    strokeWidth: 15,
    strokeOpacity: 0,
    stroke: 'black',
}) `
  cursor: move;
`;
export const reconnectable = (WrappedComponent) => {
    class Reconnectable extends Component {
        constructor() {
            super(...arguments);
            this.state = initialState;
            this.onPointerDown = (event) => {
                if (event.nativeEvent.which && event.nativeEvent.which !== 1) {
                    return;
                }
                const endpoint = event.currentTarget.dataset.endpoint;
                this.setState({ endpoint, offset: new Point(event.clientX, event.clientY) });
                if (isMobile({ tablet: true })) {
                    document.addEventListener('touchmove', this.onPointerMove);
                    document.addEventListener('touchend', this.onPointerUp, { once: true });
                    document.addEventListener('pointerup', this.onPointerUp, { once: true });
                }
                else {
                    document.addEventListener('pointermove', this.onPointerMove);
                    document.addEventListener('pointerup', this.onPointerUp, { once: true });
                }
            };
            this.onPointerMove = (event) => {
                const clientEventCoordinates = getClientEventCoordinates(event);
                const x = clientEventCoordinates.clientX - this.state.offset.x;
                const y = clientEventCoordinates.clientY - this.state.offset.y;
                const { endpoint } = this.state;
                if (!this.props.reconnecting && endpoint) {
                    if (Math.abs(x) > 5 || Math.abs(y) > 5) {
                        this.props.start(endpoint);
                    }
                }
            };
            this.onPointerUp = (event) => {
                if (!(event instanceof PointerEvent)) {
                    convertTouchEndIntoPointerUp(event);
                    return;
                }
                if (isMobile({ tablet: true })) {
                    document.removeEventListener('touchmove', this.onPointerMove);
                }
                else {
                    document.removeEventListener('pointermove', this.onPointerMove);
                }
                this.cancel();
            };
            this.cancel = () => {
                if (!this.props.reconnecting) {
                    return;
                }
                this.setState(initialState);
            };
            this.composePath = (path) => {
                const line = new Path(path);
                const distance = Math.min(line.length / 2, 40);
                return [path[0], line.position(distance)];
            };
        }
        componentWillUnmount() {
            if (isMobile({ tablet: true })) {
                document.removeEventListener('touchmove', this.onPointerMove);
                document.removeEventListener('touchend', this.onPointerUp);
                document.removeEventListener('pointerup', this.onPointerUp);
            }
            else {
                document.removeEventListener('pointermove', this.onPointerMove);
                document.removeEventListener('pointerup', this.onPointerUp);
            }
            this.cancel();
        }
        render() {
            const { path, reconnecting, start, reconnect, disabled, selectionBoxActive, ...props } = this.props;
            const sourceHandle = this.composePath(path);
            const targetHandle = this.composePath([...path].reverse());
            return (React.createElement(WrappedComponent, { ...props },
                props.children,
                React.createElement(Handle, { x1: sourceHandle[0].x, y1: sourceHandle[0].y, x2: sourceHandle[1].x, y2: sourceHandle[1].y, onPointerDown: this.onPointerDown, "data-endpoint": "target", pointerEvents: selectionBoxActive || disabled ? 'none' : 'all' }),
                React.createElement(Handle, { x1: targetHandle[0].x, y1: targetHandle[0].y, x2: targetHandle[1].x, y2: targetHandle[1].y, onPointerDown: this.onPointerDown, "data-endpoint": "source", pointerEvents: selectionBoxActive || disabled ? 'none' : 'all' })));
        }
    }
    return enhance(Reconnectable);
};
//# sourceMappingURL=reconnectable.js.map