"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Editor = void 0;
var tslib_1 = require("tslib");
var styles_1 = require("../theme/styles");
var react_1 = tslib_1.__importStar(require("react"));
var react_redux_1 = require("react-redux");
var is_mobile_1 = tslib_1.__importDefault(require("is-mobile"));
var uml_element_repository_1 = require("../../services/uml-element/uml-element-repository");
var editor_repository_1 = require("../../services/editor/editor-repository");
var clamp_1 = require("../../utils/clamp");
var zoom_pane_1 = require("./zoom-pane");
var minScale = 0.5;
var maxScale = 5.0;
var grid = 10;
var subdivisions = 5;
var borderWidth = 1;
var StyledEditor = styles_1.styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: block;\n  overflow: auto;\n\n  position: relative;\n  min-height: inherit;\n  max-height: inherit;\n\n  width: ", "%;\n  height: ", "%;\n\n  -ms-overflow-style: -ms-autohiding-scrollbar;\n  border: ", "px solid ", ";\n  background-position: calc(50% + ", "px)\n    calc(50% + ", "px);\n  background-size:\n    ", "px ", "px,\n    ", "px ", "px,\n    ", "px ", "px,\n    ", "px ", "px;\n  background-image: linear-gradient(to right, ", " 1px, transparent 1px),\n    linear-gradient(to bottom, ", " 1px, transparent 1px),\n    linear-gradient(to right, ", " 1px, transparent 1px),\n    linear-gradient(to bottom, ", " 1px, transparent 1px);\n  background-repeat: repeat;\n  background-attachment: local;\n  transition:\n    transform 500ms,\n    width 500ms,\n    height 500ms;\n  transform-origin: top left;\n  transform: scale(", ");\n"], ["\n  display: block;\n  overflow: auto;\n\n  position: relative;\n  min-height: inherit;\n  max-height: inherit;\n\n  width: ", "%;\n  height: ", "%;\n\n  -ms-overflow-style: -ms-autohiding-scrollbar;\n  border: ", "px solid ", ";\n  background-position: calc(50% + ", "px)\n    calc(50% + ", "px);\n  background-size:\n    ", "px ", "px,\n    ", "px ", "px,\n    ", "px ", "px,\n    ", "px ", "px;\n  background-image: linear-gradient(to right, ", " 1px, transparent 1px),\n    linear-gradient(to bottom, ", " 1px, transparent 1px),\n    linear-gradient(to right, ", " 1px, transparent 1px),\n    linear-gradient(to bottom, ", " 1px, transparent 1px);\n  background-repeat: repeat;\n  background-attachment: local;\n  transition:\n    transform 500ms,\n    width 500ms,\n    height 500ms;\n  transform-origin: top left;\n  transform: scale(", ");\n"])), function (props) { return (0, clamp_1.clamp)(100 / props.scale, 100, 100 / minScale); }, function (props) { return (0, clamp_1.clamp)(100 / props.scale, 100, 100 / minScale); }, borderWidth, function (props) { return props.theme.color.gray; }, (grid * subdivisions - borderWidth) / 2, (grid * subdivisions - borderWidth) / 2, grid * subdivisions, grid * subdivisions, grid * subdivisions, grid * subdivisions, grid, grid, grid, grid, function (props) { return props.theme.color.grid; }, function (props) { return props.theme.color.grid; }, function (props) { return props.theme.color.gray; }, function (props) { return props.theme.color.gray; }, function (props) { var _a; return (_a = props.scale) !== null && _a !== void 0 ? _a : 1; });
var enhance = (0, react_redux_1.connect)(function (state) { return ({
    moving: tslib_1.__spreadArray([], tslib_1.__read(state.moving), false),
    connecting: state.connecting.length > 0,
    reconnecting: Object.keys(state.reconnecting).length > 0,
    scale: state.editor.zoomFactor,
}); }, {
    move: uml_element_repository_1.UMLElementRepository.move,
    setZoomFactor: editor_repository_1.EditorRepository.setZoomFactor,
});
var getInitialState = function () {
    return {
        scrollingDisabled: false,
        gestureStartZoomFactor: 1.0,
        isMobile: (0, is_mobile_1.default)({ tablet: true }),
    };
};
var SCROLL_BORDER = 100;
var SCROLL_DISTANCE = 5;
var EditorComponent = /** @class */ (function (_super) {
    tslib_1.__extends(EditorComponent, _super);
    function EditorComponent() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.state = getInitialState();
        _this.editor = (0, react_1.createRef)();
        _this.zoomContainer = (0, react_1.createRef)();
        _this.customScrolling = function (event) {
            var _a = _this.props.scale, scale = _a === void 0 ? 1 : _a;
            if (_this.editor.current) {
                var clientRect = _this.editor.current.getBoundingClientRect();
                var touch = event.touches[event.touches.length - 1];
                // scroll when on the edge of the element
                var scrollHorizontally = touch.clientX * scale < clientRect.x + SCROLL_BORDER
                    ? -SCROLL_DISTANCE
                    : touch.clientX * scale > clientRect.x + clientRect.width - SCROLL_BORDER
                        ? SCROLL_DISTANCE
                        : 0;
                var scrollVertically = touch.clientY * scale < clientRect.y + SCROLL_BORDER
                    ? -SCROLL_DISTANCE
                    : touch.clientY * scale > clientRect.y + clientRect.height - SCROLL_BORDER
                        ? SCROLL_DISTANCE
                        : 0;
                _this.editor.current.scrollBy(scrollHorizontally, scrollVertically);
                if (_this.props.moving) {
                    _this.props.move({ x: scrollHorizontally, y: scrollVertically }, _this.props.moving);
                }
            }
            event.preventDefault();
            event.stopPropagation();
        };
        _this.activateScrolling = function (target) {
            if (target) {
                // enables default scrolling in editor
                target.style.overflow = 'auto';
                // enables pull to refresh
                document.body.style.overflowY = 'auto';
                target.style.overscrollBehavior = 'auto';
                _this.setState({ scrollingDisabled: false });
            }
        };
        _this.deactivateScrolling = function (target) {
            if (target) {
                // disables default scrolling in editor
                target.style.overflow = 'hidden';
                // disables pull to refresh
                document.body.style.overflowY = 'hidden';
                target.style.overscrollBehavior = 'none';
                _this.setState({ scrollingDisabled: true });
            }
        };
        return _this;
    }
    EditorComponent.prototype.componentDidMount = function () {
        window.addEventListener('wheel', function (event) {
            if (event.ctrlKey) {
                event.preventDefault();
            }
        }, { passive: false });
    };
    EditorComponent.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) {
        if (this.state.isMobile) {
            if (this.editor.current) {
                var _a = this.props, moving = _a.moving, connecting = _a.connecting, reconnecting = _a.reconnecting;
                var deactivateScroll = moving.length > 0 || connecting || reconnecting;
                // deactivate default scrolling and use custom scrolling
                if (deactivateScroll && !this.state.scrollingDisabled) {
                    this.deactivateScrolling(this.editor.current);
                }
                else if (!deactivateScroll && this.state.scrollingDisabled) {
                    this.activateScrolling(this.editor.current);
                }
            }
        }
    };
    EditorComponent.prototype.render = function () {
        var _this = this;
        var _a = this.props, moving = _a.moving, connecting = _a.connecting, reconnecting = _a.reconnecting, _b = _a.scale, scale = _b === void 0 ? 1.0 : _b, props = tslib_1.__rest(_a, ["moving", "connecting", "reconnecting", "scale"]);
        if (this.state.isMobile) {
            return (react_1.default.createElement("div", { ref: this.zoomContainer, style: { width: '100%', overflow: scale > 1.0 ? 'auto' : 'hidden' } },
                react_1.default.createElement(StyledEditor, tslib_1.__assign({ ref: this.editor }, props, { onTouchMove: this.customScrolling, scale: scale })),
                react_1.default.createElement(zoom_pane_1.ZoomPane, { value: scale, onChange: function (zoomFactor) { return _this.props.setZoomFactor(zoomFactor); }, min: minScale, max: maxScale, step: 0.2 })));
        }
        else {
            return (react_1.default.createElement("div", { ref: this.zoomContainer, style: { width: '100%', overflow: scale > 1.0 ? 'auto' : 'hidden' } },
                react_1.default.createElement(StyledEditor, tslib_1.__assign({ ref: this.editor }, props, { scale: scale })),
                react_1.default.createElement(zoom_pane_1.ZoomPane, { value: scale, onChange: function (zoomFactor) { return _this.props.setZoomFactor(zoomFactor); }, min: minScale, max: maxScale, step: 0.2 })));
        }
    };
    return EditorComponent;
}(react_1.Component));
exports.Editor = enhance(EditorComponent);
var templateObject_1;
//# sourceMappingURL=editor.js.map