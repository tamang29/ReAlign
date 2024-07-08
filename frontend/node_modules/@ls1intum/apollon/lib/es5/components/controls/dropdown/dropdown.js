"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dropdown = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var dropdown_button_1 = require("./dropdown-button");
var dropdown_item_1 = require("./dropdown-item");
var dropdown_menu_1 = require("./dropdown-menu");
var dropdown_styles_1 = require("./dropdown-styles");
var defaultProps = Object.freeze({
    color: 'primary',
    outline: true,
    placeholder: '',
    size: 'sm',
});
var intialState = Object.freeze({
    show: false,
    top: 0,
    left: 0,
    width: 0,
});
var Dropdown = /** @class */ (function (_super) {
    tslib_1.__extends(Dropdown, _super);
    function Dropdown() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.state = intialState;
        _this.activator = (0, react_1.createRef)();
        _this.dismiss = function () {
            if (_this.activator.current) {
                var parent_1 = _this.getScrollableParent(_this.activator.current);
                parent_1.removeEventListener('scroll', _this.dismiss);
            }
            document.removeEventListener('click', _this.dismiss);
            _this.setState({ show: false });
        };
        _this.select = function (value) { return function () {
            if (!_this.props.onChange) {
                return;
            }
            _this.props.onChange(value);
        }; };
        _this.show = function (event) {
            if (!_this.activator.current) {
                return;
            }
            var parent = _this.getScrollableParent(_this.activator.current);
            var parentBounds = parent.getBoundingClientRect();
            var activatorBounds = _this.activator.current.getBoundingClientRect();
            _this.setState({
                show: true,
                top: activatorBounds.top - parentBounds.top + activatorBounds.height,
                left: activatorBounds.left - parentBounds.left,
                width: activatorBounds.width,
            });
            parent.addEventListener('scroll', _this.dismiss, { once: true });
            document.addEventListener('click', _this.dismiss, { once: true });
            event.stopPropagation();
        };
        _this.getScrollableParent = function (element) {
            var style = getComputedStyle(element);
            var isScrollable = /(auto|scroll)/.test([style.overflow, style.overflowY, style.overflowX].join(''));
            if (isScrollable) {
                return element;
            }
            var parent = element.parentElement;
            if (parent) {
                return _this.getScrollableParent(parent);
            }
            return document.body;
        };
        return _this;
    }
    Dropdown.prototype.componentWillUnmount = function () {
        document.removeEventListener('click', this.dismiss);
    };
    Dropdown.prototype.render = function () {
        var _this = this;
        var _a = this.props, color = _a.color, outline = _a.outline, size = _a.size;
        var _b = this.state, show = _b.show, top = _b.top, left = _b.left, width = _b.width;
        var selected = react_1.Children.toArray(this.props.children).find(function (item) { return item.props.value === _this.props.value; });
        return (react_1.default.createElement(dropdown_styles_1.StyledDropdown, null,
            react_1.default.createElement(dropdown_button_1.DropdownButton, { ref: this.activator, color: color, onClick: function (event) { return _this.show(event); }, outline: outline, size: size }, selected ? selected.props.children : this.props.placeholder),
            show && (react_1.default.createElement(dropdown_menu_1.DropdownMenu, { style: { top: top, left: left, minWidth: width } }, react_1.Children.map(this.props.children, function (_a) {
                var props = _a.props;
                return _this.renderItem(props);
            })))));
    };
    Dropdown.prototype.renderItem = function (item) {
        var size = this.props.size;
        return (react_1.default.createElement(dropdown_styles_1.StyledDropdownItem, { size: size, onClick: this.select(item.value) }, item.children));
    };
    Dropdown.defaultProps = defaultProps;
    Dropdown.Item = dropdown_item_1.DropdownItem;
    return Dropdown;
}(react_1.Component));
exports.Dropdown = Dropdown;
//# sourceMappingURL=dropdown.js.map