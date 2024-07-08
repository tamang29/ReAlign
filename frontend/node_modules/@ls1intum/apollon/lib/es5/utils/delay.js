"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = void 0;
var tslib_1 = require("tslib");
var delay = function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, new Promise(function (res) { return setTimeout(res, t); })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.delay = delay;
//# sourceMappingURL=delay.js.map