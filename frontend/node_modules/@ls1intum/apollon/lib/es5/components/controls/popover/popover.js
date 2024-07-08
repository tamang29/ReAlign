"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Popover = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var popover_styles_1 = require("./popover-styles");
exports.Popover = (0, react_1.forwardRef)(function (_a, ref) {
    var children = _a.children, _b = _a.placement, placement = _b === void 0 ? 'right' : _b, _c = _a.alignment, alignment = _c === void 0 ? 'center' : _c, maxHeight = _a.maxHeight, props = tslib_1.__rest(_a, ["children", "placement", "alignment", "maxHeight"]);
    return (react_1.default.createElement(popover_styles_1.PopoverContainer, tslib_1.__assign({ ref: ref, placement: placement, alignment: alignment }, props),
        react_1.default.createElement(popover_styles_1.Arrow, { placement: placement, alignment: alignment }),
        react_1.default.createElement(popover_styles_1.PopoverBody, { maxHeight: maxHeight }, children)));
});
//# sourceMappingURL=popover.js.map