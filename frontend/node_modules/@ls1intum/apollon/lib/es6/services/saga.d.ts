import { SagaIterator } from 'redux-saga';
import { ILayer } from './layouter/layer';
export type SagaContext = {
    layer: ILayer | null;
};
export declare function saga(): SagaIterator;
