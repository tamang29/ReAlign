import { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { CopyRepository } from '../../services/copypaste/copy-repository';
import { ApollonMode } from '../../services/editor/editor-types';
import { UMLElementRepository } from '../../services/uml-element/uml-element-repository';
import { UndoRepository } from '../../services/undo/undo-repository';
import { withCanvas } from './with-canvas';
const enhance = compose(withCanvas, connect((state) => ({
    readonly: state.editor.readonly,
    mode: state.editor.mode,
}), {
    undo: UndoRepository.undo,
    redo: UndoRepository.redo,
    copy: CopyRepository.copy,
    paste: CopyRepository.paste,
    select: UMLElementRepository.select,
    deselect: UMLElementRepository.deselect,
    startMoving: UMLElementRepository.startMoving,
    move: UMLElementRepository.move,
    endMoving: UMLElementRepository.endMoving,
    delete: UMLElementRepository.delete,
}));
class KeyboardEventListenerComponent extends Component {
    constructor() {
        super(...arguments);
        this.pointerDown = (event) => {
            if (event.target !== event.currentTarget || event.shiftKey) {
                return;
            }
            this.props.deselect();
        };
        this.keyDown = (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    event.preventDefault();
                    if (!event.repeat) {
                        this.props.startMoving();
                    }
                    this.props.move({ x: 0, y: -10 });
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    if (!event.repeat) {
                        this.props.startMoving();
                    }
                    this.props.move({ x: 10, y: 0 });
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    if (!event.repeat) {
                        this.props.startMoving();
                    }
                    this.props.move({ x: 0, y: 10 });
                    break;
                case 'ArrowLeft':
                    event.preventDefault();
                    if (!event.repeat) {
                        this.props.startMoving();
                    }
                    this.props.move({ x: -10, y: 0 });
                    break;
                case 'Backspace':
                case 'Delete':
                    event.preventDefault();
                    this.props.delete();
                    break;
                case 'Escape':
                    event.preventDefault();
                    this.props.deselect();
                    break;
            }
            if (event.metaKey || event.ctrlKey) {
                switch (event.key) {
                    case 'a':
                        event.preventDefault();
                        this.props.select();
                        break;
                    case 'c':
                        event.preventDefault();
                        this.props.copy();
                        break;
                    case 'v':
                        event.preventDefault();
                        this.props.paste();
                        break;
                    case 'z':
                        event.preventDefault();
                        event.shiftKey ? this.props.redo() : this.props.undo();
                        break;
                }
            }
        };
        this.keyUp = (event) => {
            switch (event.key) {
                case 'ArrowUp':
                case 'ArrowRight':
                case 'ArrowDown':
                case 'ArrowLeft':
                    this.props.endMoving(undefined, true);
                    break;
            }
        };
    }
    componentDidMount() {
        const { layer } = this.props.canvas;
        if (!this.props.readonly && this.props.mode !== ApollonMode.Assessment) {
            layer.addEventListener('keydown', this.keyDown);
            layer.addEventListener('keyup', this.keyUp);
        }
        layer.addEventListener('pointerdown', this.pointerDown);
    }
    render() {
        return null;
    }
}
export const KeyboardEventListener = enhance(KeyboardEventListenerComponent);
//# sourceMappingURL=keyboard-eventlistener.js.map