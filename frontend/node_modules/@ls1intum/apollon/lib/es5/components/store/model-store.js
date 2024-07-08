"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreProvider = exports.ModelStore = exports.createReduxStore = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var redux_saga_1 = tslib_1.__importDefault(require("redux-saga"));
var redux_thunk_1 = tslib_1.__importDefault(require("redux-thunk"));
var layouter_repository_1 = require("../../services/layouter/layouter-repository");
var reducer_1 = require("../../services/reducer");
var saga_1 = require("../../services/saga");
var undo_reducer_1 = require("../../services/undo/undo-reducer");
var with_canvas_1 = require("../canvas/with-canvas");
var model_state_1 = require("./model-state");
var patcher_1 = require("../../services/patcher");
var merge_1 = require("./merge");
var createReduxStore = function (initialState, layer, patcher) {
    if (initialState === void 0) { initialState = {}; }
    if (layer === void 0) { layer = null; }
    var baseReducer = (0, undo_reducer_1.undoable)((0, redux_1.combineReducers)(reducer_1.reducers));
    var patchReducer = patcher &&
        (0, patcher_1.createPatcherReducer)(patcher, {
            transform: function (model) { return model_state_1.ModelState.fromModel(model); },
            transformInverse: function (state) { return model_state_1.ModelState.toModel(state); },
            merge: merge_1.merge,
        });
    var reducer = function (state, action) {
        var baseState = baseReducer(state, action);
        if (patchReducer) {
            return patchReducer(baseState, action);
        }
        else {
            return baseState;
        }
    };
    var sagaMiddleware = (0, redux_saga_1.default)({ context: { layer: layer } });
    var middleware = redux_1.applyMiddleware.apply(void 0, tslib_1.__spreadArray([], tslib_1.__read(tslib_1.__spreadArray([
        redux_thunk_1.default,
        sagaMiddleware
    ], tslib_1.__read((patcher
        ? [
            (0, patcher_1.createPatcherMiddleware)(patcher, {
                selectDiscrete: function (action) { return (0, patcher_1.isDiscreteAction)(action) || (0, patcher_1.isSelectionAction)(action); },
                selectContinuous: function (action) { return (0, patcher_1.isContinuousAction)(action); },
                transform: function (state) { return model_state_1.ModelState.toModel(state); },
            }),
        ]
        : [])), false)), false));
    var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux_1.compose;
    var enhancer = composeEnhancers(middleware);
    var store = (0, redux_1.createStore)(reducer, initialState, enhancer);
    if (layer) {
        sagaMiddleware.run(saga_1.saga);
        store.dispatch(layouter_repository_1.LayouterRepository.layout());
    }
    return store;
};
exports.createReduxStore = createReduxStore;
var getInitialState = function (initialState, layer, patcher) {
    if (initialState === void 0) { initialState = {}; }
    if (layer === void 0) { layer = null; }
    var store = (0, exports.createReduxStore)(initialState, layer, patcher);
    return { store: store };
};
var ModelStore = /** @class */ (function (_super) {
    tslib_1.__extends(ModelStore, _super);
    function ModelStore() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.state = getInitialState(_this.props.initialState, _this.props.canvas, _this.props.patcher);
        return _this;
    }
    ModelStore.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.canvas !== this.props.canvas) {
            var state = getInitialState(this.props.initialState, this.props.canvas, this.props.patcher);
            this.setState(state);
        }
    };
    ModelStore.prototype.render = function () {
        return react_1.default.createElement(react_redux_1.Provider, { store: this.state.store }, this.props.children);
    };
    return ModelStore;
}(react_1.Component));
exports.ModelStore = ModelStore;
exports.StoreProvider = (0, with_canvas_1.withCanvas)(ModelStore);
//# sourceMappingURL=model-store.js.map