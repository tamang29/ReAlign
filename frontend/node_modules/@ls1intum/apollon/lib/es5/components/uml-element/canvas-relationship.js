"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasRelationship = exports.CanvasRelationshipComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var components_1 = require("../../packages/components");
var editor_types_1 = require("../../services/editor/editor-types");
var uml_element_port_1 = require("../../services/uml-element/uml-element-port");
var uml_relationship_repository_1 = require("../../services/uml-relationship/uml-relationship-repository");
var boundary_1 = require("../../utils/geometry/boundary");
var point_1 = require("../../utils/geometry/point");
var touch_event_1 = require("../../utils/touch-event");
var styles_1 = require("../theme/styles");
var initialState = {
    offset: new point_1.Point(),
    handlerIndex: 0,
    path: [
        {
            x: 0,
            y: 0,
        },
    ],
};
var enhance = (0, redux_1.compose)(styles_1.withTheme, (0, react_redux_1.connect)(function (state, props) { return ({
    hovered: state.hovered[0] === props.id,
    selected: state.selected.includes(props.id),
    remoteSelectors: state.remoteSelection[props.id] || [],
    interactive: state.interactive.includes(props.id),
    interactable: state.editor.view === "Exporting" /* ApollonView.Exporting */ || state.editor.view === "Highlight" /* ApollonView.Highlight */,
    reconnecting: !!state.reconnecting[props.id],
    disabled: !!Object.keys(state.reconnecting).length || !!Object.keys(state.connecting).length,
    relationship: state.elements[props.id],
    mode: state.editor.mode,
    readonly: state.editor.readonly || false,
    selectionBoxActive: state.editor.selectionBoxActive,
}); }, {
    startwaypointslayout: uml_relationship_repository_1.UMLRelationshipRepository.startWaypointsLayout,
    endwaypointslayout: uml_relationship_repository_1.UMLRelationshipRepository.endWaypointsLayout,
}));
var CanvasRelationshipComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CanvasRelationshipComponent, _super);
    function CanvasRelationshipComponent() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.state = initialState;
        _this.onPointerDown = function (event, handlerIndex, point) {
            _this.setState({ handlerIndex: handlerIndex, offset: new point_1.Point(event.clientX - point.mpX, event.clientY - point.mpY) });
            document.addEventListener('pointermove', _this.onPointerMove);
            document.addEventListener('pointerup', _this.onPointerUp, { once: true });
        };
        _this.onPointerMove = function (event) {
            var handlerIndex = _this.state.handlerIndex;
            var waypointDirection = handlerIndex % 2 ? 'horizontal' : 'vertical';
            var clientEventCoordinates = (0, touch_event_1.getClientEventCoordinates)(event);
            var x = clientEventCoordinates.clientX - _this.state.offset.x;
            var y = clientEventCoordinates.clientY - _this.state.offset.y;
            // Update relationship points here
            _this.updateRelationshipPoints(waypointDirection, handlerIndex, x, y);
        };
        _this.onPointerUp = function (event) {
            _this.props.endwaypointslayout(_this.props.id);
            var element = event.currentTarget;
            element.removeEventListener('pointermove', _this.onPointerMove);
        };
        _this.updateRelationshipPoints = function (waypointDirection, handlerIndex, x, y) {
            var startPoint = handlerIndex + 1;
            var endPoint = Number(startPoint) + 1;
            var sourceDirection = _this.props.relationship.source.direction;
            switch (waypointDirection) {
                case 'horizontal':
                    sourceDirection === uml_element_port_1.Direction.Up || sourceDirection === uml_element_port_1.Direction.Down
                        ? _this.updateXCoordinate(startPoint, endPoint, x, y)
                        : _this.updateYCoordinate(startPoint, endPoint, x, y);
                    break;
                case 'vertical':
                    sourceDirection === uml_element_port_1.Direction.Up || sourceDirection === uml_element_port_1.Direction.Down
                        ? _this.updateYCoordinate(startPoint, endPoint, x, y)
                        : _this.updateXCoordinate(startPoint, endPoint, x, y);
                    break;
                default:
                    break;
            }
            var points = [new point_1.Point()];
            _this.props.relationship.path.forEach(function (path) {
                points.push(new point_1.Point(path.x, path.y));
            });
            var updatedBounds = (0, boundary_1.computeBoundingBox)(points);
            updatedBounds.x = _this.props.relationship.bounds.x;
            updatedBounds.y = _this.props.relationship.bounds.y;
            updatedBounds.width = Math.ceil(updatedBounds.width / 20) * 20;
            updatedBounds.height = Math.ceil(updatedBounds.height / 20) * 20;
            _this.setState({ path: _this.props.relationship.path });
            _this.props.startwaypointslayout(_this.props.id, _this.props.relationship.path, updatedBounds);
        };
        _this.updateXCoordinate = function (startPoint, endPoint, x, y) {
            _this.props.relationship.path[startPoint].x = x;
            _this.props.relationship.path[endPoint].x = x;
        };
        _this.updateYCoordinate = function (startPoint, endPoint, x, y) {
            _this.props.relationship.path[startPoint].y = y;
            _this.props.relationship.path[endPoint].y = y;
        };
        return _this;
    }
    CanvasRelationshipComponent.prototype.render = function () {
        var _this = this;
        var _a = this.props, hovered = _a.hovered, selected = _a.selected, remoteSelectors = _a.remoteSelectors, interactive = _a.interactive, interactable = _a.interactable, reconnecting = _a.reconnecting, disabled = _a.disabled, relationship = _a.relationship, children = _a.children, theme = _a.theme, mode = _a.mode, readonly = _a.readonly, startwaypointslayout = _a.startwaypointslayout, endwaypointslayout = _a.endwaypointslayout, selectionBoxActive = _a.selectionBoxActive, props = tslib_1.__rest(_a, ["hovered", "selected", "remoteSelectors", "interactive", "interactable", "reconnecting", "disabled", "relationship", "children", "theme", "mode", "readonly", "startwaypointslayout", "endwaypointslayout", "selectionBoxActive"]);
        // increase relationship hit box in assessment mode
        var STROKE = mode === editor_types_1.ApollonMode.Assessment ? 35 : 15;
        var ChildComponent = components_1.Components[relationship.type];
        var points = relationship.path.map(function (point) { return "".concat(point.x, " ").concat(point.y); }).join(',');
        var midPoints = [];
        relationship.path.map(function (point, index) {
            var _a, _b;
            var mpX = (relationship.path[index].x + ((_a = relationship.path[index + 1]) === null || _a === void 0 ? void 0 : _a.x)) / 2;
            var mpY = (relationship.path[index].y + ((_b = relationship.path[index + 1]) === null || _b === void 0 ? void 0 : _b.y)) / 2;
            if (!isNaN(mpX) && !isNaN(mpY))
                midPoints.push({ mpX: mpX, mpY: mpY });
        });
        midPoints.pop();
        midPoints.shift();
        var highlight = interactable && interactive
            ? theme.interactive.normal
            : interactable && hovered
                ? theme.interactive.hovered
                : hovered || selected
                    ? 'rgba(0, 100, 255, 0.2)'
                    : relationship.highlight
                        ? relationship.highlight
                        : 'rgba(0, 100, 255, 0)';
        return (react_1.default.createElement("svg", tslib_1.__assign({}, props, relationship.bounds, { visibility: reconnecting ? 'hidden' : undefined, pointerEvents: disabled ? 'none' : 'stroke' }),
            react_1.default.createElement("polyline", { points: points, stroke: highlight, fill: "none", strokeWidth: STROKE }),
            remoteSelectors.length > 0 &&
                remoteSelectors.map(function (selector) { return (react_1.default.createElement("polyline", { key: selector.name, points: points, stroke: selector.color, strokeOpacity: "0.2", strokeWidth: STROKE, fill: "none" })); }),
            react_1.default.createElement(ChildComponent, { element: uml_relationship_repository_1.UMLRelationshipRepository.get(relationship) }),
            children,
            midPoints.map(function (point, index) {
                return (react_1.default.createElement("circle", { visibility: selectionBoxActive || interactive || interactable || readonly ? 'hidden' : undefined, pointerEvents: selectionBoxActive || interactive || interactable || readonly ? 'none' : 'all', style: { cursor: 'grab' }, key: props.id + '_' + point.mpX + '_' + point.mpY, cx: point.mpX, cy: point.mpY, r: "15", onPointerDown: function (e) {
                        _this.onPointerDown(e, index, point);
                    }, fill: highlight }));
            })));
    };
    return CanvasRelationshipComponent;
}(react_1.Component));
exports.CanvasRelationshipComponent = CanvasRelationshipComponent;
exports.CanvasRelationship = enhance(CanvasRelationshipComponent);
//# sourceMappingURL=canvas-relationship.js.map