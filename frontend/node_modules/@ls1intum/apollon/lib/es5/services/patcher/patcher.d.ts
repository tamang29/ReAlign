import { Patch, PatchListener } from './patcher-types';
import { SignedPatch } from './patch-verifier';
/**
 * Compares two objects and returns the difference
 * in the form of a [JSON patch](http://jsonpatch.com/).
 */
export type Comparator<T> = (a: T, b: T) => Patch;
export interface PatcherOptions<T> {
    /**
     * Compares two objects and returns the difference
     * in the form of a [JSON patch](http://jsonpatch.com/).
     */
    diff: Comparator<T>;
    /**
     * The maximum frequency of continuous changes emitted by this patcher,
     * per second. Defaults to 25. This does not affect discrete changes.
     */
    maxFrequency: number;
}
/**
 * A patcher tracks changes to an object and notifies subscribers.
 * It also allows application of patches to the object.
 */
export declare class Patcher<T> {
    private _snapshot;
    private subscribers;
    private discreteRouter;
    private continuousRouter;
    private continuousPatchObservable;
    private observable;
    private verifier;
    readonly options: PatcherOptions<T>;
    /**
     * @param diff A function that compares two objects and returns the difference
     * in the form of a [JSON patch](http://jsonpatch.com/).
     */
    constructor(options?: Partial<PatcherOptions<T>>);
    /**
     * @returns The current state of the object.
     */
    get snapshot(): T | undefined;
    /**
     * Updates its snapshots, checks for changes and notifies subscribers.
     * @param nextState The next state of the object.
     */
    check(nextState: T): void;
    /**
     * Updates its snapshots, checks for continuous changes and notifies subscribers.
     * Continuous changes are changes that happen frequently, such as mouse movement,
     * and are ok to miss a few.
     * @param nextState The next state of the object.
     */
    checkContinuous(nextState: T): void;
    /**
     * Initializes the patcher with the initial state of the object.
     * @param state The initial state of the object.
     */
    initialize(state: T): void;
    /**
     * Applies a patch to the object. Will NOT notify subscribers.
     * @param patch The patch to apply.
     * @returns The whether the state should change, and the new state of the object.
     */
    patch(patch: Patch | SignedPatch, state?: T): {
        patched: boolean;
        result: T;
    };
    /**
     * Subscribes to changes to the object.
     * @param listener A function that will be called when the object changes.
     * @returns A subscription ID that can be used to unsubscribe.
     */
    subscribe(listener?: PatchListener): number;
    /**
     * Subscribes to discrete changes to the object. Discrete changes are changes
     * that happen infrequently, such as a button click, and should not be missed.
     * @param listener A function that will be called when the object changes.
     * @returns A subscription ID that can be used to unsubscribe.
     */
    subscribeToDiscreteChanges(listener: PatchListener): number;
    /**
     * Subscribes to continuous changes to the object. Continuous changes are changes
     * that happen frequently, such as mouse movement, and are ok to miss a few.
     * @param listener A function that will be called when the object changes.
     * @returns A subscription ID that can be used to unsubscribe.
     */
    subscribeToContinuousChanges(listener: PatchListener): number;
    /**
     * Unsubscribes from changes to the object.
     * @param subscriptionId The subscription ID returned by `subscribe`.
     */
    unsubscribe(subscriptionId: number): void;
    private checkAndUpdate;
    private nextKey;
    private validate;
}
