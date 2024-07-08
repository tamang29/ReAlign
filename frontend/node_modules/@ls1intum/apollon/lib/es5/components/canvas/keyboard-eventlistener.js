"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyboardEventListener = void 0;
var tslib_1 = require("tslib");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var copy_repository_1 = require("../../services/copypaste/copy-repository");
var editor_types_1 = require("../../services/editor/editor-types");
var uml_element_repository_1 = require("../../services/uml-element/uml-element-repository");
var undo_repository_1 = require("../../services/undo/undo-repository");
var with_canvas_1 = require("./with-canvas");
var enhance = (0, redux_1.compose)(with_canvas_1.withCanvas, (0, react_redux_1.connect)(function (state) { return ({
    readonly: state.editor.readonly,
    mode: state.editor.mode,
}); }, {
    undo: undo_repository_1.UndoRepository.undo,
    redo: undo_repository_1.UndoRepository.redo,
    copy: copy_repository_1.CopyRepository.copy,
    paste: copy_repository_1.CopyRepository.paste,
    select: uml_element_repository_1.UMLElementRepository.select,
    deselect: uml_element_repository_1.UMLElementRepository.deselect,
    startMoving: uml_element_repository_1.UMLElementRepository.startMoving,
    move: uml_element_repository_1.UMLElementRepository.move,
    endMoving: uml_element_repository_1.UMLElementRepository.endMoving,
    delete: uml_element_repository_1.UMLElementRepository.delete,
}));
var KeyboardEventListenerComponent = /** @class */ (function (_super) {
    tslib_1.__extends(KeyboardEventListenerComponent, _super);
    function KeyboardEventListenerComponent() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.pointerDown = function (event) {
            if (event.target !== event.currentTarget || event.shiftKey) {
                return;
            }
            _this.props.deselect();
        };
        _this.keyDown = function (event) {
            switch (event.key) {
                case 'ArrowUp':
                    event.preventDefault();
                    if (!event.repeat) {
                        _this.props.startMoving();
                    }
                    _this.props.move({ x: 0, y: -10 });
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    if (!event.repeat) {
                        _this.props.startMoving();
                    }
                    _this.props.move({ x: 10, y: 0 });
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    if (!event.repeat) {
                        _this.props.startMoving();
                    }
                    _this.props.move({ x: 0, y: 10 });
                    break;
                case 'ArrowLeft':
                    event.preventDefault();
                    if (!event.repeat) {
                        _this.props.startMoving();
                    }
                    _this.props.move({ x: -10, y: 0 });
                    break;
                case 'Backspace':
                case 'Delete':
                    event.preventDefault();
                    _this.props.delete();
                    break;
                case 'Escape':
                    event.preventDefault();
                    _this.props.deselect();
                    break;
            }
            if (event.metaKey || event.ctrlKey) {
                switch (event.key) {
                    case 'a':
                        event.preventDefault();
                        _this.props.select();
                        break;
                    case 'c':
                        event.preventDefault();
                        _this.props.copy();
                        break;
                    case 'v':
                        event.preventDefault();
                        _this.props.paste();
                        break;
                    case 'z':
                        event.preventDefault();
                        event.shiftKey ? _this.props.redo() : _this.props.undo();
                        break;
                }
            }
        };
        _this.keyUp = function (event) {
            switch (event.key) {
                case 'ArrowUp':
                case 'ArrowRight':
                case 'ArrowDown':
                case 'ArrowLeft':
                    _this.props.endMoving(undefined, true);
                    break;
            }
        };
        return _this;
    }
    KeyboardEventListenerComponent.prototype.componentDidMount = function () {
        var layer = this.props.canvas.layer;
        if (!this.props.readonly && this.props.mode !== editor_types_1.ApollonMode.Assessment) {
            layer.addEventListener('keydown', this.keyDown);
            layer.addEventListener('keyup', this.keyUp);
        }
        layer.addEventListener('pointerdown', this.pointerDown);
    };
    KeyboardEventListenerComponent.prototype.render = function () {
        return null;
    };
    return KeyboardEventListenerComponent;
}(react_1.Component));
exports.KeyboardEventListener = enhance(KeyboardEventListenerComponent);
//# sourceMappingURL=keyboard-eventlistener.js.map