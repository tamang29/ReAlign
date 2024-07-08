"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withRoot = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var root_context_1 = require("./root-context");
var withRoot = function (WrappedComponent) {
    return (0, react_1.forwardRef)(function (props, ref) { return (react_1.default.createElement(root_context_1.RootConsumer, null, function (context) { return react_1.default.createElement(WrappedComponent, tslib_1.__assign({ ref: ref }, props, context)); })); });
};
exports.withRoot = withRoot;
//# sourceMappingURL=with-root.js.map