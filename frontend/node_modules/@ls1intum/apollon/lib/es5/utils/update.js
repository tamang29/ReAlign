"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = void 0;
var tslib_1 = require("tslib");
var update = function (target, source) {
    var e_1, _a, _b;
    var clone = tslib_1.__assign({}, target);
    try {
        for (var _c = tslib_1.__values(Object.entries(source)), _d = _c.next(); !_d.done; _d = _c.next()) {
            var _e = tslib_1.__read(_d.value, 2), key = _e[0], value = _e[1];
            if (value instanceof Object) {
                value = (0, exports.update)(clone[key], value);
            }
            clone = tslib_1.__assign(tslib_1.__assign({}, clone), (_b = {}, _b[key] = value, _b));
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return clone;
};
exports.update = update;
//# sourceMappingURL=update.js.map