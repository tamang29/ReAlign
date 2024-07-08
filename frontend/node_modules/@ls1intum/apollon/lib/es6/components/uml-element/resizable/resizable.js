import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UMLElementRepository } from '../../../services/uml-element/uml-element-repository';
import { Point } from '../../../utils/geometry/point';
import { styled } from '../../theme/styles';
const initialState = {
    resizing: false,
    offset: new Point(),
};
const enhance = connect((state) => ({
    zoomFactor: state.editor.zoomFactor,
    selectionBoxActive: state.editor.selectionBoxActive,
}), {
    start: UMLElementRepository.startResizing,
    resize: UMLElementRepository.resize,
    end: UMLElementRepository.endResizing,
});
const Handle = {
    width: 15,
    height: 15,
    transform: 'translate(-10, -10)',
    fill: 'none',
};
const HandleBottomRight = styled.rect.attrs({
    x: '100%',
    y: '100%',
    ...Handle,
}) `
  cursor: nwse-resize;
`;
const HandleTopLeft = styled.rect.attrs({
    x: '0%',
    y: '0%',
    ...Handle,
}) `
  cursor: nwse-resize;
`;
const HandleTopRight = styled.rect.attrs({
    x: '100%',
    y: '0%',
    ...Handle,
}) `
  cursor: nesw-resize;
`;
const HandleBottomLeft = styled.rect.attrs({
    x: '0%',
    y: '100%',
    ...Handle,
}) `
  cursor: nesw-resize;
`;
export const resizable = (options) => (WrappedComponent) => {
    class Resizable extends Component {
        constructor() {
            super(...arguments);
            this.state = initialState;
            this.resize = (width, height, resizeFrom) => {
                width = Math.round(width / 10) * 10;
                height = Math.round(height / 10) * 10;
                if (options && options.preventX)
                    width = 0;
                if (options && options.preventY)
                    height = 0;
                if (width === 0 && height === 0)
                    return;
                this.setState((state) => ({ offset: state.offset.add(width, height) }));
                this.props.resize({ width, height }, resizeFrom, this.props.id);
            };
            this.onPointerDown = (event, resizeFrom) => {
                if (event.nativeEvent.which && event.nativeEvent.which !== 1) {
                    return;
                }
                let offset = new Point();
                switch (resizeFrom) {
                    case "bottomRight" /* ResizeFrom.BOTTOMRIGHT */:
                        offset = new Point(event.clientX, event.clientY);
                        break;
                    case "topLeft" /* ResizeFrom.TOPLEFT */:
                        offset = new Point(-event.clientX, -event.clientY);
                        break;
                    case "topRight" /* ResizeFrom.TOPRIGHT */:
                        offset = new Point(event.clientX, -event.clientY);
                        break;
                    case "bottomLeft" /* ResizeFrom.BOTTOMLEFT */:
                        offset = new Point(-event.clientX, event.clientY);
                        break;
                }
                this.setState({ resizing: true, offset: offset.scale(1 / this.props.zoomFactor) });
                this.props.start(this.props.id);
                const element = event.currentTarget;
                element.setPointerCapture(event.pointerId);
                element.addEventListener('pointermove', this.onPointerMove);
                element.setAttribute('resizeFrom', resizeFrom);
                element.addEventListener('pointerup', this.onPointerUp, { once: true });
            };
            this.onPointerMove = (event) => {
                const resizeFrom = event.currentTarget.getAttribute('resizeFrom');
                let width = 0;
                let height = 0;
                switch (resizeFrom) {
                    case "bottomRight" /* ResizeFrom.BOTTOMRIGHT */:
                        width = event.clientX / this.props.zoomFactor - this.state.offset.x;
                        height = event.clientY / this.props.zoomFactor - this.state.offset.y;
                        break;
                    case "topLeft" /* ResizeFrom.TOPLEFT */:
                        width = -event.clientX / this.props.zoomFactor - this.state.offset.x;
                        height = -event.clientY / this.props.zoomFactor - this.state.offset.y;
                        break;
                    case "topRight" /* ResizeFrom.TOPRIGHT */:
                        width = event.clientX / this.props.zoomFactor - this.state.offset.x;
                        height = -event.clientY / this.props.zoomFactor - this.state.offset.y;
                        break;
                    case "bottomLeft" /* ResizeFrom.BOTTOMLEFT */:
                        width = -event.clientX / this.props.zoomFactor - this.state.offset.x;
                        height = event.clientY / this.props.zoomFactor - this.state.offset.y;
                        break;
                }
                this.resize(width, height, resizeFrom);
                event.stopPropagation();
            };
            this.onPointerUp = (event) => {
                const element = event.currentTarget;
                if (!element) {
                    return;
                }
                element.releasePointerCapture(event.pointerId);
                element.removeEventListener('pointermove', this.onPointerMove);
                this.setState(initialState);
                this.props.end(this.props.id);
                event.stopPropagation();
            };
        }
        componentWillUnmount() {
            document.removeEventListener('pointermove', this.onPointerMove);
            document.removeEventListener('pointerup', this.onPointerUp);
        }
        render() {
            const { start, resize, end, selectionBoxActive, ...props } = this.props;
            return (React.createElement(WrappedComponent, { ...props },
                props.children,
                React.createElement(HandleBottomRight, { onPointerDown: (e) => {
                        this.onPointerDown(e, "bottomRight" /* ResizeFrom.BOTTOMRIGHT */);
                    }, pointerEvents: selectionBoxActive ? 'none' : 'all' }),
                React.createElement(HandleTopLeft, { onPointerDown: (e) => {
                        this.onPointerDown(e, "topLeft" /* ResizeFrom.TOPLEFT */);
                    }, pointerEvents: selectionBoxActive ? 'none' : 'all' }),
                React.createElement(HandleTopRight, { onPointerDown: (e) => {
                        this.onPointerDown(e, "topRight" /* ResizeFrom.TOPRIGHT */);
                    }, pointerEvents: selectionBoxActive ? 'none' : 'all' }),
                React.createElement(HandleBottomLeft, { onPointerDown: (e) => {
                        this.onPointerDown(e, "bottomLeft" /* ResizeFrom.BOTTOMLEFT */);
                    }, pointerEvents: selectionBoxActive ? 'none' : 'all' })));
        }
    }
    return enhance(Resizable);
};
//# sourceMappingURL=resizable.js.map