"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = void 0;
// tslint:disable-next-line:ban-types
function debounce(func, wait) {
    if (wait === void 0) { wait = 0; }
    var timeout;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // @ts-ignore
        var context = this;
        clearTimeout(timeout);
        timeout = window.setTimeout(function () { return func.apply(context, args); }, wait > 0 ? wait : 300);
    };
}
exports.debounce = debounce;
//# sourceMappingURL=debounce.js.map