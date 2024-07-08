"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorBoundary = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var ErrorBoundary = /** @class */ (function (_super) {
    tslib_1.__extends(ErrorBoundary, _super);
    function ErrorBoundary(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { hasError: false };
        return _this;
    }
    ErrorBoundary.prototype.componentDidCatch = function (error, errorInfo) {
        this.setState({ hasError: true, error: error });
    };
    ErrorBoundary.prototype.render = function () {
        if (this.state.hasError && this.state.error) {
            // restore the state immediately
            this.props.onError(this.state.error);
            return null;
        }
        return this.props.children;
    };
    return ErrorBoundary;
}(React.Component));
exports.ErrorBoundary = ErrorBoundary;
//# sourceMappingURL=ErrorBoundary.js.map