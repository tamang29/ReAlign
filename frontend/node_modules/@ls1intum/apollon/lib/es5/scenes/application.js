"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var canvas_1 = require("../components/canvas/canvas");
var canvas_context_1 = require("../components/canvas/canvas-context");
var editor_1 = require("../components/canvas/editor");
var keyboard_eventlistener_1 = require("../components/canvas/keyboard-eventlistener");
var draggable_layer_1 = require("../components/draggable/draggable-layer");
var i18n_provider_1 = require("../components/i18n/i18n-provider");
var sidebar_component_1 = require("../components/sidebar/sidebar-component");
var model_store_1 = require("../components/store/model-store");
var theme_1 = require("../components/theme/theme");
var update_pane_1 = require("../components/update-pane/update-pane");
var application_styles_1 = require("./application-styles");
var root_context_1 = require("../components/root/root-context");
var mouse_eventlistener_1 = require("../components/canvas/mouse-eventlistener");
var initialState = Object.freeze({
    canvas: null,
    root: null,
});
var Application = /** @class */ (function (_super) {
    tslib_1.__extends(Application, _super);
    function Application() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.state = initialState;
        _this.resolveInitialized = function () { return undefined; };
        _this.initializedPromise = new Promise(function (resolve) {
            _this.resolveInitialized = resolve;
        });
        _this.setCanvas = function (ref) {
            if (ref && ref.layer.current) {
                _this.setState({ canvas: tslib_1.__assign(tslib_1.__assign({}, ref), { layer: ref.layer.current }) });
            }
        };
        _this.setLayout = function (ref) {
            if (ref) {
                _this.setState({ root: ref });
            }
        };
        return _this;
    }
    Application.prototype.render = function () {
        var _this = this;
        var canvasContext = this.state.canvas ? { canvas: this.state.canvas } : null;
        var rootContext = this.state.root ? { root: this.state.root } : null;
        return (react_1.default.createElement(canvas_context_1.CanvasProvider, { value: canvasContext },
            react_1.default.createElement(root_context_1.RootProvider, { value: rootContext },
                react_1.default.createElement(model_store_1.StoreProvider, { initialState: this.props.state, patcher: this.props.patcher, ref: function (ref) {
                        var _a;
                        (_a = _this.store) !== null && _a !== void 0 ? _a : (_this.store = ref);
                        _this.resolveInitialized();
                    } },
                    react_1.default.createElement(i18n_provider_1.I18nProvider, { locale: this.props.locale },
                        react_1.default.createElement(theme_1.Theme, { styles: this.props.styles },
                            react_1.default.createElement(application_styles_1.Layout, { className: "apollon-editor", ref: this.setLayout }, rootContext && (react_1.default.createElement(draggable_layer_1.DraggableLayer, null,
                                canvasContext && (react_1.default.createElement(react_1.default.Fragment, null,
                                    react_1.default.createElement(update_pane_1.UpdatePane, null),
                                    react_1.default.createElement(sidebar_component_1.Sidebar, null),
                                    react_1.default.createElement(keyboard_eventlistener_1.KeyboardEventListener, null))),
                                react_1.default.createElement(editor_1.Editor, null,
                                    react_1.default.createElement(canvas_1.Canvas, { ref: this.setCanvas })),
                                canvasContext && (react_1.default.createElement(react_1.default.Fragment, null,
                                    react_1.default.createElement(mouse_eventlistener_1.MouseEventListener, null))))))))))));
    };
    Object.defineProperty(Application.prototype, "initialized", {
        get: function () {
            return this.initializedPromise;
        },
        enumerable: false,
        configurable: true
    });
    return Application;
}(react_1.default.Component));
exports.Application = Application;
//# sourceMappingURL=application.js.map