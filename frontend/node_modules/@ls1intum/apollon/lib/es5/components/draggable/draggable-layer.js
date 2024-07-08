"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DraggableLayer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_dom_1 = require("react-dom");
var point_1 = require("../../utils/geometry/point");
var with_canvas_1 = require("../canvas/with-canvas");
var draggable_context_1 = require("./draggable-context");
var ghost_1 = require("./ghost");
var redux_1 = require("redux");
var with_root_1 = require("../root/with-root");
var is_mobile_1 = tslib_1.__importDefault(require("is-mobile"));
var react_redux_1 = require("react-redux");
var initialState = {
    dragging: false,
    offset: new point_1.Point(),
    position: new point_1.Point(),
    resolve: null,
    reject: null,
};
var enhance = (0, redux_1.compose)(with_canvas_1.withCanvas, with_root_1.withRoot, (0, react_redux_1.connect)(function (state) { return ({
    zoomFactor: state.editor.zoomFactor,
}); }));
/**
 * Manages the intermediate state of drag and drop events.
 * On drag start it adds the dragged HTMLElement to the ghost (container with dragged HTMLElement)
 * and thereby a preview of the HTML element is displayed.
 * On moving around it updates the position of the ghost element
 * On drag end (invoked on pointerup in droppable) it takes the current position of the ghost element and
 * creates a {@link DropEvent} with the last position of the ghost
 */
var DraggableLayerComponent = /** @class */ (function (_super) {
    tslib_1.__extends(DraggableLayerComponent, _super);
    function DraggableLayerComponent() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.state = initialState;
        _this.ghost = (0, react_1.createRef)();
        /**
         * 'implementation' of the onDragStart of {@link DraggableContext}. It returns a promise with the resulting {@link DropEvent}.
         * The by this method returned promise is resolved in the {@link onDragEnd} method where the final drop is created. If a pointerup event
         * occurs outside of the Droppable component -> {@link cancel} is invoked which terminates the dragging and rejects the promise
         * @param event that started the dragging
         */
        _this.onDragStart = function (event) {
            var element = event.currentTarget;
            var bounds = element.getBoundingClientRect();
            var rootBounds = _this.props.root.getBoundingClientRect();
            // bounds.left - rooBounds.x => position to origin
            // one could delete event.pageX (a - a = 0)in for this case, but its is important to calculate the offset correctly for moving event
            var offset;
            var position;
            if (event instanceof PointerEvent) {
                offset = new point_1.Point(event.pageX - (bounds.left - rootBounds.x), event.pageY - (bounds.top - rootBounds.y));
                position = new point_1.Point(Math.round((event.pageX - offset.x) / 10) * 10, Math.round((event.pageY - offset.y) / 10) * 10);
            }
            else {
                offset = new point_1.Point(event.targetTouches[0].pageX - (bounds.left - rootBounds.x), event.targetTouches[0].pageY - (bounds.top - rootBounds.y));
                position = new point_1.Point(Math.round((event.targetTouches[0].pageX - offset.x) / 10) * 10, Math.round((event.targetTouches[0].pageY - offset.y) / 10) * 10);
            }
            if ((0, is_mobile_1.default)({ tablet: true })) {
                document.addEventListener('touchmove', _this.onPointerMove);
                document.addEventListener('touchend', _this.cancel, { once: true });
            }
            else {
                document.addEventListener('pointermove', _this.onPointerMove);
                // if pointer up event occur outside of Droppable element -> cancel dragging
                // this works, because the events bubble up (onDragEnd is invoked before cancel)
                // nevertheless cancel is important, because it removes the pointerup listener on the documentdocument.addEventListener('pointerup', this.cancel, { once: true });
                document.addEventListener('pointerup', _this.cancel, { once: true });
            }
            return new Promise(function (resolve, reject) {
                return _this.setState({ dragging: true, offset: offset, position: position, resolve: resolve, reject: reject }, function () {
                    var container = _this.ghost.current;
                    container.append(element.cloneNode(true));
                });
            });
        };
        _this.onPointerMove = function (event) {
            var position;
            if (event instanceof PointerEvent) {
                position = new point_1.Point(event.pageX - _this.state.offset.x, event.pageY - _this.state.offset.y);
            }
            else {
                position = new point_1.Point(event.targetTouches[0].pageX - _this.state.offset.x, event.targetTouches[0].pageY - _this.state.offset.y);
            }
            // snapping behavior on moving
            position.x = Math.round(position.x / 10) * 10;
            position.y = Math.round(position.y / 10) * 10;
            _this.setState({ position: position });
        };
        _this.onDragEnd = function (owner) { return function (event) {
            var _a = _this.props.zoomFactor, zoomFactor = _a === void 0 ? 1 : _a;
            if (!_this.state.dragging)
                return;
            var dropEvent = {
                owner: owner,
                // transformation to new relational point origin, which is in the center of the canvas
                position: _this.state.position.subtract(_this.props.canvas
                    .origin()
                    .subtract(_this.props.root.getBoundingClientRect().x, _this.props.root.getBoundingClientRect().y)),
            };
            // snapping behavior when dropped
            dropEvent.position.x = Math.round(dropEvent.position.x / zoomFactor / 10) * 10;
            dropEvent.position.y = Math.round(dropEvent.position.y / zoomFactor / 10) * 10;
            if (_this.state.resolve) {
                _this.state.resolve(dropEvent);
            }
        }; };
        _this.cancel = function () {
            if (_this.state.reject) {
                _this.state.reject();
            }
            if ((0, is_mobile_1.default)({ tablet: true })) {
                document.removeEventListener('touchmove', _this.onPointerMove);
            }
            else {
                document.removeEventListener('pointermove', _this.onPointerMove);
            }
            _this.setState(initialState);
        };
        return _this;
    }
    DraggableLayerComponent.prototype.render = function () {
        var context = {
            onDragStart: this.onDragStart,
            onDragEnd: this.onDragEnd,
        };
        var _a = this.state, dragging = _a.dragging, position = _a.position;
        return (react_1.default.createElement(draggable_context_1.DraggableProvider, { value: context },
            this.props.children,
            (0, react_dom_1.createPortal)(dragging && react_1.default.createElement(ghost_1.Ghost, { ref: this.ghost, position: position }), this.props.root)));
    };
    return DraggableLayerComponent;
}(react_1.Component));
exports.DraggableLayer = enhance(DraggableLayerComponent);
//# sourceMappingURL=draggable-layer.js.map