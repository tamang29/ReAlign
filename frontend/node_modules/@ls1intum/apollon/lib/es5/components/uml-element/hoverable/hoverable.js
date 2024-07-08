"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hoverable = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_dom_1 = require("react-dom");
var react_redux_1 = require("react-redux");
var uml_element_repository_1 = require("../../../services/uml-element/uml-element-repository");
var uml_container_1 = require("../../../services/uml-container/uml-container");
var enhance = (0, react_redux_1.connect)(function (state, props) {
    return {
        // cannot emmit hover events when the selection box is active
        // or (any object is moving and the object is not a UMLContainer)
        cannotBeHovered: state.editor.selectionBoxActive ||
            (state.moving.length > 0 && !uml_container_1.UMLContainer.isUMLContainer(state.elements[props.id])),
    };
}, {
    hover: uml_element_repository_1.UMLElementRepository.hover,
    leave: uml_element_repository_1.UMLElementRepository.leave,
});
var hoverable = function (WrappedComponent) {
    var Hoverable = /** @class */ (function (_super) {
        tslib_1.__extends(Hoverable, _super);
        function Hoverable() {
            var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
            _this.enter = function (event) {
                if (!_this.props.cannotBeHovered)
                    _this.props.hover(_this.props.id);
                event.stopPropagation();
            };
            _this.leave = function (event) {
                if (!_this.props.cannotBeHovered)
                    _this.props.leave(_this.props.id);
                event.stopPropagation();
            };
            return _this;
        }
        Hoverable.prototype.componentDidMount = function () {
            var node = (0, react_dom_1.findDOMNode)(this);
            node.addEventListener('pointerenter', this.enter);
            node.addEventListener('pointerleave', this.leave);
        };
        Hoverable.prototype.componentWillUnmount = function () {
            var node = (0, react_dom_1.findDOMNode)(this);
            node.removeEventListener('pointerenter', this.enter);
            node.removeEventListener('pointerleave', this.leave);
        };
        Hoverable.prototype.render = function () {
            var _a = this.props, hover = _a.hover, leave = _a.leave, cannotBeHovered = _a.cannotBeHovered, props = tslib_1.__rest(_a, ["hover", "leave", "cannotBeHovered"]);
            return react_1.default.createElement(WrappedComponent, tslib_1.__assign({}, props));
        };
        return Hoverable;
    }(react_1.Component));
    return enhance(Hoverable);
};
exports.hoverable = hoverable;
//# sourceMappingURL=hoverable.js.map