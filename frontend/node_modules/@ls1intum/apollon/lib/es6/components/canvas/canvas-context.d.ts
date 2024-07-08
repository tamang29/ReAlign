/// <reference types="react" />
import { ILayer } from '../../services/layouter/layer';
export type CanvasContext = {
    canvas: ILayer;
};
export declare const CanvasConsumer: import("react").Consumer<CanvasContext | null>, CanvasProvider: import("react").Provider<CanvasContext | null>;
