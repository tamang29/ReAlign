import { Saga } from 'redux-saga';
import { Effect } from 'redux-saga/effects';
import { Action } from './actions';
export declare const isInternal: <T extends Action<any>>(action: T) => boolean;
export declare function composeSaga(sagas: Saga[]): Effect;
export declare function run(sagas: Saga[]): Effect;
export declare const keepAlive: (saga: Saga) => Effect;
export declare const safely: (saga: Saga) => Saga;
