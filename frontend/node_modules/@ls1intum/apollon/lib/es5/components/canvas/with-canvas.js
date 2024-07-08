"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withCanvas = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var canvas_context_1 = require("./canvas-context");
var withCanvas = function (WrappedComponent) {
    return (0, react_1.forwardRef)(function (props, ref) { return (react_1.default.createElement(canvas_context_1.CanvasConsumer, null, function (context) { return react_1.default.createElement(WrappedComponent, tslib_1.__assign({ ref: ref }, props, context)); })); });
};
exports.withCanvas = withCanvas;
//# sourceMappingURL=with-canvas.js.map