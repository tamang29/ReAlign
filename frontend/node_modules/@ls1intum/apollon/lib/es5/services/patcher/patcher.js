"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patcher = void 0;
var tslib_1 = require("tslib");
var fast_json_patch_1 = require("fast-json-patch");
var rxjs_1 = require("rxjs");
var compare_1 = require("./compare");
var patch_verifier_1 = require("./patch-verifier");
var _DefaultOptions = {
    diff: compare_1.compare,
    maxFrequency: 60,
};
/**
 * A patcher tracks changes to an object and notifies subscribers.
 * It also allows application of patches to the object.
 */
var Patcher = /** @class */ (function () {
    /**
     * @param diff A function that compares two objects and returns the difference
     * in the form of a [JSON patch](http://jsonpatch.com/).
     */
    function Patcher(options) {
        if (options === void 0) { options = _DefaultOptions; }
        this.subscribers = {};
        this.discreteRouter = new rxjs_1.Subject();
        this.continuousRouter = new rxjs_1.Subject();
        this.verifier = new patch_verifier_1.PatchVerifier();
        this.options = {
            diff: options.diff || _DefaultOptions.diff,
            maxFrequency: options.maxFrequency || _DefaultOptions.maxFrequency,
        };
        // TODO: Double check the correctness of this code.
        //       there are guard rails for handling multiple patches per tick
        //       or filtering out empty patches, but they are only
        //       applied to the total observable. If a consumer subscribes
        //       to discrete patches, for example, they won't get these
        //       guard rails. This is a potential bug.
        //
        // throttle continuous patches to handle back-pressure. note that
        // unlike discrete changes, it is ok to miss some continuous changes.
        //
        this.continuousPatchObservable = this.continuousRouter.pipe((0, rxjs_1.throttleTime)(1000 / this.options.maxFrequency));
        var router = (0, rxjs_1.merge)(this.discreteRouter, this.continuousPatchObservable);
        //
        // we might get multiple patches in a single tick,
        // for example due to some side effects of some patches being applied.
        // to avoid backpressure, we buffer the patches and emit them all at once.
        //
        this.observable = router.pipe((0, rxjs_1.buffer)(router.pipe((0, rxjs_1.debounceTime)(0))), (0, rxjs_1.map)(function (patches) { return patches.flat(); }), (0, rxjs_1.filter)(function (patches) { return patches.length > 0; }));
    }
    Object.defineProperty(Patcher.prototype, "snapshot", {
        /**
         * @returns The current state of the object.
         */
        get: function () {
            return this._snapshot;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Updates its snapshots, checks for changes and notifies subscribers.
     * @param nextState The next state of the object.
     */
    Patcher.prototype.check = function (nextState) {
        this.checkAndUpdate(nextState);
    };
    /**
     * Updates its snapshots, checks for continuous changes and notifies subscribers.
     * Continuous changes are changes that happen frequently, such as mouse movement,
     * and are ok to miss a few.
     * @param nextState The next state of the object.
     */
    Patcher.prototype.checkContinuous = function (nextState) {
        this.checkAndUpdate(nextState, false);
    };
    /**
     * Initializes the patcher with the initial state of the object.
     * @param state The initial state of the object.
     */
    Patcher.prototype.initialize = function (state) {
        this._snapshot = state;
    };
    /**
     * Applies a patch to the object. Will NOT notify subscribers.
     * @param patch The patch to apply.
     * @returns The whether the state should change, and the new state of the object.
     */
    Patcher.prototype.patch = function (patch, state) {
        this.validate();
        var verified = this.verifier.verified(patch);
        this._snapshot = state !== null && state !== void 0 ? state : this._snapshot;
        if (verified && verified.length > 0) {
            this._snapshot = verified.reduce(function (state, p, index) {
                try {
                    return (0, fast_json_patch_1.applyReducer)(state, p, index);
                }
                catch (_a) {
                    return state;
                }
            }, this.snapshot);
            return { patched: true, result: this.snapshot };
        }
        return { patched: false, result: this.snapshot };
    };
    /**
     * Subscribes to changes to the object.
     * @param listener A function that will be called when the object changes.
     * @returns A subscription ID that can be used to unsubscribe.
     */
    Patcher.prototype.subscribe = function (listener) {
        var key = this.nextKey();
        this.subscribers[key] = this.observable.subscribe(listener);
        return key;
    };
    /**
     * Subscribes to discrete changes to the object. Discrete changes are changes
     * that happen infrequently, such as a button click, and should not be missed.
     * @param listener A function that will be called when the object changes.
     * @returns A subscription ID that can be used to unsubscribe.
     */
    Patcher.prototype.subscribeToDiscreteChanges = function (listener) {
        var key = this.nextKey();
        this.subscribers[key] = this.discreteRouter.subscribe(listener);
        return key;
    };
    /**
     * Subscribes to continuous changes to the object. Continuous changes are changes
     * that happen frequently, such as mouse movement, and are ok to miss a few.
     * @param listener A function that will be called when the object changes.
     * @returns A subscription ID that can be used to unsubscribe.
     */
    Patcher.prototype.subscribeToContinuousChanges = function (listener) {
        var key = this.nextKey();
        this.subscribers[key] = this.continuousPatchObservable.subscribe(listener);
        return key;
    };
    /**
     * Unsubscribes from changes to the object.
     * @param subscriptionId The subscription ID returned by `subscribe`.
     */
    Patcher.prototype.unsubscribe = function (subscriptionId) {
        this.subscribers[subscriptionId].unsubscribe();
        delete this.subscribers[subscriptionId];
    };
    // checks for changes and notifies subscribers, using given router
    Patcher.prototype.checkAndUpdate = function (nextState, discreteChange) {
        if (discreteChange === void 0) { discreteChange = true; }
        this.validate();
        var skip = Object.keys(this.subscribers).length === 0;
        var patch = !skip && this.options.diff(this.snapshot, nextState);
        if (discreteChange) {
            this._snapshot = nextState;
        }
        if (patch && patch.length) {
            var router = discreteChange ? this.discreteRouter : this.continuousRouter;
            router.next(this.verifier.sign(patch));
        }
    };
    // generates a unique key for a subscription
    Patcher.prototype.nextKey = function () {
        return Math.max.apply(Math, tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(Object.keys(this.subscribers).map(function (k) { return parseInt(k, 10); })), false), [0], false)) + 1;
    };
    // throws if patcher is not initialized
    Patcher.prototype.validate = function () {
        if (!this.snapshot) {
            throw new Error('Patcher not initialized');
        }
    };
    return Patcher;
}());
exports.Patcher = Patcher;
//# sourceMappingURL=patcher.js.map