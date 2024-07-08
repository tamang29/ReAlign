"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Textfield = exports.defaultProps = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var textfield_styled_1 = require("./textfield-styled");
exports.defaultProps = Object.freeze({
    block: true,
    gutter: false,
    multiline: false,
    outline: false,
    readonly: false,
    size: 'sm',
    enterToSubmit: true,
});
var getInitialState = function () { return ({
    key: Date.now(),
    currentValue: undefined,
}); };
var Textfield = /** @class */ (function (_super) {
    tslib_1.__extends(Textfield, _super);
    function Textfield() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.state = getInitialState();
        _this.ref = react_1.default.createRef();
        _this.onBlur = function (_a) {
            var currentTarget = _a.currentTarget;
            var value = typeof _this.props.value === 'number' ? +currentTarget.value : currentTarget.value;
            if (!value || !_this.props.onSubmit) {
                return;
            }
            _this.props.onSubmit(value);
            _this.setState(getInitialState());
        };
        _this.onChange = function (_a) {
            var currentTarget = _a.currentTarget;
            var value = typeof _this.props.value === 'number' ? +currentTarget.value : currentTarget.value;
            _this.setState({ currentValue: value });
            if (!_this.props.onChange) {
                return;
            }
            _this.props.onChange(value);
        };
        _this.onKeyUp = function (_a) {
            var key = _a.key, currentTarget = _a.currentTarget;
            var value = typeof _this.props.value === 'number' ? +currentTarget.value : currentTarget.value;
            switch (key) {
                case 'Enter':
                    if (_this.props.enterToSubmit) {
                        currentTarget.blur();
                        _this.onSubmitKeyUp(key, value);
                    }
                    break;
                case 'Escape':
                    currentTarget.blur();
                    _this.onSubmitKeyUp(key, value);
                    break;
                default:
            }
        };
        _this.onSubmitKeyUp = function (key, value) {
            if (!_this.props.onSubmitKeyUp) {
                return;
            }
            if (key === 'Enter' && !_this.props.enterToSubmit) {
                return;
            }
            _this.props.onSubmitKeyUp(key, value);
        };
        return _this;
    }
    Textfield.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) {
        // workaround for infinity values -> if set to infinity -> change key of component to avoid problems with textfield
        if (Number.isFinite(prevProps.value) && !Number.isFinite(this.props.value)) {
            this.setState({ key: Date.now() });
        }
    };
    Textfield.prototype.componentWillUnmount = function () {
        if (!this.state.currentValue || !this.props.onSubmit) {
            return;
        }
        this.props.onSubmit(this.state.currentValue);
    };
    Textfield.prototype.render = function () {
        var _a = this.props, onChange = _a.onChange, onSubmit = _a.onSubmit, onSubmitKeyUp = _a.onSubmitKeyUp, size = _a.size, value = _a.value, props = tslib_1.__rest(_a, ["onChange", "onSubmit", "onSubmitKeyUp", "size", "value"]);
        return (react_1.default.createElement(textfield_styled_1.StyledTextfield, tslib_1.__assign({ as: props.multiline ? 'textarea' : 'input', maxLength: props.multiline ? undefined : 100, key: this.state.key }, props, { size: size, defaultValue: value, onChange: this.onChange, onKeyUp: this.onKeyUp, onBlur: this.onBlur, ref: this.ref })));
    };
    Textfield.prototype.focus = function () {
        if (this.ref.current) {
            this.ref.current.focus();
        }
    };
    Textfield.defaultProps = exports.defaultProps;
    return Textfield;
}(react_1.Component));
exports.Textfield = Textfield;
//# sourceMappingURL=textfield.js.map