import { Reducer } from 'redux';
import { Actions } from '../actions';
import { CopyState } from './copy-types';
/**
 * only uses for copy paste without clipboard
 * @param state
 * @param action
 * @constructor
 */
export declare const CopyReducer: Reducer<CopyState, Actions>;
