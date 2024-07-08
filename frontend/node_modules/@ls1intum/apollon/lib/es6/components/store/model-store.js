import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, compose, createStore, } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import { LayouterRepository } from '../../services/layouter/layouter-repository';
import { reducers } from '../../services/reducer';
import { saga } from '../../services/saga';
import { undoable } from '../../services/undo/undo-reducer';
import { withCanvas } from '../canvas/with-canvas';
import { ModelState } from './model-state';
import { createPatcherMiddleware, createPatcherReducer, isContinuousAction, isDiscreteAction, isSelectionAction, } from '../../services/patcher';
import { merge } from './merge';
export const createReduxStore = (initialState = {}, layer = null, patcher) => {
    const baseReducer = undoable(combineReducers(reducers));
    const patchReducer = patcher &&
        createPatcherReducer(patcher, {
            transform: (model) => ModelState.fromModel(model),
            transformInverse: (state) => ModelState.toModel(state),
            merge,
        });
    const reducer = (state, action) => {
        const baseState = baseReducer(state, action);
        if (patchReducer) {
            return patchReducer(baseState, action);
        }
        else {
            return baseState;
        }
    };
    const sagaMiddleware = createSagaMiddleware({ context: { layer } });
    const middleware = applyMiddleware(...[
        thunk,
        sagaMiddleware,
        ...(patcher
            ? [
                createPatcherMiddleware(patcher, {
                    selectDiscrete: (action) => isDiscreteAction(action) || isSelectionAction(action),
                    selectContinuous: (action) => isContinuousAction(action),
                    transform: (state) => ModelState.toModel(state),
                }),
            ]
            : []),
    ]);
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const enhancer = composeEnhancers(middleware);
    const store = createStore(reducer, initialState, enhancer);
    if (layer) {
        sagaMiddleware.run(saga);
        store.dispatch(LayouterRepository.layout());
    }
    return store;
};
const getInitialState = (initialState = {}, layer = null, patcher) => {
    const store = createReduxStore(initialState, layer, patcher);
    return { store };
};
export class ModelStore extends Component {
    constructor() {
        super(...arguments);
        this.state = getInitialState(this.props.initialState, this.props.canvas, this.props.patcher);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.canvas !== this.props.canvas) {
            const state = getInitialState(this.props.initialState, this.props.canvas, this.props.patcher);
            this.setState(state);
        }
    }
    render() {
        return React.createElement(Provider, { store: this.state.store }, this.props.children);
    }
}
export const StoreProvider = withCanvas(ModelStore);
//# sourceMappingURL=model-store.js.map