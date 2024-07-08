"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var switch_item_1 = require("./switch-item");
var switch_styles_1 = require("./switch-styles");
var defaultProps = Object.freeze({
    color: 'primary',
    size: 'sm',
});
var Switch = /** @class */ (function (_super) {
    tslib_1.__extends(Switch, _super);
    function Switch() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.select = function (value) { return function () {
            if (!_this.props.onChange) {
                return;
            }
            _this.props.onChange(value);
        }; };
        return _this;
    }
    Switch.prototype.render = function () {
        var _this = this;
        return (react_1.default.createElement(switch_styles_1.StyledSwitch, null, react_1.Children.map(this.props.children, function (_a) {
            var props = _a.props;
            return _this.renderItem(props);
        })));
    };
    Switch.prototype.renderItem = function (item) {
        var _a = this.props, color = _a.color, size = _a.size, value = _a.value;
        return (react_1.default.createElement(switch_styles_1.StyledSwitchItem, { color: color, onClick: this.select(item.value), selected: item.value === value, size: size }, item.children));
    };
    Switch.defaultProps = defaultProps;
    Switch.Item = switch_item_1.SwitchItem;
    return Switch;
}(react_1.Component));
exports.Switch = Switch;
//# sourceMappingURL=switch.js.map