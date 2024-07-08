"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.I18nProvider = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var de_json_1 = tslib_1.__importDefault(require("../../i18n/de.json"));
var en_json_1 = tslib_1.__importDefault(require("../../i18n/en.json"));
var editor_types_1 = require("../../services/editor/editor-types");
var i18n_context_1 = require("./i18n-context");
var defaultLocale = editor_types_1.Locale.en;
var dictionary = (_a = {},
    _a[editor_types_1.Locale.de] = de_json_1.default,
    _a[editor_types_1.Locale.en] = en_json_1.default,
    _a);
var I18nProvider = /** @class */ (function (_super) {
    tslib_1.__extends(I18nProvider, _super);
    function I18nProvider() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.translate = function (key) {
            try {
                var translations = dictionary[_this.props.locale];
                var translation = key.split('.').reduce(function (result, current) { return result[current]; }, translations);
                if (!translation) {
                    translations = dictionary[defaultLocale];
                    translation = key.split('.').reduce(function (result, current) { return result[current]; }, translations);
                }
                return translation;
            }
            catch (error) {
                // tslint:disable-next-line:no-console
                console.error(error);
                return '';
            }
        };
        return _this;
    }
    I18nProvider.prototype.render = function () {
        var value = {
            translate: this.translate,
        };
        return react_1.default.createElement(i18n_context_1.I18nProvider, { value: value }, this.props.children);
    };
    I18nProvider.defaultProps = {
        locale: defaultLocale,
    };
    return I18nProvider;
}(react_1.Component));
exports.I18nProvider = I18nProvider;
//# sourceMappingURL=i18n-provider.js.map