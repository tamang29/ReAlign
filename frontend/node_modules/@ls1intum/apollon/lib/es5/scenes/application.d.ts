import React from 'react';
import { DeepPartial } from 'redux';
import { CanvasComponent } from '../components/canvas/canvas';
import { PartialModelState } from '../components/store/model-state';
import { ModelStore } from '../components/store/model-store';
import { Styles } from '../components/theme/styles';
import { ILayer } from '../services/layouter/layer';
import { Locale } from '../services/editor/editor-types';
import { UMLModel } from '../typings';
import { Patcher } from '../services/patcher';
type Props = {
    patcher: Patcher<UMLModel>;
    state?: PartialModelState;
    styles?: DeepPartial<Styles>;
    locale?: Locale;
};
declare const initialState: Readonly<{
    canvas: ILayer | null;
    root: HTMLDivElement | null;
}>;
type State = typeof initialState;
export declare class Application extends React.Component<Props, State> {
    state: Readonly<{
        canvas: ILayer | null;
        root: HTMLDivElement | null;
    }>;
    store?: ModelStore;
    private resolveInitialized;
    private initializedPromise;
    setCanvas: (ref: CanvasComponent) => void;
    setLayout: (ref: HTMLDivElement) => void;
    render(): React.JSX.Element;
    get initialized(): Promise<void>;
}
export {};
