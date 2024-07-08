import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { UMLElementRepository } from '../../services/uml-element/uml-element-repository';
import { UMLRelationshipRepository } from '../../services/uml-relationship/uml-relationship-repository';
import { Point } from '../../utils/geometry/point';
import { withCanvas } from '../canvas/with-canvas';
import { UMLRelationshipPreview } from './uml-relationship-preview';
import isMobile from 'is-mobile';
const enhance = compose(withCanvas, connect((state) => ({
    connecting: [
        ...state.connecting,
        ...Object.keys(state.reconnecting).map((id) => state.elements[id][state.reconnecting[id]]),
    ],
    zoomFactor: state.editor.zoomFactor,
}), {
    endConnecting: UMLElementRepository.endConnecting,
    endReconnecting: UMLRelationshipRepository.endReconnecting,
}));
const initialState = {
    position: null,
};
class Preview extends Component {
    constructor() {
        super(...arguments);
        this.state = initialState;
        this.onPointerMove = (event) => {
            const { zoomFactor = 1 } = this.props;
            const offset = this.props.canvas.origin();
            let position;
            if (event instanceof PointerEvent) {
                position = new Point(event.clientX - offset.x, event.clientY - offset.y).scale(1 / zoomFactor);
            }
            else {
                position = new Point(event.targetTouches[0].clientX - offset.x, event.targetTouches[0].clientY - offset.y).scale(1 / zoomFactor);
            }
            this.setState({ position });
        };
        this.onPointerUp = (event) => {
            if (isMobile({ tablet: true })) {
                document.removeEventListener('touchend', this.onPointerMove);
            }
            else {
                document.removeEventListener('pointermove', this.onPointerMove);
            }
            this.setState(initialState);
            this.props.endConnecting();
            this.props.endReconnecting();
        };
    }
    componentDidUpdate(prevProps) {
        if (this.props.connecting.length && prevProps.connecting !== this.props.connecting) {
            if (isMobile({ tablet: true })) {
                document.addEventListener('touchmove', this.onPointerMove);
                document.addEventListener('touchend', this.onPointerUp, { once: true });
            }
            else {
                document.addEventListener('pointermove', this.onPointerMove);
                document.addEventListener('pointerup', this.onPointerUp, { once: true });
            }
        }
    }
    componentWillUnmount() {
        if (isMobile({ tablet: true })) {
            document.removeEventListener('touchmove', this.onPointerMove);
            document.removeEventListener('touchend', this.onPointerUp);
        }
        else {
            document.removeEventListener('pointermove', this.onPointerMove);
            document.removeEventListener('pointerup', this.onPointerUp);
        }
    }
    render() {
        const { connecting } = this.props;
        const { position } = this.state;
        if (!connecting.length || !position) {
            return null;
        }
        return connecting.map((port, index) => React.createElement(UMLRelationshipPreview, { key: index, port: port, target: position }));
    }
}
export const ConnectionPreview = enhance(Preview);
//# sourceMappingURL=connection-preview.js.map