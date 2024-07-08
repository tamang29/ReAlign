"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localized = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var i18n_context_1 = require("./i18n-context");
function localized(Component) {
    return function LocalizedComponent(props) {
        return react_1.default.createElement(i18n_context_1.I18nConsumer, null, function (i18n) { return react_1.default.createElement(Component, tslib_1.__assign({}, props, i18n)); });
    };
}
exports.localized = localized;
//# sourceMappingURL=localized.js.map