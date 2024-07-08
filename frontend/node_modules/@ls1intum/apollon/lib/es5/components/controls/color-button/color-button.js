"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorButton = exports.ColorButtonComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_redux_1 = require("react-redux");
var button_1 = require("../button/button");
var roller_1 = require("../icon/roller");
function ColorButtonComponent(_a) {
    var onClick = _a.onClick, colorEnabled = _a.colorEnabled;
    if (!colorEnabled) {
        return null;
    }
    return (react_1.default.createElement(button_1.Button, { color: "link", tabIndex: -1, onClick: onClick },
        react_1.default.createElement(roller_1.RollerIcon, null)));
}
exports.ColorButtonComponent = ColorButtonComponent;
exports.ColorButton = (0, react_redux_1.connect)(function (state) { return ({
    colorEnabled: state.editor.colorEnabled,
}); })(ColorButtonComponent);
//# sourceMappingURL=color-button.js.map