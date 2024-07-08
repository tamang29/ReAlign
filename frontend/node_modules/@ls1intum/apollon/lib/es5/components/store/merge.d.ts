import { ModelState } from '../../components/store/model-state';
/**
 * Merges the old state with the new state. In particular, it maintains
 * all potential prototypes, and gracefully updates owned elements list in the
 * diagram. The boundaries of the diagram are NOT updated, which is to be done, if
 * necessary, by some subsequent side-effect.
 * @param oldState
 * @param newState
 * @returns The merged state.
 */
export declare function merge(oldState: ModelState, newState: ModelState): ModelState;
