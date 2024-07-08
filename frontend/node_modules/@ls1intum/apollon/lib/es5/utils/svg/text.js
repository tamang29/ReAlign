"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = void 0;
var tslib_1 = require("tslib");
var Text = /** @class */ (function () {
    function Text() {
    }
    Text.size = function (layer, value, styles) {
        var svg = layer.layer;
        if (!svg) {
            return { width: 0, height: 0 };
        }
        var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        Object.assign(text.style, tslib_1.__assign(tslib_1.__assign({}, styles), { visibility: 'hidden' }));
        text.appendChild(document.createTextNode(value));
        svg.appendChild(text);
        var bounds = text.getBBox();
        svg.removeChild(text);
        return { width: bounds.width, height: bounds.height };
    };
    return Text;
}());
exports.Text = Text;
//# sourceMappingURL=text.js.map