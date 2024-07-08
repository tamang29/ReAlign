"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interactable = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_dom_1 = require("react-dom");
var react_redux_1 = require("react-redux");
var uml_element_repository_1 = require("../../../services/uml-element/uml-element-repository");
var enhance = (0, react_redux_1.connect)(function (state, props) { return ({
    hovered: state.hovered[0] === props.id,
    selected: state.interactive.includes(props.id),
}); }, {
    select: uml_element_repository_1.UMLElementRepository.makeInteractive,
    deselect: uml_element_repository_1.UMLElementRepository.unmakeInteractive,
});
var interactable = function (WrappedComponent) {
    var Interactable = /** @class */ (function (_super) {
        tslib_1.__extends(Interactable, _super);
        function Interactable() {
            var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
            _this.select = function (event) {
                if ((event.which && event.which !== 1) || !_this.props.hovered) {
                    return;
                }
                if (_this.props.selected) {
                    _this.props.deselect(_this.props.id);
                    return;
                }
                _this.props.select(_this.props.id);
            };
            return _this;
        }
        Interactable.prototype.componentDidMount = function () {
            var node = (0, react_dom_1.findDOMNode)(this);
            node.addEventListener('pointerdown', this.select);
        };
        Interactable.prototype.componentWillUnmount = function () {
            var node = (0, react_dom_1.findDOMNode)(this);
            node.removeEventListener('pointerdown', this.select);
        };
        Interactable.prototype.render = function () {
            var _a = this.props, hovered = _a.hovered, selected = _a.selected, select = _a.select, deselect = _a.deselect, props = tslib_1.__rest(_a, ["hovered", "selected", "select", "deselect"]);
            return react_1.default.createElement(WrappedComponent, tslib_1.__assign({}, props));
        };
        return Interactable;
    }(react_1.Component));
    return enhance(Interactable);
};
exports.interactable = interactable;
//# sourceMappingURL=interactable.js.map