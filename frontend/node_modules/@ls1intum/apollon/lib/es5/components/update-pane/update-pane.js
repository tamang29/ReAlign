"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePane = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_dom_1 = require("react-dom");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var popups_1 = require("../../packages/popups");
var editor_types_1 = require("../../services/editor/editor-types");
var uml_element_repository_1 = require("../../services/uml-element/uml-element-repository");
var uml_relationship_1 = require("../../services/uml-relationship/uml-relationship");
var path_1 = require("../../utils/geometry/path");
var assessment_1 = require("../assessment/assessment");
var with_canvas_1 = require("../canvas/with-canvas");
var popover_1 = require("../controls/popover/popover");
var with_root_1 = require("../root/with-root");
var enhance = (0, redux_1.compose)(with_canvas_1.withCanvas, with_root_1.withRoot, (0, react_redux_1.connect)(function (state) { return ({
    element: state.elements[state.updating[0]],
    disabled: !state.editor.enablePopups,
    mode: state.editor.mode,
}); }, {
    updateEnd: uml_element_repository_1.UMLElementRepository.updateEnd,
    getAbsolutePosition: uml_element_repository_1.UMLElementRepository.getAbsolutePosition,
}));
var initialState = Object.freeze({
    position: null,
    placement: undefined,
    alignment: undefined,
});
var UnwrappedUpdatePane = /** @class */ (function (_super) {
    tslib_1.__extends(UnwrappedUpdatePane, _super);
    function UnwrappedUpdatePane() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.state = initialState;
        _this.popover = (0, react_1.createRef)();
        _this.show = function () {
            _this.position(_this.props);
            document.addEventListener('pointerdown', _this.onPointerDown);
            var canvas = _this.props.canvas.layer.parentElement;
            if (canvas) {
                canvas.addEventListener('scroll', _this.onScroll);
            }
        };
        _this.dismiss = function () {
            _this.setState(initialState);
            document.removeEventListener('pointerdown', _this.onPointerDown);
            var canvas = _this.props.canvas.layer.parentElement;
            if (canvas) {
                canvas.removeEventListener('scroll', _this.onScroll);
            }
            if (_this.props.element) {
                _this.props.updateEnd(_this.props.element.id);
            }
        };
        _this.position = function (_a) {
            var element = _a.element, canvas = _a.canvas;
            var container = canvas.layer.parentElement;
            if (element && container) {
                var absolute = _this.props
                    // relative to drawing area (0,0)
                    .getAbsolutePosition(element.id)
                    .add(canvas
                    .origin()
                    .subtract(_this.props.root.getBoundingClientRect().x, _this.props.root.getBoundingClientRect().y));
                var elementCenter = absolute.add(element.bounds.width / 2, element.bounds.height / 2);
                var position = absolute;
                // calculate if element is in half or right position of canvas (drawing area) and align popup
                var canvasBounds = container.getBoundingClientRect();
                var placement = elementCenter.x < canvasBounds.width / 2 ? 'right' : 'left';
                var alignment = elementCenter.y < canvasBounds.height / 2 ? 'start' : 'end';
                if (uml_relationship_1.UMLRelationship.isUMLRelationship(element)) {
                    var path = new path_1.Path(element.path);
                    var p = path.position(path.length / 2);
                    position.x += p.x;
                    position.y += p.y;
                    if (alignment === 'start') {
                        position.y -= 15;
                    }
                    if (alignment === 'end') {
                        position.y += 15;
                    }
                }
                else {
                    if (placement === 'right') {
                        // add width to be on right side of element
                        position.x += element.bounds.width;
                    }
                    if (alignment === 'end') {
                        // add height to be at the bottom of element
                        position.y += element.bounds.height;
                    }
                }
                _this.setState({ position: position, alignment: alignment, placement: placement });
            }
        };
        _this.onPointerDown = function (event) {
            if (_this.popover.current && event.target instanceof HTMLElement && _this.popover.current.contains(event.target)) {
                return;
            }
            _this.dismiss();
        };
        _this.onScroll = function (event) {
            _this.dismiss();
        };
        return _this;
    }
    UnwrappedUpdatePane.prototype.componentDidUpdate = function (prevProps) {
        if (!prevProps.element && this.props.element) {
            setTimeout(this.show, 0);
        }
        else if (prevProps.element && this.props.element && prevProps.element !== this.props.element) {
            this.position(this.props);
        }
    };
    UnwrappedUpdatePane.prototype.render = function () {
        var _a = this.props, element = _a.element, disabled = _a.disabled, mode = _a.mode;
        var _b = this.state, position = _b.position, alignment = _b.alignment, placement = _b.placement;
        if (!element || disabled || !position) {
            return null;
        }
        var CustomPopupComponent;
        if (mode === editor_types_1.ApollonMode.Assessment) {
            CustomPopupComponent = assessment_1.Assessment;
        }
        else {
            CustomPopupComponent = popups_1.Popups[element.type];
        }
        if (!CustomPopupComponent) {
            return null;
        }
        return (0, react_dom_1.createPortal)(react_1.default.createElement(popover_1.Popover, { ref: this.popover, position: position, placement: placement, alignment: alignment, maxHeight: 500 },
            react_1.default.createElement(CustomPopupComponent, { element: element })), this.props.root);
    };
    return UnwrappedUpdatePane;
}(react_1.Component));
exports.UpdatePane = enhance(UnwrappedUpdatePane);
//# sourceMappingURL=update-pane.js.map