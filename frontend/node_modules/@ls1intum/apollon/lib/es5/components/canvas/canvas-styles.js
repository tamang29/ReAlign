"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasContainer = void 0;
var tslib_1 = require("tslib");
var styles_1 = require("../theme/styles");
exports.CanvasContainer = styles_1.styled.svg.attrs({
    tabIndex: -1,
})(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  position: ", ";\n  top: 0;\n  left: 0;\n  min-width: 100%;\n  min-height: 100%;\n  outline: none;\n  overflow: visible;\n  transform-origin: center center;\n  fill: white;\n"], ["\n  position: ", ";\n  top: 0;\n  left: 0;\n  min-width: 100%;\n  min-height: 100%;\n  outline: none;\n  overflow: visible;\n  transform-origin: center center;\n  fill: white;\n"])), function (_a) {
    var isStatic = _a.isStatic;
    return (isStatic ? 'static' : 'absolute');
});
var templateObject_1;
//# sourceMappingURL=canvas-styles.js.map