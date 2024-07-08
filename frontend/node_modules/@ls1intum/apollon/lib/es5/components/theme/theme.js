"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Theme = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var styled_components_1 = require("styled-components");
var update_1 = require("../../utils/update");
var styles_1 = require("./styles");
var defaultProps = {
    styles: {},
};
var Theme = /** @class */ (function (_super) {
    tslib_1.__extends(Theme, _super);
    function Theme() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.theme = (0, update_1.update)((0, styles_1.defaults)(), _this.props.styles);
        return _this;
    }
    Theme.prototype.render = function () {
        return react_1.default.createElement(styled_components_1.ThemeProvider, { theme: this.theme }, this.props.children);
    };
    Theme.defaultProps = defaultProps;
    return Theme;
}(react_1.Component));
exports.Theme = Theme;
//# sourceMappingURL=theme.js.map