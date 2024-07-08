"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safely = exports.keepAlive = exports.run = exports.composeSaga = exports.isInternal = void 0;
var tslib_1 = require("tslib");
var symbols_1 = require("@redux-saga/symbols");
var effects_1 = require("redux-saga/effects");
var isInternal = function (action) {
    return symbols_1.SAGA_ACTION in action;
};
exports.isInternal = isInternal;
function composeSaga(sagas) {
    return (0, effects_1.all)(sagas.map(effects_1.spawn));
}
exports.composeSaga = composeSaga;
function run(sagas) {
    return (0, effects_1.all)(sagas.map(function (saga) { return (0, exports.keepAlive)((0, exports.safely)(saga)); }));
}
exports.run = run;
var keepAlive = function (saga) {
    return (0, effects_1.spawn)(function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!true) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, effects_1.call)(saga)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/];
            }
        });
    });
};
exports.keepAlive = keepAlive;
var safely = function (saga) {
    function safelySaga() {
        var e_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, effects_1.call)(saga)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    // tslint:disable-next-line
                    console.error(e_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }
    return safelySaga;
};
exports.safely = safely;
//# sourceMappingURL=sagas.js.map