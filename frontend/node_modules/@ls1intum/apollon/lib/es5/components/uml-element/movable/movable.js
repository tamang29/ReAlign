"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movable = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_dom_1 = require("react-dom");
var react_redux_1 = require("react-redux");
var uml_element_repository_1 = require("../../../services/uml-element/uml-element-repository");
var point_1 = require("../../../utils/geometry/point");
var is_mobile_1 = tslib_1.__importDefault(require("is-mobile"));
var touch_event_1 = require("../../../utils/touch-event");
var debounce_1 = require("../../../utils/debounce");
var initialState = {
    offset: new point_1.Point(),
};
var enhance = (0, react_redux_1.connect)(function (state, props) { return ({
    movable: state.selected.includes(props.id) && !state.resizing.includes(props.id) && !state.connecting.length,
    moving: state.moving.includes(props.id),
    zoomFactor: state.editor.zoomFactor,
    selectionBoxActive: state.editor.selectionBoxActive,
}); }, {
    start: uml_element_repository_1.UMLElementRepository.startMoving,
    move: uml_element_repository_1.UMLElementRepository.move,
    end: uml_element_repository_1.UMLElementRepository.endMoving,
});
var movable = function (WrappedComponent) {
    var Movable = /** @class */ (function (_super) {
        tslib_1.__extends(Movable, _super);
        function Movable() {
            var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
            _this.state = initialState;
            _this.moveWindow = { x: 0, y: 0 };
            _this.move = function (x, y) {
                var _a = _this.props.zoomFactor, zoomFactor = _a === void 0 ? 1 : _a;
                x = Math.round(x / 10) * 10;
                y = Math.round(y / 10) * 10;
                if (x === 0 && y === 0)
                    return;
                _this.setState(function (state) { return ({ offset: state.offset.add(x * zoomFactor, y * zoomFactor) }); });
                _this.moveWindow = { x: _this.moveWindow.x + x, y: _this.moveWindow.y + y };
                _this.debouncedMove(_this.moveWindow);
            };
            _this.debouncedMove = (0, debounce_1.debounce)(function () {
                _this.props.move(_this.moveWindow);
                _this.moveWindow = { x: 0, y: 0 };
            }, 2);
            _this.onPointerDown = function (event) {
                var _a = _this.props.zoomFactor, zoomFactor = _a === void 0 ? 1 : _a;
                if (event.which && event.which !== 1) {
                    return;
                }
                var clientEventCoordinates = (0, touch_event_1.getClientEventCoordinates)(event);
                _this.setState({ offset: new point_1.Point(clientEventCoordinates.clientX, clientEventCoordinates.clientY) });
                if ((0, is_mobile_1.default)({ tablet: true })) {
                    document.addEventListener('touchmove', _this.onPointerMove);
                    document.addEventListener('touchend', _this.onPointerUp, { once: true });
                }
                else {
                    document.addEventListener('pointermove', _this.onPointerMove);
                    document.addEventListener('pointerup', _this.onPointerUp, { once: true });
                }
                setTimeout(function () { return !_this.props.movable && _this.onPointerUp(); }, 0);
            };
            _this.onPointerMove = function (event) {
                var _a = _this.props.zoomFactor, zoomFactor = _a === void 0 ? 1 : _a;
                var clientEventCoordinates = (0, touch_event_1.getClientEventCoordinates)(event);
                var x = (clientEventCoordinates.clientX - _this.state.offset.x) / zoomFactor;
                var y = (clientEventCoordinates.clientY - _this.state.offset.y) / zoomFactor;
                if (!_this.props.moving) {
                    if (Math.abs(x) > 5 || Math.abs(y) > 5) {
                        _this.props.start();
                    }
                }
                else {
                    _this.move(x, y);
                }
            };
            _this.onPointerUp = function () {
                if ((0, is_mobile_1.default)({ tablet: true })) {
                    document.removeEventListener('touchmove', _this.onPointerMove);
                }
                else {
                    document.removeEventListener('pointermove', _this.onPointerMove);
                }
                if (!_this.props.moving) {
                    return;
                }
                _this.setState(initialState);
                _this.props.end();
            };
            return _this;
        }
        Movable.prototype.componentDidMount = function () {
            var node = (0, react_dom_1.findDOMNode)(this);
            node.style.cursor = 'move';
            var child = node.firstChild;
            if ((0, is_mobile_1.default)({ tablet: true })) {
                child.addEventListener('touchstart', this.onPointerDown);
            }
            else {
                child.addEventListener('pointerdown', this.onPointerDown);
            }
        };
        Movable.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) {
            var node = (0, react_dom_1.findDOMNode)(this);
            if (this.props.selectionBoxActive) {
                node.style.cursor = 'default';
            }
            else {
                node.style.cursor = 'move';
            }
        };
        Movable.prototype.componentWillUnmount = function () {
            var node = (0, react_dom_1.findDOMNode)(this);
            var child = node.firstChild;
            if ((0, is_mobile_1.default)({ tablet: true })) {
                child.removeEventListener('touchstart', this.onPointerDown);
                document.removeEventListener('touchmove', this.onPointerMove);
                document.removeEventListener('touchend', this.onPointerUp);
            }
            else {
                child.removeEventListener('pointerdown', this.onPointerDown);
                document.removeEventListener('pointermove', this.onPointerMove);
                document.removeEventListener('pointerup', this.onPointerUp);
            }
        };
        Movable.prototype.render = function () {
            var _a = this.props, _movable = _a.movable, _zoomFactor = _a.zoomFactor, start = _a.start, move = _a.move, end = _a.end, props = tslib_1.__rest(_a, ["movable", "zoomFactor", "start", "move", "end"]);
            return react_1.default.createElement(WrappedComponent, tslib_1.__assign({}, props));
        };
        return Movable;
    }(react_1.Component));
    return enhance(Movable);
};
exports.movable = movable;
//# sourceMappingURL=movable.js.map