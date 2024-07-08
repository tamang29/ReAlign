"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizable = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_redux_1 = require("react-redux");
var uml_element_repository_1 = require("../../../services/uml-element/uml-element-repository");
var point_1 = require("../../../utils/geometry/point");
var styles_1 = require("../../theme/styles");
var initialState = {
    resizing: false,
    offset: new point_1.Point(),
};
var enhance = (0, react_redux_1.connect)(function (state) { return ({
    zoomFactor: state.editor.zoomFactor,
    selectionBoxActive: state.editor.selectionBoxActive,
}); }, {
    start: uml_element_repository_1.UMLElementRepository.startResizing,
    resize: uml_element_repository_1.UMLElementRepository.resize,
    end: uml_element_repository_1.UMLElementRepository.endResizing,
});
var Handle = {
    width: 15,
    height: 15,
    transform: 'translate(-10, -10)',
    fill: 'none',
};
var HandleBottomRight = styles_1.styled.rect.attrs(tslib_1.__assign({ x: '100%', y: '100%' }, Handle))(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  cursor: nwse-resize;\n"], ["\n  cursor: nwse-resize;\n"])));
var HandleTopLeft = styles_1.styled.rect.attrs(tslib_1.__assign({ x: '0%', y: '0%' }, Handle))(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  cursor: nwse-resize;\n"], ["\n  cursor: nwse-resize;\n"])));
var HandleTopRight = styles_1.styled.rect.attrs(tslib_1.__assign({ x: '100%', y: '0%' }, Handle))(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  cursor: nesw-resize;\n"], ["\n  cursor: nesw-resize;\n"])));
var HandleBottomLeft = styles_1.styled.rect.attrs(tslib_1.__assign({ x: '0%', y: '100%' }, Handle))(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  cursor: nesw-resize;\n"], ["\n  cursor: nesw-resize;\n"])));
var resizable = function (options) {
    return function (WrappedComponent) {
        var Resizable = /** @class */ (function (_super) {
            tslib_1.__extends(Resizable, _super);
            function Resizable() {
                var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
                _this.state = initialState;
                _this.resize = function (width, height, resizeFrom) {
                    width = Math.round(width / 10) * 10;
                    height = Math.round(height / 10) * 10;
                    if (options && options.preventX)
                        width = 0;
                    if (options && options.preventY)
                        height = 0;
                    if (width === 0 && height === 0)
                        return;
                    _this.setState(function (state) { return ({ offset: state.offset.add(width, height) }); });
                    _this.props.resize({ width: width, height: height }, resizeFrom, _this.props.id);
                };
                _this.onPointerDown = function (event, resizeFrom) {
                    if (event.nativeEvent.which && event.nativeEvent.which !== 1) {
                        return;
                    }
                    var offset = new point_1.Point();
                    switch (resizeFrom) {
                        case "bottomRight" /* ResizeFrom.BOTTOMRIGHT */:
                            offset = new point_1.Point(event.clientX, event.clientY);
                            break;
                        case "topLeft" /* ResizeFrom.TOPLEFT */:
                            offset = new point_1.Point(-event.clientX, -event.clientY);
                            break;
                        case "topRight" /* ResizeFrom.TOPRIGHT */:
                            offset = new point_1.Point(event.clientX, -event.clientY);
                            break;
                        case "bottomLeft" /* ResizeFrom.BOTTOMLEFT */:
                            offset = new point_1.Point(-event.clientX, event.clientY);
                            break;
                    }
                    _this.setState({ resizing: true, offset: offset.scale(1 / _this.props.zoomFactor) });
                    _this.props.start(_this.props.id);
                    var element = event.currentTarget;
                    element.setPointerCapture(event.pointerId);
                    element.addEventListener('pointermove', _this.onPointerMove);
                    element.setAttribute('resizeFrom', resizeFrom);
                    element.addEventListener('pointerup', _this.onPointerUp, { once: true });
                };
                _this.onPointerMove = function (event) {
                    var resizeFrom = event.currentTarget.getAttribute('resizeFrom');
                    var width = 0;
                    var height = 0;
                    switch (resizeFrom) {
                        case "bottomRight" /* ResizeFrom.BOTTOMRIGHT */:
                            width = event.clientX / _this.props.zoomFactor - _this.state.offset.x;
                            height = event.clientY / _this.props.zoomFactor - _this.state.offset.y;
                            break;
                        case "topLeft" /* ResizeFrom.TOPLEFT */:
                            width = -event.clientX / _this.props.zoomFactor - _this.state.offset.x;
                            height = -event.clientY / _this.props.zoomFactor - _this.state.offset.y;
                            break;
                        case "topRight" /* ResizeFrom.TOPRIGHT */:
                            width = event.clientX / _this.props.zoomFactor - _this.state.offset.x;
                            height = -event.clientY / _this.props.zoomFactor - _this.state.offset.y;
                            break;
                        case "bottomLeft" /* ResizeFrom.BOTTOMLEFT */:
                            width = -event.clientX / _this.props.zoomFactor - _this.state.offset.x;
                            height = event.clientY / _this.props.zoomFactor - _this.state.offset.y;
                            break;
                    }
                    _this.resize(width, height, resizeFrom);
                    event.stopPropagation();
                };
                _this.onPointerUp = function (event) {
                    var element = event.currentTarget;
                    if (!element) {
                        return;
                    }
                    element.releasePointerCapture(event.pointerId);
                    element.removeEventListener('pointermove', _this.onPointerMove);
                    _this.setState(initialState);
                    _this.props.end(_this.props.id);
                    event.stopPropagation();
                };
                return _this;
            }
            Resizable.prototype.componentWillUnmount = function () {
                document.removeEventListener('pointermove', this.onPointerMove);
                document.removeEventListener('pointerup', this.onPointerUp);
            };
            Resizable.prototype.render = function () {
                var _this = this;
                var _a = this.props, start = _a.start, resize = _a.resize, end = _a.end, selectionBoxActive = _a.selectionBoxActive, props = tslib_1.__rest(_a, ["start", "resize", "end", "selectionBoxActive"]);
                return (react_1.default.createElement(WrappedComponent, tslib_1.__assign({}, props),
                    props.children,
                    react_1.default.createElement(HandleBottomRight, { onPointerDown: function (e) {
                            _this.onPointerDown(e, "bottomRight" /* ResizeFrom.BOTTOMRIGHT */);
                        }, pointerEvents: selectionBoxActive ? 'none' : 'all' }),
                    react_1.default.createElement(HandleTopLeft, { onPointerDown: function (e) {
                            _this.onPointerDown(e, "topLeft" /* ResizeFrom.TOPLEFT */);
                        }, pointerEvents: selectionBoxActive ? 'none' : 'all' }),
                    react_1.default.createElement(HandleTopRight, { onPointerDown: function (e) {
                            _this.onPointerDown(e, "topRight" /* ResizeFrom.TOPRIGHT */);
                        }, pointerEvents: selectionBoxActive ? 'none' : 'all' }),
                    react_1.default.createElement(HandleBottomLeft, { onPointerDown: function (e) {
                            _this.onPointerDown(e, "bottomLeft" /* ResizeFrom.BOTTOMLEFT */);
                        }, pointerEvents: selectionBoxActive ? 'none' : 'all' })));
            };
            return Resizable;
        }(react_1.Component));
        return enhance(Resizable);
    };
};
exports.resizable = resizable;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=resizable.js.map