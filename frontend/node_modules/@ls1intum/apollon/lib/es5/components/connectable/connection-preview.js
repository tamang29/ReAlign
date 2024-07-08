"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionPreview = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var uml_element_repository_1 = require("../../services/uml-element/uml-element-repository");
var uml_relationship_repository_1 = require("../../services/uml-relationship/uml-relationship-repository");
var point_1 = require("../../utils/geometry/point");
var with_canvas_1 = require("../canvas/with-canvas");
var uml_relationship_preview_1 = require("./uml-relationship-preview");
var is_mobile_1 = tslib_1.__importDefault(require("is-mobile"));
var enhance = (0, redux_1.compose)(with_canvas_1.withCanvas, (0, react_redux_1.connect)(function (state) { return ({
    connecting: tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(state.connecting), false), tslib_1.__read(Object.keys(state.reconnecting).map(function (id) { return state.elements[id][state.reconnecting[id]]; })), false),
    zoomFactor: state.editor.zoomFactor,
}); }, {
    endConnecting: uml_element_repository_1.UMLElementRepository.endConnecting,
    endReconnecting: uml_relationship_repository_1.UMLRelationshipRepository.endReconnecting,
}));
var initialState = {
    position: null,
};
var Preview = /** @class */ (function (_super) {
    tslib_1.__extends(Preview, _super);
    function Preview() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.state = initialState;
        _this.onPointerMove = function (event) {
            var _a = _this.props.zoomFactor, zoomFactor = _a === void 0 ? 1 : _a;
            var offset = _this.props.canvas.origin();
            var position;
            if (event instanceof PointerEvent) {
                position = new point_1.Point(event.clientX - offset.x, event.clientY - offset.y).scale(1 / zoomFactor);
            }
            else {
                position = new point_1.Point(event.targetTouches[0].clientX - offset.x, event.targetTouches[0].clientY - offset.y).scale(1 / zoomFactor);
            }
            _this.setState({ position: position });
        };
        _this.onPointerUp = function (event) {
            if ((0, is_mobile_1.default)({ tablet: true })) {
                document.removeEventListener('touchend', _this.onPointerMove);
            }
            else {
                document.removeEventListener('pointermove', _this.onPointerMove);
            }
            _this.setState(initialState);
            _this.props.endConnecting();
            _this.props.endReconnecting();
        };
        return _this;
    }
    Preview.prototype.componentDidUpdate = function (prevProps) {
        if (this.props.connecting.length && prevProps.connecting !== this.props.connecting) {
            if ((0, is_mobile_1.default)({ tablet: true })) {
                document.addEventListener('touchmove', this.onPointerMove);
                document.addEventListener('touchend', this.onPointerUp, { once: true });
            }
            else {
                document.addEventListener('pointermove', this.onPointerMove);
                document.addEventListener('pointerup', this.onPointerUp, { once: true });
            }
        }
    };
    Preview.prototype.componentWillUnmount = function () {
        if ((0, is_mobile_1.default)({ tablet: true })) {
            document.removeEventListener('touchmove', this.onPointerMove);
            document.removeEventListener('touchend', this.onPointerUp);
        }
        else {
            document.removeEventListener('pointermove', this.onPointerMove);
            document.removeEventListener('pointerup', this.onPointerUp);
        }
    };
    Preview.prototype.render = function () {
        var connecting = this.props.connecting;
        var position = this.state.position;
        if (!connecting.length || !position) {
            return null;
        }
        return connecting.map(function (port, index) { return react_1.default.createElement(uml_relationship_preview_1.UMLRelationshipPreview, { key: index, port: port, target: position }); });
    };
    return Preview;
}(react_1.Component));
exports.ConnectionPreview = enhance(Preview);
//# sourceMappingURL=connection-preview.js.map