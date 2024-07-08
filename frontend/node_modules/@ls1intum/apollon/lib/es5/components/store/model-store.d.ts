import React, { Component, PropsWithChildren } from 'react';
import { PreloadedState, Store } from 'redux';
import { Actions } from '../../services/actions';
import { ILayer } from '../../services/layouter/layer';
import { CanvasContext } from '../canvas/canvas-context';
import { ModelState, PartialModelState } from './model-state';
import { Patcher } from '../../services/patcher';
import { UMLModel } from '../../typings';
type OwnProps = PropsWithChildren<{
    initialState?: PreloadedState<PartialModelState>;
    patcher?: Patcher<UMLModel>;
}>;
type Props = OwnProps & CanvasContext;
export declare const createReduxStore: (initialState?: PreloadedState<PartialModelState>, layer?: ILayer | null, patcher?: Patcher<UMLModel>) => Store<ModelState, Actions>;
declare const getInitialState: (initialState?: PreloadedState<PartialModelState>, layer?: ILayer | null, patcher?: Patcher<UMLModel>) => {
    store: Store<ModelState, Actions>;
};
type State = ReturnType<typeof getInitialState>;
export declare class ModelStore extends Component<Props, State> {
    state: {
        store: Store<ModelState, Actions>;
    };
    componentDidUpdate(prevProps: Props): void;
    render(): React.JSX.Element;
}
export declare const StoreProvider: React.ForwardRefExoticComponent<Pick<Props, "children" | "initialState" | "patcher"> & React.RefAttributes<React.Component<{}, {}, any>>>;
export {};
