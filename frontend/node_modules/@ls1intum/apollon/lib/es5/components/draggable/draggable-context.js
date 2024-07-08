"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DraggableProvider = exports.DraggableConsumer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
exports.DraggableConsumer = (_a = react_1.default.createContext({
    onDragStart: function (event) { return new Promise(function (_, reject) { return reject(); }); },
    onDragEnd: function (owner) { return function (event) {
        return;
    }; },
}), _a.Consumer), exports.DraggableProvider = _a.Provider;
//# sourceMappingURL=draggable-context.js.map