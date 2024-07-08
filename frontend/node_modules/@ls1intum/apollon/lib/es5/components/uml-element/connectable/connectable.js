"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectable = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_dom_1 = require("react-dom");
var react_redux_1 = require("react-redux");
var uml_element_port_1 = require("../../../services/uml-element/uml-element-port");
var uml_element_repository_1 = require("../../../services/uml-element/uml-element-repository");
var uml_relationship_repository_1 = require("../../../services/uml-relationship/uml-relationship-repository");
var point_1 = require("../../../utils/geometry/point");
var styles_1 = require("../../theme/styles");
var uml_elements_1 = require("../../../packages/uml-elements");
var uml_relationships_1 = require("../../../packages/uml-relationships");
var touch_event_1 = require("../../../utils/touch-event");
var is_mobile_1 = tslib_1.__importDefault(require("is-mobile"));
var uml_element_1 = require("../../../services/uml-element/uml-element");
var enhance = (0, react_redux_1.connect)(function (state, props) {
    return {
        hovered: state.hovered[0] === props.id,
        selected: state.selected.includes(props.id),
        connecting: !!state.connecting.length,
        reconnecting: !!Object.keys(state.reconnecting).length,
        element: state.elements[props.id],
        type: state.elements[props.id].type,
    };
}, {
    start: uml_element_repository_1.UMLElementRepository.startConnecting,
    connect: uml_element_repository_1.UMLElementRepository.connect,
    reconnect: uml_relationship_repository_1.UMLRelationshipRepository.reconnect,
});
var Handle = (0, styles_1.styled)(function (props) {
    var alternativePortVisualization = props.alternativePortVisualization, otherProps = tslib_1.__rest(props, ["alternativePortVisualization"]);
    // alternative port visualization size
    var alternativePortHeight = 10;
    var alternativePortWidth = 5;
    var alternativePortCircleSize = 30;
    // default port visualization size
    var defaultPortSize = 20;
    if (alternativePortVisualization) {
        return (react_1.default.createElement("svg", tslib_1.__assign({}, otherProps),
            react_1.default.createElement("path", { d: "M ".concat(alternativePortWidth / 2, " 0 v -").concat(alternativePortHeight, " h -").concat(alternativePortWidth, " v ").concat(alternativePortHeight, " Z") }),
            react_1.default.createElement("path", { d: "M -".concat(alternativePortCircleSize / 2, " -").concat(alternativePortHeight + alternativePortCircleSize / 2) +
                    " a ".concat(alternativePortCircleSize / 2, " ").concat(alternativePortCircleSize / 2, " 0 0 1 ").concat(alternativePortCircleSize, " 0") +
                    " a ".concat(alternativePortCircleSize / 2, " ").concat(alternativePortCircleSize / 2, " 0 0 1 -").concat(alternativePortCircleSize, " 0") })));
    }
    else {
        return (react_1.default.createElement("svg", tslib_1.__assign({}, otherProps),
            react_1.default.createElement("path", { d: "M -".concat(defaultPortSize, " 0 A ").concat(defaultPortSize / 2, " ").concat(defaultPortSize / 2, " 0 0 1 ").concat(defaultPortSize, " 0") })));
    }
}).attrs(function (_a) {
    var direction = _a.direction, ports = _a.ports;
    return ({
        fill: '#0064ff',
        fillOpacity: 0.2,
        x: "".concat(ports[direction].x, "px"),
        y: "".concat(ports[direction].y, "px"),
        rotate: direction === uml_element_port_1.Direction.Up || direction === uml_element_port_1.Direction.Topright || direction === uml_element_port_1.Direction.Topleft
            ? 0
            : direction === uml_element_port_1.Direction.Right || direction === uml_element_port_1.Direction.Upright || direction === uml_element_port_1.Direction.Downright
                ? 90
                : direction === uml_element_port_1.Direction.Down || direction === uml_element_port_1.Direction.Bottomright || direction === uml_element_port_1.Direction.Bottomleft
                    ? 180
                    : -90,
    });
})(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  cursor: crosshair;\n  pointer-events: all;\n\n  path {\n    transform: rotate(", "deg);\n  }\n"], ["\n  cursor: crosshair;\n  pointer-events: all;\n\n  path {\n    transform: rotate(", "deg);\n  }\n"])), function (props) { return props.rotate; });
var connectable = function (WrappedComponent) {
    var Connectable = /** @class */ (function (_super) {
        tslib_1.__extends(Connectable, _super);
        function Connectable() {
            var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
            _this.elementOnPointerUp = function (event) {
                var _a;
                var node = (0, react_dom_1.findDOMNode)(_this);
                // create pointer up event in order to follow connection logic
                // created pointer up event has the correct target, (touchend triggered on same element as touchstart)
                // -> connection logic for desktop can be applied
                if (!(event instanceof PointerEvent)) {
                    (0, touch_event_1.convertTouchEndIntoPointerUp)(event);
                    return;
                }
                var direction;
                // if available, we can get the direction from the event target
                if (event.target instanceof SVGElement &&
                    event.target.parentElement != null &&
                    event.target.parentElement.hasAttribute('direction')) {
                    direction = event.target.parentElement.getAttribute('direction');
                }
                // otherwise get the direction the old way
                if (direction == null) {
                    // calculate event position relative to object position in %
                    var nodeRect = node.getBoundingClientRect();
                    var relEventPosition_1 = {
                        x: (event.clientX - nodeRect.left) / nodeRect.width,
                        y: (event.clientY - nodeRect.top) / nodeRect.height,
                    };
                    // relative port locations in %
                    var relativePortLocation_1 = (_a = {},
                        _a[uml_element_port_1.Direction.Up] = new point_1.Point(0.5, 0),
                        _a[uml_element_port_1.Direction.Right] = new point_1.Point(1, 0.5),
                        _a[uml_element_port_1.Direction.Down] = new point_1.Point(0.5, 1),
                        _a[uml_element_port_1.Direction.Left] = new point_1.Point(0, 0.5),
                        _a[uml_element_port_1.Direction.Upright] = new point_1.Point(1, 0.25),
                        _a[uml_element_port_1.Direction.Downright] = new point_1.Point(1, 0.75),
                        _a[uml_element_port_1.Direction.Upleft] = new point_1.Point(0, 0.25),
                        _a[uml_element_port_1.Direction.Downleft] = new point_1.Point(0, 0.75),
                        _a[uml_element_port_1.Direction.Topright] = new point_1.Point(0.75, 0),
                        _a[uml_element_port_1.Direction.Bottomright] = new point_1.Point(0.75, 1),
                        _a[uml_element_port_1.Direction.Topleft] = new point_1.Point(0.25, 0),
                        _a[uml_element_port_1.Direction.Bottomleft] = new point_1.Point(0.25, 1),
                        _a);
                    var ports = (0, uml_element_1.getPortsForElement)(_this.props.element);
                    // calculate the distances to all handles
                    var distances = Object.entries(ports).map(function (_a) {
                        var _b = tslib_1.__read(_a, 2), key = _b[0], value = _b[1];
                        return ({
                            key: key,
                            distance: Math.sqrt(Math.pow(relativePortLocation_1[key].x - relEventPosition_1.x, 2) +
                                Math.pow(relativePortLocation_1[key].y - relEventPosition_1.y, 2)),
                        });
                    });
                    // use handle with min distance to connect to
                    var minDistance_1 = Math.min.apply(Math, tslib_1.__spreadArray([], tslib_1.__read(distances.map(function (value) { return value.distance; })), false));
                    direction = distances.filter(function (value) { return minDistance_1 === value.distance; })[0].key;
                }
                if (_this.props.connecting) {
                    _this.props.connect({ element: _this.props.id, direction: direction });
                }
                if (_this.props.reconnecting && !event.defaultPrevented) {
                    _this.props.reconnect({ element: _this.props.id, direction: direction });
                    event.preventDefault();
                }
            };
            _this.onPointerDown = function (event) {
                var direction = event.currentTarget.getAttribute('direction');
                var id = event.currentTarget.parentElement.getAttribute('id');
                _this.props.start(direction, id);
            };
            _this.onPointerUp = function (event) {
                var direction = event.currentTarget.getAttribute('direction');
                if (_this.props.connecting) {
                    _this.props.connect({ element: _this.props.id, direction: direction });
                }
                if (_this.props.reconnecting) {
                    _this.props.reconnect({ element: _this.props.id, direction: direction });
                }
            };
            return _this;
        }
        Connectable.prototype.componentDidMount = function () {
            var node = (0, react_dom_1.findDOMNode)(this);
            node.addEventListener('pointerup', this.elementOnPointerUp.bind(this));
            if ((0, is_mobile_1.default)({ tablet: true })) {
                node.addEventListener('touchend', this.elementOnPointerUp.bind(this));
            }
        };
        Connectable.prototype.componentWillUnmount = function () {
            var node = (0, react_dom_1.findDOMNode)(this);
            node.removeEventListener('pointerup', this.elementOnPointerUp);
            if ((0, is_mobile_1.default)({ tablet: true })) {
                node.removeEventListener('touchend', this.elementOnPointerUp);
            }
        };
        Connectable.prototype.render = function () {
            var _a = this.props, hovered = _a.hovered, selected = _a.selected, connecting = _a.connecting, reconnecting = _a.reconnecting, start = _a.start, _ = _a.connect, reconnect = _a.reconnect, type = _a.type, element = _a.element, props = tslib_1.__rest(_a, ["hovered", "selected", "connecting", "reconnecting", "start", "connect", "reconnect", "type", "element"]);
            var features = tslib_1.__assign(tslib_1.__assign({}, uml_elements_1.UMLElements), uml_relationships_1.UMLRelationships)[type].features;
            var ports = (0, uml_element_1.getPortsForElement)(element);
            return (react_1.default.createElement(WrappedComponent, tslib_1.__assign({}, props),
                props.children,
                (hovered || selected || connecting || reconnecting) && (react_1.default.createElement(react_1.default.Fragment, null,
                    this.props.type !== 'ActivityForkNode' && (react_1.default.createElement(Handle, { ports: ports, direction: uml_element_port_1.Direction.Up, onPointerDown: this.onPointerDown, onPointerUp: this.onPointerUp, alternativePortVisualization: features.alternativePortVisualization })),
                    this.props.type !== 'ActivityForkNodeHorizontal' && (react_1.default.createElement(Handle, { ports: ports, direction: uml_element_port_1.Direction.Right, onPointerDown: this.onPointerDown, onPointerUp: this.onPointerUp, alternativePortVisualization: features.alternativePortVisualization })),
                    this.props.type !== 'ActivityForkNode' && (react_1.default.createElement(Handle, { ports: ports, direction: uml_element_port_1.Direction.Down, onPointerDown: this.onPointerDown, onPointerUp: this.onPointerUp, alternativePortVisualization: features.alternativePortVisualization })),
                    this.props.type !== 'ActivityForkNodeHorizontal' && (react_1.default.createElement(Handle, { ports: ports, direction: uml_element_port_1.Direction.Left, onPointerDown: this.onPointerDown, onPointerUp: this.onPointerUp, alternativePortVisualization: features.alternativePortVisualization })),
                    this.props.type === 'ActivityForkNode' && this.props.element.bounds.height > 120 && (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(Handle, { ports: ports, direction: uml_element_port_1.Direction.Upright, onPointerDown: this.onPointerDown, onPointerUp: this.onPointerUp, alternativePortVisualization: features.alternativePortVisualization }),
                        react_1.default.createElement(Handle, { ports: ports, direction: uml_element_port_1.Direction.Upleft, onPointerDown: this.onPointerDown, onPointerUp: this.onPointerUp, alternativePortVisualization: features.alternativePortVisualization }),
                        react_1.default.createElement(Handle, { ports: ports, direction: uml_element_port_1.Direction.Downright, onPointerDown: this.onPointerDown, onPointerUp: this.onPointerUp, alternativePortVisualization: features.alternativePortVisualization }),
                        react_1.default.createElement(Handle, { ports: ports, direction: uml_element_port_1.Direction.Downleft, onPointerDown: this.onPointerDown, onPointerUp: this.onPointerUp, alternativePortVisualization: features.alternativePortVisualization }))),
                    this.props.type === 'ActivityForkNodeHorizontal' && this.props.element.bounds.width > 120 && (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(Handle, { ports: ports, direction: uml_element_port_1.Direction.Topright, onPointerDown: this.onPointerDown, onPointerUp: this.onPointerUp, alternativePortVisualization: features.alternativePortVisualization }),
                        react_1.default.createElement(Handle, { ports: ports, direction: uml_element_port_1.Direction.Topleft, onPointerDown: this.onPointerDown, onPointerUp: this.onPointerUp, alternativePortVisualization: features.alternativePortVisualization }),
                        react_1.default.createElement(Handle, { ports: ports, direction: uml_element_port_1.Direction.Bottomright, onPointerDown: this.onPointerDown, onPointerUp: this.onPointerUp, alternativePortVisualization: features.alternativePortVisualization }),
                        react_1.default.createElement(Handle, { ports: ports, direction: uml_element_port_1.Direction.Bottomleft, onPointerDown: this.onPointerDown, onPointerUp: this.onPointerUp, alternativePortVisualization: features.alternativePortVisualization })))))));
        };
        return Connectable;
    }(react_1.Component));
    return enhance(Connectable);
};
exports.connectable = connectable;
var templateObject_1;
//# sourceMappingURL=connectable.js.map