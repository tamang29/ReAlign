"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reconnectable = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_redux_1 = require("react-redux");
var uml_relationship_repository_1 = require("../../../services/uml-relationship/uml-relationship-repository");
var path_1 = require("../../../utils/geometry/path");
var point_1 = require("../../../utils/geometry/point");
var styles_1 = require("../../theme/styles");
var is_mobile_1 = tslib_1.__importDefault(require("is-mobile"));
var touch_event_1 = require("../../../utils/touch-event");
var initialState = {
    offset: new point_1.Point(),
    endpoint: null,
};
var enhance = (0, react_redux_1.connect)(function (state, props) { return ({
    path: state.elements[props.id].path,
    reconnecting: !!state.reconnecting[props.id],
    disabled: !!Object.keys(state.reconnecting).length || !!Object.keys(state.connecting).length,
    selectionBoxActive: state.editor.selectionBoxActive,
}); }, {
    start: uml_relationship_repository_1.UMLRelationshipRepository.startReconnecting,
    reconnect: uml_relationship_repository_1.UMLRelationshipRepository.reconnect,
});
var Handle = styles_1.styled.line.attrs({
    strokeWidth: 15,
    strokeOpacity: 0,
    stroke: 'black',
})(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  cursor: move;\n"], ["\n  cursor: move;\n"])));
var reconnectable = function (WrappedComponent) {
    var Reconnectable = /** @class */ (function (_super) {
        tslib_1.__extends(Reconnectable, _super);
        function Reconnectable() {
            var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
            _this.state = initialState;
            _this.onPointerDown = function (event) {
                if (event.nativeEvent.which && event.nativeEvent.which !== 1) {
                    return;
                }
                var endpoint = event.currentTarget.dataset.endpoint;
                _this.setState({ endpoint: endpoint, offset: new point_1.Point(event.clientX, event.clientY) });
                if ((0, is_mobile_1.default)({ tablet: true })) {
                    document.addEventListener('touchmove', _this.onPointerMove);
                    document.addEventListener('touchend', _this.onPointerUp, { once: true });
                    document.addEventListener('pointerup', _this.onPointerUp, { once: true });
                }
                else {
                    document.addEventListener('pointermove', _this.onPointerMove);
                    document.addEventListener('pointerup', _this.onPointerUp, { once: true });
                }
            };
            _this.onPointerMove = function (event) {
                var clientEventCoordinates = (0, touch_event_1.getClientEventCoordinates)(event);
                var x = clientEventCoordinates.clientX - _this.state.offset.x;
                var y = clientEventCoordinates.clientY - _this.state.offset.y;
                var endpoint = _this.state.endpoint;
                if (!_this.props.reconnecting && endpoint) {
                    if (Math.abs(x) > 5 || Math.abs(y) > 5) {
                        _this.props.start(endpoint);
                    }
                }
            };
            _this.onPointerUp = function (event) {
                if (!(event instanceof PointerEvent)) {
                    (0, touch_event_1.convertTouchEndIntoPointerUp)(event);
                    return;
                }
                if ((0, is_mobile_1.default)({ tablet: true })) {
                    document.removeEventListener('touchmove', _this.onPointerMove);
                }
                else {
                    document.removeEventListener('pointermove', _this.onPointerMove);
                }
                _this.cancel();
            };
            _this.cancel = function () {
                if (!_this.props.reconnecting) {
                    return;
                }
                _this.setState(initialState);
            };
            _this.composePath = function (path) {
                var line = new path_1.Path(path);
                var distance = Math.min(line.length / 2, 40);
                return [path[0], line.position(distance)];
            };
            return _this;
        }
        Reconnectable.prototype.componentWillUnmount = function () {
            if ((0, is_mobile_1.default)({ tablet: true })) {
                document.removeEventListener('touchmove', this.onPointerMove);
                document.removeEventListener('touchend', this.onPointerUp);
                document.removeEventListener('pointerup', this.onPointerUp);
            }
            else {
                document.removeEventListener('pointermove', this.onPointerMove);
                document.removeEventListener('pointerup', this.onPointerUp);
            }
            this.cancel();
        };
        Reconnectable.prototype.render = function () {
            var _a = this.props, path = _a.path, reconnecting = _a.reconnecting, start = _a.start, reconnect = _a.reconnect, disabled = _a.disabled, selectionBoxActive = _a.selectionBoxActive, props = tslib_1.__rest(_a, ["path", "reconnecting", "start", "reconnect", "disabled", "selectionBoxActive"]);
            var sourceHandle = this.composePath(path);
            var targetHandle = this.composePath(tslib_1.__spreadArray([], tslib_1.__read(path), false).reverse());
            return (react_1.default.createElement(WrappedComponent, tslib_1.__assign({}, props),
                props.children,
                react_1.default.createElement(Handle, { x1: sourceHandle[0].x, y1: sourceHandle[0].y, x2: sourceHandle[1].x, y2: sourceHandle[1].y, onPointerDown: this.onPointerDown, "data-endpoint": "target", pointerEvents: selectionBoxActive || disabled ? 'none' : 'all' }),
                react_1.default.createElement(Handle, { x1: targetHandle[0].x, y1: targetHandle[0].y, x2: targetHandle[1].x, y2: targetHandle[1].y, onPointerDown: this.onPointerDown, "data-endpoint": "source", pointerEvents: selectionBoxActive || disabled ? 'none' : 'all' })));
        };
        return Reconnectable;
    }(react_1.Component));
    return enhance(Reconnectable);
};
exports.reconnectable = reconnectable;
var templateObject_1;
//# sourceMappingURL=reconnectable.js.map