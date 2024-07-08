import React, { Component, createRef } from 'react';
import { createPortal } from 'react-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Popups } from '../../packages/popups';
import { ApollonMode } from '../../services/editor/editor-types';
import { UMLElementRepository } from '../../services/uml-element/uml-element-repository';
import { UMLRelationship } from '../../services/uml-relationship/uml-relationship';
import { Path } from '../../utils/geometry/path';
import { Assessment } from '../assessment/assessment';
import { withCanvas } from '../canvas/with-canvas';
import { Popover } from '../controls/popover/popover';
import { withRoot } from '../root/with-root';
const enhance = compose(withCanvas, withRoot, connect((state) => ({
    element: state.elements[state.updating[0]],
    disabled: !state.editor.enablePopups,
    mode: state.editor.mode,
}), {
    updateEnd: UMLElementRepository.updateEnd,
    getAbsolutePosition: UMLElementRepository.getAbsolutePosition,
}));
const initialState = Object.freeze({
    position: null,
    placement: undefined,
    alignment: undefined,
});
class UnwrappedUpdatePane extends Component {
    constructor() {
        super(...arguments);
        this.state = initialState;
        this.popover = createRef();
        this.show = () => {
            this.position(this.props);
            document.addEventListener('pointerdown', this.onPointerDown);
            const { parentElement: canvas } = this.props.canvas.layer;
            if (canvas) {
                canvas.addEventListener('scroll', this.onScroll);
            }
        };
        this.dismiss = () => {
            this.setState(initialState);
            document.removeEventListener('pointerdown', this.onPointerDown);
            const { parentElement: canvas } = this.props.canvas.layer;
            if (canvas) {
                canvas.removeEventListener('scroll', this.onScroll);
            }
            if (this.props.element) {
                this.props.updateEnd(this.props.element.id);
            }
        };
        this.position = ({ element, canvas }) => {
            const container = canvas.layer.parentElement;
            if (element && container) {
                const absolute = this.props
                    // relative to drawing area (0,0)
                    .getAbsolutePosition(element.id)
                    .add(canvas
                    .origin()
                    .subtract(this.props.root.getBoundingClientRect().x, this.props.root.getBoundingClientRect().y));
                const elementCenter = absolute.add(element.bounds.width / 2, element.bounds.height / 2);
                const position = absolute;
                // calculate if element is in half or right position of canvas (drawing area) and align popup
                const canvasBounds = container.getBoundingClientRect();
                const placement = elementCenter.x < canvasBounds.width / 2 ? 'right' : 'left';
                const alignment = elementCenter.y < canvasBounds.height / 2 ? 'start' : 'end';
                if (UMLRelationship.isUMLRelationship(element)) {
                    const path = new Path(element.path);
                    const p = path.position(path.length / 2);
                    position.x += p.x;
                    position.y += p.y;
                    if (alignment === 'start') {
                        position.y -= 15;
                    }
                    if (alignment === 'end') {
                        position.y += 15;
                    }
                }
                else {
                    if (placement === 'right') {
                        // add width to be on right side of element
                        position.x += element.bounds.width;
                    }
                    if (alignment === 'end') {
                        // add height to be at the bottom of element
                        position.y += element.bounds.height;
                    }
                }
                this.setState({ position, alignment, placement });
            }
        };
        this.onPointerDown = (event) => {
            if (this.popover.current && event.target instanceof HTMLElement && this.popover.current.contains(event.target)) {
                return;
            }
            this.dismiss();
        };
        this.onScroll = (event) => {
            this.dismiss();
        };
    }
    componentDidUpdate(prevProps) {
        if (!prevProps.element && this.props.element) {
            setTimeout(this.show, 0);
        }
        else if (prevProps.element && this.props.element && prevProps.element !== this.props.element) {
            this.position(this.props);
        }
    }
    render() {
        const { element, disabled, mode } = this.props;
        const { position, alignment, placement } = this.state;
        if (!element || disabled || !position) {
            return null;
        }
        let CustomPopupComponent;
        if (mode === ApollonMode.Assessment) {
            CustomPopupComponent = Assessment;
        }
        else {
            CustomPopupComponent = Popups[element.type];
        }
        if (!CustomPopupComponent) {
            return null;
        }
        return createPortal(React.createElement(Popover, { ref: this.popover, position: position, placement: placement, alignment: alignment, maxHeight: 500 },
            React.createElement(CustomPopupComponent, { element: element })), this.props.root);
    }
}
export const UpdatePane = enhance(UnwrappedUpdatePane);
//# sourceMappingURL=update-pane.js.map