import { Reducer } from 'redux';
import { Patcher } from './patcher';
export type PatcherReducerOptions<T, U = T> = {
    /**
     * Transforms the state after applying the patch. This is useful
     * when the internal store schema differs from the schema exposed to the outside.
     * @param state The state in the external schema.
     * @returns The state in the internal schema.
     */
    transform?: (state: T) => U;
    /**
     * Transforms the state before applying the patch. This is useful
     * when the internal store schema differs from the schema exposed to the outside.
     * @param state The state in the internal schema.
     * @returns The state in the external schema.
     */
    transformInverse?: (state: U) => T;
    /**
     * Merges the old state with the new state. This is useful when naive strategies
     * like `Object.assign` would trigger unwanted side-effects and more context-aware merging
     * of state is required.
     * @param oldState
     * @param newState
     * @returns The merged state.
     */
    merge?: (oldState: U, newState: U) => U;
};
/**
 * Creates a reducer that applies patches to the state using
 * given patcher.
 * @param patcher The patcher to use.
 * @param options Options for the reducer.
 */
export declare function createPatcherReducer<T, U = T>(patcher: Patcher<T>, options?: PatcherReducerOptions<T, U>): Reducer<U>;
