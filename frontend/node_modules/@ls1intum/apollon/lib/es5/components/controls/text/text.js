"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Text = function (_a) {
    var children = _a.children, fill = _a.fill, _b = _a.x, x = _b === void 0 ? '50%' : _b, _c = _a.y, y = _c === void 0 ? '50%' : _c, _d = _a.dominantBaseline, dominantBaseline = _d === void 0 ? 'middle' : _d, _e = _a.textAnchor, textAnchor = _e === void 0 ? 'middle' : _e, _f = _a.fontWeight, fontWeight = _f === void 0 ? 'bold' : _f, _g = _a.pointerEvents, pointerEvents = _g === void 0 ? 'none' : _g, _h = _a.noX, noX = _h === void 0 ? false : _h, _j = _a.noY, noY = _j === void 0 ? false : _j, props = tslib_1.__rest(_a, ["children", "fill", "x", "y", "dominantBaseline", "textAnchor", "fontWeight", "pointerEvents", "noX", "noY"]);
    var pos = {};
    if (!noX) {
        pos.x = x;
    }
    if (!noY) {
        pos.y = y;
    }
    return (react_1.default.createElement("text", tslib_1.__assign({}, pos, { style: fill ? { fill: fill } : {}, dominantBaseline: dominantBaseline, textAnchor: textAnchor, fontWeight: fontWeight, pointerEvents: pointerEvents }, props), children));
};
exports.Text = Text;
//# sourceMappingURL=text.js.map