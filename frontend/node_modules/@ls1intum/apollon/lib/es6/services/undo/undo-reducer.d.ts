import { Reducer } from 'redux';
import { ModelState } from '../../components/store/model-state';
import { Action } from '../../utils/actions/actions';
import { Actions } from '../actions';
export declare const undoable: <S = ModelState, T extends Action<any> = Actions>(reducer: Reducer<S, T>) => Reducer<S, T>;
