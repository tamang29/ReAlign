"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectable = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_dom_1 = require("react-dom");
var react_redux_1 = require("react-redux");
var uml_element_repository_1 = require("../../../services/uml-element/uml-element-repository");
var enhance = (0, react_redux_1.connect)(function (state, props) { return ({
    hovered: state.hovered[0] === props.id,
    selected: state.selected.includes(props.id),
}); }, {
    select: uml_element_repository_1.UMLElementRepository.select,
    deselect: uml_element_repository_1.UMLElementRepository.deselect,
});
var selectable = function (WrappedComponent) {
    var Selectable = /** @class */ (function (_super) {
        tslib_1.__extends(Selectable, _super);
        function Selectable() {
            var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
            _this.select = function (event) {
                if ((event.which && event.which !== 1) || !_this.props.hovered) {
                    return;
                }
                if (event.shiftKey && _this.props.selected) {
                    _this.props.deselect(_this.props.id);
                    return;
                }
                if (!_this.props.selected) {
                    if (!event.shiftKey) {
                        _this.props.deselect();
                    }
                    _this.props.select(_this.props.id);
                }
            };
            return _this;
        }
        Selectable.prototype.componentDidMount = function () {
            var node = (0, react_dom_1.findDOMNode)(this);
            node.addEventListener('pointerdown', this.select);
        };
        Selectable.prototype.componentWillUnmount = function () {
            var node = (0, react_dom_1.findDOMNode)(this);
            node.removeEventListener('pointerdown', this.select);
        };
        Selectable.prototype.render = function () {
            var _a = this.props, hovered = _a.hovered, selected = _a.selected, select = _a.select, deselect = _a.deselect, props = tslib_1.__rest(_a, ["hovered", "selected", "select", "deselect"]);
            return react_1.default.createElement(WrappedComponent, tslib_1.__assign({}, props));
        };
        return Selectable;
    }(react_1.Component));
    return enhance(Selectable);
};
exports.selectable = selectable;
//# sourceMappingURL=selectable.js.map