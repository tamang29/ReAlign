"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MouseEventListener = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var editor_types_1 = require("../../services/editor/editor-types");
var uml_element_repository_1 = require("../../services/uml-element/uml-element-repository");
var with_canvas_1 = require("./with-canvas");
var editor_repository_1 = require("../../services/editor/editor-repository");
var boundary_1 = require("../../utils/geometry/boundary");
var styles_1 = require("../../components/theme/styles");
var enhance = (0, redux_1.compose)(with_canvas_1.withCanvas, (0, react_redux_1.connect)(function (state) { return ({
    readonly: state.editor.readonly,
    mode: state.editor.mode,
    elements: state.elements,
    resizingInProgress: state.resizing.length > 0,
    connectingInProgress: state.connecting.length > 0,
    reconnectingInProgress: Object.keys(state.reconnecting).length > 0,
    hoveringInProgress: state.hovered.length > 0,
    zoomFactor: state.editor.zoomFactor,
}); }, {
    select: uml_element_repository_1.UMLElementRepository.select,
    changeSelectionBox: editor_repository_1.EditorRepository.setSelectionBoxActive,
}));
var MouseEventListenerComponent = /** @class */ (function (_super) {
    tslib_1.__extends(MouseEventListenerComponent, _super);
    function MouseEventListenerComponent(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Mouse down handler for starting the box selection
         * @param event The triggering mouse down event
         */
        _this.mouseDown = function (event) {
            // if the cursor went out of the bounds of the canvas, then the selection box is still active
            // we want to continue with the selection box from where we left off
            if (_this.state.selectionStarted) {
                _this.setState(function (prevState) {
                    return tslib_1.__assign(tslib_1.__assign({}, prevState), { selectionRectangle: tslib_1.__assign(tslib_1.__assign({}, prevState.selectionRectangle), { endX: event.clientX, endY: event.clientY }) });
                });
                return;
            }
            // The selection box will activate when clicking anywhere outside the bounds of an element however:
            //      * resizing an element can start when clicking slightly outside its bounds
            //      * the connection/reconnection port of an element is outside its bounding box
            // in these cases the selection box needs to be disabled
            if (_this.props.resizingInProgress ||
                _this.props.connectingInProgress ||
                _this.props.reconnectingInProgress ||
                _this.props.hoveringInProgress) {
                return;
            }
            _this.props.changeSelectionBox(true);
            _this.setState({
                selectionStarted: true,
                selectionRectangle: {
                    x: event.clientX,
                    y: event.clientY,
                    width: undefined,
                    height: undefined,
                },
            });
        };
        /**
         * Mouse up handler for finalising the box selection and determining which elements to select
         */
        _this.mouseUp = function () {
            // if no selection has been started, we can skip determining which
            // elements are contained in the selection box.
            if (!_this.state.selectionStarted) {
                return;
            }
            var selection = _this.getElementIDsInSelectionBox();
            _this.setState({
                selectionStarted: false,
                selectionRectangle: {
                    x: undefined,
                    y: undefined,
                    width: undefined,
                    height: undefined,
                },
            });
            _this.props.changeSelectionBox(false);
        };
        /**
         * Mouse move handler for dragging the selection rectangle
         * @param event The triggering mouse move event
         */
        _this.mouseMove = function (event) {
            if (!_this.state.selectionStarted) {
                return;
            }
            var selection = _this.getElementIDsInSelectionBox();
            _this.props.select(selection, true);
            _this.setState(function (prevState) {
                var _a, _b;
                return {
                    selectionStarted: prevState.selectionStarted,
                    selectionRectangle: tslib_1.__assign(tslib_1.__assign({}, prevState.selectionRectangle), { width: event.clientX - ((_a = prevState.selectionRectangle.x) !== null && _a !== void 0 ? _a : 0), height: event.clientY - ((_b = prevState.selectionRectangle.y) !== null && _b !== void 0 ? _b : 0) }),
                };
            });
        };
        /**
         * Check whether a given IUMLElement is contained in the currently active selection rectangle.
         * Elements are only considered selected if they are fully contained within the selection rectangle.
         *
         * @param element The element for which containment in the selection box is determined
         */
        _this.isElementInSelectionBox = function (element) {
            var canvasOrigin = _this.props.canvas.origin();
            var _a = _this.state.selectionRectangle, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
            if (!x || !y || !width || !height) {
                return false;
            }
            var normalizedSelectionBounds = {
                x: (x - canvasOrigin.x) / _this.props.zoomFactor,
                y: (y - canvasOrigin.y) / _this.props.zoomFactor,
                height: height / _this.props.zoomFactor,
                width: width / _this.props.zoomFactor,
            };
            return (0, boundary_1.areBoundsIntersecting)(element.bounds, normalizedSelectionBounds);
        };
        /**
         * Retrieve the IDs of all elements fully contained within the selection box
         */
        _this.getElementIDsInSelectionBox = function () {
            return Object.entries(_this.props.elements).reduce(function (selectedIDs, _a) {
                var _b = tslib_1.__read(_a, 2), id = _b[0], element = _b[1];
                if (element.owner !== null) {
                    return selectedIDs;
                }
                if (_this.isElementInSelectionBox(element)) {
                    return tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(selectedIDs), false), [id], false);
                }
                return selectedIDs;
            }, []);
        };
        _this.state = {
            selectionStarted: false,
            selectionRectangle: {
                x: undefined,
                y: undefined,
                width: undefined,
                height: undefined,
            },
        };
        return _this;
    }
    MouseEventListenerComponent.prototype.componentDidMount = function () {
        var layer = this.props.canvas.layer;
        if (!this.props.readonly &&
            (this.props.mode === editor_types_1.ApollonMode.Modelling || this.props.mode === editor_types_1.ApollonMode.Exporting)) {
            layer.addEventListener('mousedown', this.mouseDown);
            layer.addEventListener('mousemove', this.mouseMove);
            layer.addEventListener('mouseup', this.mouseUp);
        }
    };
    MouseEventListenerComponent.prototype.componentWillUnmount = function () {
        var layer = this.props.canvas.layer;
        layer.removeEventListener('mousedown', this.mouseDown);
        layer.removeEventListener('mousemove', this.mouseMove);
        layer.removeEventListener('mouseup', this.mouseUp);
    };
    MouseEventListenerComponent.prototype.render = function () {
        var _a = this.state.selectionRectangle, _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c, _d = _a.width, width = _d === void 0 ? 0 : _d, _e = _a.height, height = _e === void 0 ? 0 : _e;
        var theme = (0, styles_1.defaults)();
        return (this.state.selectionStarted &&
            width != 0 && (react_1.default.createElement("svg", { opacity: 0.5, pointerEvents: 'none', style: {
                position: 'fixed',
                left: "".concat(Math.min(x, x + width), "px"),
                width: "".concat(Math.abs(width), "px"),
                top: "".concat(Math.min(y, y + height), "px"),
                height: "".concat(Math.abs(height), "px"),
                backgroundColor: theme.color.primary,
            } })));
    };
    return MouseEventListenerComponent;
}(react_1.Component));
exports.MouseEventListener = enhance(MouseEventListenerComponent);
//# sourceMappingURL=mouse-eventlistener.js.map